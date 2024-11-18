import "./index.scss";
import React, { useState } from "react";
// import { RazorpayOptions } from "react-razorpay";
// import { QRGenerator } from "dynamic-qr-code-generator";
import QRCode from "qrcode.react";
// import QRCode from "react-qr-code";

import { ticketImg } from "src/static/img";
import { steps } from "./steps";
import { useUserStore } from "src/state/User";
import DashLoader from "src/components/DashLoader";
// import { User } from "../../../../types";
import { useTicketStore } from "src/state/Tickets";
// import config from "../../../../common/config";
import DashButton from "src/components/DashButton";
import constants from "src/common/constants";

// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
import Modal from "src/components/Modal";

// type Status = "created" | "pending" | "paid";

// interface orderObject {
//   amount: string;
//   amount_due: number;
//   amount_paid: number;
//   attempts: number;
//   created_at: number;
//   currency: string;
//   entity: string;
//   id: string;
//   notes: string[];
//   offer_id: string | null;
//   receipt: string;
//   status: Status;
// }

// function getRazorpayOptions(
//   order: orderObject,
//   user: User,
//   successHandler: (amount: string) => void,
//   stopLoading: () => void
// ) {
//   return {
//     key: "rzp_test_ojDhywDqKJIO4e",
//     amount: order.amount,
//     currency: order.currency,
//     name: "TEDx CUSAT",
//     description: "Test Transaction",
//     image:
//       "https://objectstorage.ap-hyderabad-1.oraclecloud.com/n/ax9kets4h5ld/b/tedx/o/tedx%20logopayment-logo.png",
//     order_id: order.id,
//     handler: async (res: any) => {
//       const { status } = await callBackend<{ status: Status }>(
//         "/verifyPayment",
//         {
//           ...res,
//           receipt: order.receipt,
//         },
//         user
//       );
//       if (status === "paid") {
//         successHandler(order.amount);
//       } else {
//         stopLoading();
//       }
//       console.log(status);
//     },
//     prefill: {
//       name: user.name,
//       email: user.email,
//       contact: user.phno,
//     },
//     theme: {
//       color: "#ff2b06",
//     },
//   } as RazorpayOptions;
// }

// async function callBackend<T>(
//   path: string,
//   data: Record<string, unknown>,
//   user: User
// ) {
//   return fetch(config.BACKEND_URL + path, {
//     method: "post",
//     body: JSON.stringify({ ...data, uid: user.uid }),
//     headers: { "Content-Type": "application/json" },
//   }).then((res) => res.json()) as Promise<T>;
// }

const Payment = () => {
  const [{ isLoggedIn, user }] = useUserStore();
  const [
    { selectedSeat, isPaying },
    // { setIsPaying, setCurrentStatus, handlePaymentSuccess },
  ] = useTicketStore();
  const [paymentModal, setPaymentModal] = useState(false);
  // const [qrCode, setqrCode] = useState("");
  // const Razorpay = useRazorpay();

  // const handlePayment = useCallback(async () => {
  //   if (!user) return;
  //   setIsPaying(true);
  //   const data = await callBackend<orderObject>(
  //     "/payment",
  //     { category: user?.isCusatian ? "cusat" : "other" },
  //     user
  //   );
  //   // @review allowMultiple allows multiple payments/payment attempts per user

  //   const pay = new Razorpay(
  //     getRazorpayOptions(
  //       data,
  //       user,
  //       (amount) => handlePaymentSuccess(user, amount),
  //       () => setIsPaying(false)
  //     )
  //   );
  //   pay.on("error", (error: unknown) => {
  //     console.error(error);
  //     setIsPaying(false);
  //   });
  //   pay.open();
  // }, [Razorpay, user, handlePaymentSuccess, setIsPaying]);

  const opener = (link: string) => window.open(link);

  // useEffect(() => {
  //   if (user) {
  //     const res = QRGenerator({
  //       value: user?.isCusatian
  //         ? `${constants.paymentLinks.gpay.cusatian(user?.email, selectedSeat)}`
  //         : `${constants.paymentLinks.gpay.other(
  //             user?.email ?? "",
  //             selectedSeat
  //           )}`,
  //     });
  //     console.log({ res });
  //   }
  // }, [user, selectedSeat]);

  if (!isLoggedIn) return <DashLoader isFullPage />;
  return (
    <div>
      <img className="w-full max-w-[700px]" src={ticketImg} alt="ticket" />
      <div className="tStepsBox">
        <h1>Important Instructions</h1>
        <section className="tSteps">
          {steps.map((step, index) => (
            <div className="tStep">
              <span>{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </section>
        <footer className="tStepsFooter">
          <div className="tStepsFooter-info">
            <p className="ticketPrice">
              <b>
                Ticket Price: &nbsp;{" "}
                <span className="amount">
                  &#8377;{" "}
                  {user?.isCusatian
                    ? constants.ticketPrice.cusatian
                    : constants.ticketPrice.other}
                </span>
              </b>
            </p>
            <p className="ticketPrice">
              <b>
                Seat: &nbsp; <span className="amount">{selectedSeat}</span>
              </b>
            </p>
          </div>
          <p>
            By proceeding to payment, you are accepting our{" "}
            <a href="https://tedxcusat.in/terms.pdf" rel="noreferrer noopener">
              Terms & Conditions
            </a>
            .
          </p>
          <div className="payBtnContainer">
            {/* <DashButton loading={isPaying} onClick={handlePayment}> */}
            {/* <a
              href={
                user?.isCusatian
                  ? `${constants.paymentLinks.cusatian}`
                  : `${constants.paymentLinks.other}`
              }
            > */}
            <DashButton
              loading={isPaying}
              onClick={() => setPaymentModal(true)}
            >
              Pay
            </DashButton>
            {/* </a> */}
            <Modal
              className="h-[560px]"
              title="Payment"
              visible={paymentModal}
              footer={false}
              onOk={() => {}}
              onCancel={() => setPaymentModal(false)}
            >
              <div className="paymodal">
                {/* {user?.isCusatian ? (
                  <img src={Gpay900} alt="Gpay900" />
                ) : (
                  <img src={Gpay1200} alt="Gpay900" />
                )} */}
                <QRCode
                  style={{ height: "250px", width: "250px" }}
                  value={encodeURI(
                    user?.isCusatian
                      ? `${constants.paymentLinks.gpay.cusatian(
                          user?.email,
                          selectedSeat
                        )}`
                      : `${constants.paymentLinks.gpay.other(
                          user?.email ?? "",
                          selectedSeat
                        )}`
                  )}
                />
                {/* <a
                  className="mb-4"
                  href={
                    user?.isCusatian
                      ? `${constants.paymentLinks.gpay.cusatian}`
                      : `${constants.paymentLinks.gpay.other}`
                  }
                > */}
                <DashButton
                  btnType="link"
                  onClick={() =>
                    opener(
                      user?.isCusatian
                        ? `${constants.paymentLinks.gpay.cusatian(
                            user?.email,
                            selectedSeat
                          )}`
                        : `${constants.paymentLinks.gpay.other(
                            user?.email ?? "",
                            selectedSeat
                          )}`
                    )
                  }
                  btnSize="small"
                >
                  Or Click here
                </DashButton>
                {/* </a> */}
                <p className="text-center text-sm">
                  Please add your registered email id as note while you make the
                  payment.
                </p>
                {/* <a
                  href={
                    user?.isCusatian
                      ? `${constants.paymentLinks.stripe.cusatian}`
                      : `${constants.paymentLinks.stripe.other}`
                  }
                >
                  <DashButton>Other payment methods</DashButton>
                </a> */}
              </div>
            </Modal>
          </div>
        </footer>
      </div>
    </div>
  );
};

// const PaymentWrap = () => {
//   const stripe = loadStripe(config.STRIPE_API_KEY);

//   return (
//     <Elements stripe={stripe}>
//       <Payment />
//     </Elements>
//   );
// };

export default Payment;
