import React, { useState } from "react";
import Navbar from "src/components/Navbar";
import { motion, useViewportScroll } from "framer-motion";

import { TwitterIcon, FacebookIcon, InstagramIcon } from "src/static/icons";
import BG from "../../static/video/bg-video.mp4";

import "./index.css";
import { Link } from "react-router-dom";
import routes from "src/common/routes";

const LandingSection = () => {
  const [scrollVal, setScrollVal] = useState<number>();

  const { scrollY } = useViewportScroll();

  scrollY.onChange((s) => {
    setScrollVal(s / 3);
  });

  return (
    <div className="bg-black overflow-hidden min-h-[100vh] relative">
      <Navbar />
      {window.innerWidth > 1000 && (
        <div className="absolute top-0 left-0 h-full w-full">
          <video
            loop
            muted
            autoPlay
            playsInline
            className="bgVideoLanding"
            id="videoBG"
          >
            <source src={BG} type="video/mp4" />
          </video>
        </div>
      )}
      <div className="landing__layover mobile-bg min-h-[100vh] pt-[10vh] z-0"></div>
      <main className="flex min-h-[90vh] items-center justify-center max-w-[1440px] mx-auto px-[32px] md:px-[64px] xl:px-[85px] mt-[10vh]">
        <div className="flex w-full flex-col z-10 items-start">
          <h1 className="text-[32px] md:text-[52px] lg:text-[64px] xl:text-[72px] font-black text-white uppercase">
            Transcendence
          </h1>
          <p className="text-white font-medium text-sm lg:text-base xl:text-lg">
            Beyond all bounds
          </p>
          <Link to={routes.TICKETS}>
            <button className="bg-themeRed font-bold text-sm lg:text-base text-white px-[20px] py-[15px] rounded-lg mt-[24px] shadow-xl shadow-[#ff2b064d] hover:bg-[#c01f02] duration-200 ease-in">
              Book your tickets!
            </button>
          </Link>
        </div>
        <div className="z-10 hidden xl:block relative">
          <motion.div
            style={{ x: scrollVal }}
            transition={{ ease: [0.17, 0.67, 0.83, 0.67] }}
            className="text-[800px] leading-[800px] font-bold animated-text landing__clip select-none"
          >
            X
          </motion.div>
        </div>
      </main>
      <div className="flex flex-col-reverse xl:flex-row items-center justify-center text-themeRed font-semibold z-10 absolute left-5 md:left-8 xl:left-0 bottom-0 xl:bottom-10">
        <span className="xl:w-[120px] xl:h-[5px] w-[5px] h-[30px] rounded-t-full xl:rounded-r-full xl:rounded-t-none bg-themeRed"></span>
        <a
          href="https://www.facebook.com/tedxcusat21/"
          target="_blank"
          rel="noopener noreferrer"
          className="xl:pl-[30px] pb-[10px] md:pd-[15px] xl:pb-0 select-none"
        >
          {window.innerWidth < 1024 ? (
            <img
              src={FacebookIcon}
              alt="Facebook"
              height={20}
              width={20}
              className="w-[20px] h-[20px]"
            />
          ) : (
            "facebook"
          )}
        </a>
        <a
          href="https://www.instagram.com/tedxcusat/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
          className="xl:px-[50px] py-[10px] md:my-[15px] select-none"
        >
          {window.innerWidth < 1024 ? (
            <img
              src={InstagramIcon}
              alt="Instagram"
              height={20}
              width={20}
              className="w-[20px] h-[20px]"
            />
          ) : (
            "instagram"
          )}
        </a>
        <a
          href="https://www.instagram.com/tedxcusat/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
          className="select-none"
        >
          {window.innerWidth < 1024 ? (
            <img
              src={TwitterIcon}
              alt="Twitter"
              height={20}
              width={20}
              className="w-[20px] h-[20px]"
            />
          ) : (
            "twitter"
          )}
        </a>
      </div>
      <div className="z-10 absolute bottom-10 left-1/2">
        <a href="#about">
          <div className="w-[22px] h-[37px] border-[3px] rounded-full border-[#ffffffa6] flex items-start justify-center py-[5px]">
            <span className="h-[10px] border-2 rounded-full border-[#ffffffa6] w-0 landing__scrollKeyframe"></span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default LandingSection;
