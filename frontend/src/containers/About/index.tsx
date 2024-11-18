import React from "react";
import "./index.scss";

import { DotsGroup, X } from "src/static/img";

const About = () => {
  return (
    <div
      id="about"
      className="max-w-[1440px] px-[32px] md:px-[64px] lg:px-[85px] mx-auto overflow-hidden flex items-center py-[100px] flex-col relative md:flex-row justify-between"
    >
      <div className=" z-0 flex items-center justify-start flex-[2]">
        <h2 className=" text-white font-semibold text-4xl sm:text-5xl  z-20  relative ">
          <img src={DotsGroup} alt="dots" className=" dotsAboutSection  " />
          <div className="lineAboutHeading left-[60%] sm:left-[70%]  " />
          About <br /> <em className=" not-italic text-red-600">
            TEDx
          </em> CUSAT{" "}
        </h2>
      </div>
      <div className="py-10 z-20 relative flex items-center justify-center flex-[3]">
        <p className=" text-white font-normal text-xl  leading-8  ">
          Presenting for the third edition of TedXCUSAT 2022, Transcendence:
          Beyond all Bounds. The recent years have been rough on all of us; our
          well-being, stability, and existence, in general, have been
          challenged. In the wake of such a global crisis, our celebration is
          for all those who bravely forged ahead into uncharted territories and
          found success.
          <br />
          <br />
          Often, the world is stifled by its conventional ways of life,
          oblivious to the wide experiences that lie beyond their bubble. The
          courage and perseverance it takes to break out of this bubble are
          astounding, but every now and then we're surprised by someone who
          does. The voices on this years TEDx stage will empower you to break
          free of a conventional life and go beyond bounds. Are you ready?
        </p>
        <img
          src={X}
          alt="X"
          className="z-[-1] absolute bottom-[-40px] left-[50%] w-full h-1/2 translate-x-[-50%] opacity-20 md:opacity-40 md:left-[100%] md:translate-x-[-80%] md:bottom-[-10%] "
        />
      </div>
    </div>
  );
};

export default About;
