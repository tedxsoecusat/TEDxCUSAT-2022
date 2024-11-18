import React from "react";
import "./index.scss";

import { logo } from "src/static/img";
import { FacebookIcon, InstagramIcon, Mail } from "src/static/icons";
import { Link } from "react-router-dom";
import routes from "src/common/routes";
// import { Link } from "react-router-dom";
// import routes from "src/common/routes";

const Footer = () => {
  const handleScroll = (to: string) => {
    const scrollBy = (document.getElementById(to)?.offsetTop ?? 0) - 100;

    window.scrollTo({
      left: 0,
      top: scrollBy,
      behavior: "smooth",
    });
  };

  return (
    <div className="footer">
      <footer className=" mx-auto max-w-[1440px] px-[32px] md:px-[64px] lg:px-[85px] py-[75px] flex flex-col items-center justify-center">
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          <img
            className=" self-center logo mb-8"
            src={logo}
            alt={"Tedx logo"}
          />
          <div className="flex flex-col">
            <div className=" flex flex-row justify-between items-center mt-4 md:mt-0">
              <a
                href="https://www.facebook.com/tedxcusat21/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={FacebookIcon}
                  alt="Facebook"
                  className=" icon-image mx-3"
                />
              </a>
              <a
                href="https://www.instagram.com/tedxcusat/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={InstagramIcon}
                  alt="Instagram"
                  className=" icon-image mx-3"
                />
              </a>
              <a
                href="mailto:organizer@tedxcusat.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Mail} alt="Mail" className=" icon-image mx-3" />
              </a>
            </div>
            <div className="flex flex-col mx-[12px] mt-[20px] text-center md:text-left">
              <span
                onClick={() => handleScroll("theme")}
                className="cursor-pointer text-white font-bold text-[12px] mb-1"
              >
                Theme
              </span>
              <span
                onClick={() => handleScroll("about")}
                className="cursor-pointer text-white font-bold text-[12px] mb-1"
              >
                About
              </span>
              <Link
                to={routes.LOGIN}
                className="text-white font-bold text-[12px] mb-1"
              >
                Dashboard
              </Link>
              <a
                href="https://objectstorage.ap-hyderabad-1.oraclecloud.com/n/ax9kets4h5ld/b/tedx/o/terms%20and%20conditions.pdf"
                target="_blank"
                className="text-white font-bold text-[12px] mb-1"
                rel="noopenner noreferrer"
              >
                Terms and Conditions
              </a>
              <a
                href="https://objectstorage.ap-hyderabad-1.oraclecloud.com/n/ax9kets4h5ld/b/tedx/o/terms%20and%20conditionRefund%20.pdf"
                target="_blank"
                rel="noopenner noreferrer"
                className="text-white font-bold text-[12px] mb-1"
              >
                Refund Policy
              </a>
            </div>
          </div>
        </div>
        <div className=" mt-8 justify-center flex items-center ">
          <p>Ⓒ TedXCUSAT | 2022</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
