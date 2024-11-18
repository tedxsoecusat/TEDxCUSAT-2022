import React from "react";
import "./index.scss";

const Contacts = () => {
  return (
    <div className="mb-[80px] mx-auto max-w-[1440px] px-[32px] md:px-[64px] lg:px-[85px]">
      <div className="flex">
        <h4 className=" text-red-600 font-extrabold text-4xl  z-20  relative uppercase">
          <span className="lineContactHeadingStart left-[10%] opacity-50" />
          <span className="lineContactHeadingMid left-[80.5%] opacity-50" />
          <span className="lineContactHeadingEnd left-[86%] opacity-50" />
          Contact
        </h4>
      </div>
      <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-[10px]">
        <div className=" contactCard mb-2 p-7 shadow-lg hover:shadow-xl shadow-[#47160ebd] hover:shadow-[#47160ebd] transition-all duration-300 ease-in-out">
          <b className=" text[18px]  font-semibold select-none">
            Suryanarayanan R
          </b>{" "}
          • <i className="select-none">Organizer TedXCUSAT 2021-22</i>
          <p className="text-[16px] font-semibold mt-[4px] text-[#dadada]">
            <a href="tel:+919446114249">+91 94461 14249</a>
            <br />
            <a href="mailto:surya@tedxcusat.in">surya@tedxcusat.in</a>
          </p>
        </div>
        <div className=" contactCard mb-2 p-7 shadow-lg hover:shadow-xl shadow-[#47160ebd] hover:shadow-[#47160ebd] transition-all duration-300 ease-in-out">
          <b className=" text-[18px] font-semibold select-none">
            Thamanna Azhar
          </b>{" "}
          • <i className="select-none">Organizer TedXCUSAT 2021-22</i>
          <p className="text-[16px] font-semibold mt-[4px] text-[#dadada]">
            <a href="tel:+919747051190">+91 97470 51190</a>
            <br />
            <a href="mailto:thamanna@tedxcusat.in">thamanna@tedxcusat.in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
