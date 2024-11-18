import React, { useState } from "react";
import constants from "src/common/constants";
import DashButton from "src/components/DashButton";
import DashInput from "src/components/DashInput";
import { useTicketStore } from "src/state/Tickets";
import { useUserStore } from "src/state/User";

const getTimeDiff = (timeStamp: number) => {
  const minutes =
    (new Date().getTime() - new Date(timeStamp).getTime()) / 60000;
  const hours = Math.floor(minutes / 60);
  const remainingMin = Math.floor(minutes - hours * 60);
  return `${hours} hours and ${remainingMin} mins`;
};

const Seats = () => {
  const [
    {
      seats,
      isBooking,
      selectedSeat,
      isBlocking,
      isAdminBooking,
      adminBookingErr,
    },
    { handleBookSeat, setSelectedSeat, handleBlockSeat, handleAdminBook },
  ] = useTicketStore();
  const [{ user }] = useUserStore();
  const [adminSeat, setadminSeat] = useState(-1);
  const [bookEmail, setBookEmail] = useState("");

  const handleSelectSeat = (seat: {
    seatNo: number;
    status: string;
    userId: string;
  }) => {
    if (
      seat.status === "available" ||
      (seat.status === "blocked" && seat.userId === user?.uid)
    ) {
      setSelectedSeat(seat.seatNo);
    }
    if (seat.status === "available" || seat.status === "blocked") {
      if (constants.admins.includes(user?.email ?? ""))
        setadminSeat(seat.seatNo);
    }
  };

  return (
    <div className="flex flex-col justify-center align-middle m-auto w-full md:w-4/5">
      <p className="text-[#1e90ff] bg-[#1e8fff2d] w-fit px-4 py-1 mb-5 rounded-2xl text-sm m-auto">
        {selectedSeat >= 0 && `You have selected seat ${selectedSeat}. `}All
        selected seats without payment will be cleared after 12 hours
      </p>
      <h3 className="text-themeRed font-normal text-lg text-center my-2">
        All eyes this way, please
      </h3>
      <div className="w-4/5 h-3 m-auto mb-16 bg-neutral-400 rounded-t-3xl" />
      {constants.admins.includes(user?.email ?? "") && (
        <p className="text-center mb-3">
          <span className="text-themeRed font-medium">
            {seats?.filter((s) => s.status === "booked").length}
          </span>{" "}
          Booked,{" "}
          <span className="text-yellow-500 font-medium">
            {seats?.filter((s) => s.status === "blocked").length}
          </span>{" "}
          Blocked
        </p>
      )}
      <div className="w-4/5 m-auto flex flex-wrap align-middle justify-center max-h-[500px] overflow-auto md:max-h-fit">
        {seats?.map((seat) => (
          <abbr
            title={`${seat?.seatNo}: ${
              seat.status === "booked" || seat.status === "blocked"
                ? selectedSeat === seat.seatNo
                  ? "Selected Seat"
                  : seat.status === "blocked"
                  ? `Blocked${
                      constants.admins.includes(user?.email ?? "")
                        ? " before " + getTimeDiff(seat.updated)
                        : ""
                    }`
                  : "Booked"
                : "Available"
            }`}
            className="no-underline"
            key={seat?.seatNo}
          >
            <div
              onClick={() => handleSelectSeat(seat)}
              className={`h-10 w-10 m-3 transition-all rounded-sm border-transparent shadow-md shadow-white flex justify-center items-center text-sm font-medium text-${
                seat.status === "booked" || selectedSeat === seat?.seatNo
                  ? "white"
                  : "black"
              } ${
                seat.status === "booked"
                  ? "bg-themeRed"
                  : selectedSeat === seat?.seatNo
                  ? "bg-blue-600"
                  : seat.status === "blocked"
                  ? "bg-yellow-500"
                  : "bg-neutral-300"
              } ${
                seat.status === "booked"
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              } ${
                seat.status === "booked"
                  ? "hover:shadow-red-400"
                  : selectedSeat === seat?.seatNo
                  ? "hover:shadow-blue-400"
                  : "hover:shadow-neutral-300"
              }`}
            >
              {seat?.seatNo}
            </div>
          </abbr>
        ))}
      </div>
      <div className="flex items-center mt-16 justify-around">
        <DashButton
          loading={isBooking}
          className="w-fit"
          disabled={selectedSeat <= 0}
          onClick={() => handleBookSeat(selectedSeat, user)}
        >
          Confirm Seat {selectedSeat > 0 ? selectedSeat : ""}
        </DashButton>
        {constants.admins.includes(user?.email ?? "") && (
          <>
            <DashButton
              loading={isBlocking}
              className="w-fit"
              disabled={adminSeat <= 0}
              onClick={() => handleBlockSeat(adminSeat)}
            >
              {seats[adminSeat]?.status === "blocked"
                ? `Unblock ${adminSeat > 0 ? adminSeat : ""}`
                : `Block ${adminSeat > 0 ? adminSeat : ""}`}
            </DashButton>
          </>
        )}
      </div>
      {constants.admins.includes(user?.email ?? "") && (
        <>
          <div className="flex flex-wrap items-center justify-center mt-10">
            <DashInput
              label="Book a ticket (Admin)"
              placeholder="Enter the email"
              onChange={(val) => setBookEmail(val)}
            />
            <DashButton
              className="ml-4"
              disabled={bookEmail === "" || adminSeat < 0}
              loading={isAdminBooking}
              onClick={() => handleAdminBook(bookEmail, adminSeat)}
            >
              Book {adminSeat >= 0 ? adminSeat : ""}
            </DashButton>
          </div>
          {adminBookingErr && (
            <p className="stripeErr m-auto">{adminBookingErr}</p>
          )}
        </>
      )}
    </div>
  );
};

export default Seats;
