import React from "react";
import constants from "src/common/constants";
import { useTicketStore } from "src/state/Tickets";

const Info = () => {
  const [{ ticketInfo }] = useTicketStore();

  const dotStyle = `rounded-full bg-white absolute h-6 w-6`;

  return (
    <div>
      <div className="flex bg-themeRed relative w-fit h-[180px]">
        <div className={`${dotStyle} -left-2 -top-2`} />
        <div className={`${dotStyle} -right-2 -top-2`} />
        <div className={`${dotStyle} -left-2 -bottom-2`} />
        <div className={`${dotStyle} -right-2 -bottom-2`} />
        <div className="flex flex-col justify-between text-white w-[240px] m-5 mx-5 p-4 border-[#ffffff7f] border-2 rounded-2xl sm:w-[300px] md:w-[360px] md:mx-8">
          <h1 className="font-bold text-lg md:text-xl">
            {ticketInfo?.userName}
          </h1>
          <time className="font-medium text-xs md:text-sm">
            {constants.eventDate}
          </time>
          <p className="font-medium text-xs md:text-sm">
            Seminar Complex, University Road, South Kalamassery, Ernakulam,
            Kerala, 682022
          </p>
        </div>
        <div className="bg-black text-white w-[70px] h-full flex items-center justify-center md:w-[90px]">
          <div className="rotate-90 flex flex-col items-center">
            <p className="text-xs">Seat No:</p>
            <p className="text-4xl font-semibold md:text-5xl">
              {ticketInfo.seatNo}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
