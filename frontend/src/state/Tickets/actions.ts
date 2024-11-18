import config from "src/common/config";
import constants from "src/common/constants";
import { errorLogger } from "src/common/utils";
import {
  bookSeat,
  deleteSeat,
  getSeats,
  getUserSeat,
  updateSeat,
} from "src/services/firebase/seats";
import {
  addNewReceipt,
  getUserFromEmail,
  getUserReciepts,
  updateUser,
} from "src/services/firebase/user";
import { analytics } from "src/services/firebase";
import { User } from "src/types";
import ActionTypes from "../types";
import { calculateAmount } from "./helpers";
import initialState from "./initialState";
import { logEvent } from "firebase/analytics";

const actions = {
  setIsPaying:
    (isPaying: boolean) =>
    ({ setState }: ActionTypes) => {
      setState({ isPaying });
    },

  setIsBooking:
    (isBooking: boolean) =>
    ({ setState }: ActionTypes) => {
      setState({ isBooking });
    },

  setIsBlocking:
    (isBlocking: boolean) =>
    ({ setState }: ActionTypes) => {
      setState({ isBlocking });
    },

  setSeats:
    (seats: Array<{}>) =>
    ({ setState }: ActionTypes) => {
      setState({ seats });
    },

  setCurrentStatus:
    (currentStatus: string) =>
    ({ setState }: ActionTypes) => {
      setState({ currentStatus });
    },

  setSelectedSeat:
    (selectedSeat: number) =>
    ({ setState }: ActionTypes) => {
      setState({ selectedSeat });
    },

  setTicketInfo:
    (ticketInfo: { userName: string; seatNo: string }) =>
    ({ setState }: ActionTypes) =>
      setState({ ticketInfo }),

  setErrMsg:
    (errMsg: string) =>
    ({ setState }: ActionTypes) =>
      setState({ errMsg }),

  handleBookSeat:
    (seatNo: number, user: User | null) =>
    async ({ getState, dispatch }: ActionTypes) => {
      logEvent(analytics, "handleBookSeat() called");
      const { seats } = getState();
      dispatch(actions.setIsBooking(true));
      try {
        const previousSeats = seats?.filter(
          (seat: any) => seat?.userId === user?.uid
        );
        if (previousSeats?.length > 0) {
          const promises: any[] = [];
          console.log({ previousSeats });
          previousSeats?.map((seat: any) =>
            promises.push(deleteSeat(seat?.seatNo))
          );
          await Promise.all(promises);
        }
        await bookSeat({
          seatNo: seatNo,
          userId: user?.uid,
          status: "blocked",
        });
        await updateUser(user?.uid, { seatNo });
        dispatch(actions.setCurrentStatus("doPayment"));
      } catch (error) {
        errorLogger(error, "handleBookSeat()");
      } finally {
        dispatch(actions.setIsBooking(false));
      }
    },

  handleGetTicketStatus:
    (user: User | null) =>
    async ({ dispatch }: ActionTypes) => {
      if (user) {
        logEvent(analytics, `handleGetTicketStatus() called by ${user?.email}`);

        const userReciepts = await getUserReciepts(user?.uid ?? "");
        const recieptStatus = userReciepts.docs.map(
          (reciept) => reciept.data()?.status
        );
        if (recieptStatus.some((e) => e === "paid")) {
          // User has already booked the ticket
          const _seatNo = await getUserSeat(user.uid);
          const seatNo = Number(_seatNo.docs[0].id);
          dispatch(actions.setSelectedSeat(seatNo));
          dispatch(
            actions.setTicketInfo({
              userName: user?.name ?? "N.A",
              seatNo: seatNo?.toString(),
            })
          );
          dispatch(actions.setCurrentStatus("paid"));
        } else {
          const _seats = await getSeats();
          let seatsData = Array(constants.noOfSeats)
            .fill({ status: "available" })
            .map((seat, seatNo) => ({ ...seat, seatNo }));
          _seats.docs.map(
            (seat) =>
              (seatsData[seat.id] = {
                ...seat.data(),
                seatNo: seat.id,
              })
          );
          dispatch(actions.setSeats(seatsData));
          if (seatsData.some((seat) => seat?.userId === user?.uid)) {
            dispatch(
              actions.setSelectedSeat(
                seatsData.find((seat) => seat?.userId === user?.uid).seatNo
              )
            );
          }
          dispatch(actions.setCurrentStatus("selectSeat"));
        }
      }
    },

  handleBlockSeat:
    (seatNo: number) =>
    async ({ getState, dispatch }: ActionTypes) => {
      logEvent(analytics, "handleBlockSeat() called");
      let { seats } = getState();
      dispatch(actions.setIsBlocking(true));
      try {
        let data = {};
        if (seats[seatNo]?.status === "blocked") {
          data = { status: "available", userId: "" };
          await deleteSeat(seatNo);
        } else {
          data = { status: "blocked", userId: "admin" };
          await updateSeat(seatNo, data);
        }
        seats[seatNo] = { ...seats[seatNo], ...data };
        dispatch(actions.setSeats(seats));
      } catch (error) {
        errorLogger(error, "handleBlockSeat()");
      } finally {
        dispatch(actions.setIsBlocking(false));
      }
    },

  handleStripePayment:
    (card: any, stripe: any, user: User | null) =>
    async ({ dispatch }: ActionTypes) => {
      logEvent(analytics, "handleStripePayment() called");
      if (card && stripe) {
        dispatch(actions.setIsPaying(true));
        try {
          const amount = user?.isCusatian
            ? constants.ticketPrice.cusatian
            : constants.ticketPrice.other;
          const tokenRes = await stripe.createToken(card);
          const data = {
            amount: calculateAmount(amount),
            currency: "inr",
            token: tokenRes.token,
            shipping: {
              city: "Kochi",
              state: "Kerala",
              postalCode: "682022",
              country: "India",
            },
            user,
          };
          if (tokenRes.error) {
            dispatch(actions.setErrMsg(tokenRes.error.message));
            dispatch(actions.setIsPaying(false));
          } else if (tokenRes?.token) {
            const paymentRes = await fetch(
              config.BACKEND_URL + "/stripe/processPayment",
              {
                method: "post",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
              }
            )
              .then((res) => {
                console.log("res", res);
                return res.json();
              })
              .catch((err) => {
                errorLogger(err, "@ handleProcessPayment");
                dispatch(actions.setErrMsg("Payment failed! Try again later."));
              });
            console.log("paytmentRes", paymentRes);
            if (paymentRes.success) {
              await dispatch(
                actions.handlePaymentSuccess(user, amount?.toString())
              );
            } else {
              dispatch(actions.setErrMsg(tokenRes.error.message));
            }
          } else {
            dispatch(
              actions.setErrMsg(
                "Couldn't initialize payment ! Try again later."
              )
            );
          }
        } catch (error) {
          errorLogger(error, "@ handleProcessPayment");
          dispatch(
            actions.setErrMsg("Couldn't initialize payment ! Try again later.")
          );
        } finally {
          dispatch(actions.setIsPaying(false));
        }
      } else {
        dispatch(
          actions.setErrMsg("Couldn't initialize payment ! Try again later.")
        );
      }
    },

  handlePaymentSuccess:
    (user: User | null, amount: string) =>
    async ({ getState, dispatch }: ActionTypes) => {
      logEvent(analytics, `handlePaymentSuccess() called ${user?.email}`);
      const { selectedSeat } = getState();
      try {
        await updateSeat(selectedSeat, { status: "booked", userId: user?.uid });
      } catch (error) {
        dispatch(actions.setCurrentStatus("error"));
        window.alert(
          "Payment success. Seat confirmation failed, contact TedX Support"
        );
      }
      dispatch(
        actions.setTicketInfo({
          userName: user?.name ?? "N.A",
          seatNo: selectedSeat,
        })
      );
      dispatch(actions.setIsPaying(false));
      dispatch(actions.setCurrentStatus("paid"));
    },

  handleAdminBook:
    (bookEmail: string, selectedSeat: number) =>
    async ({ setState }: ActionTypes) => {
      logEvent(analytics, "handleAdminBook() called");
      setState({ isAdminBooking: true });
      try {
        const _users = await getUserFromEmail(bookEmail);
        if (_users.docs[0].exists) {
          const user = _users.docs[0].data();
          await updateSeat(selectedSeat, {
            status: "booked",
            userId: user?.uid,
          });
          await addNewReceipt(user?.uid, "paid");
          await updateUser(user?.uid, { seatNo: selectedSeat });
          setState({ adminBookingErr: "Success! Refresh to see the changes" });
        } else {
          setState({ adminBookingErr: "No account found with email!" });
        }
      } catch (error) {
        setState({ adminBookingErr: "Some error occured!" });
        errorLogger(error, "handleAdminBook()");
      } finally {
        setState({ isAdminBooking: false });
      }
    },

  resetTicketStore:
    () =>
    ({ setState }: ActionTypes) => {
      setState(initialState);
    },
};

export default actions;
