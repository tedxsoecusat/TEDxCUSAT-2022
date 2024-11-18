import React, { useState } from "react";
import { logo } from "src/static/img";

const Navbar = () => {
  const [navbarExpanded, setNavbarExpanded] = useState<boolean>(false);

  const handleClick = (to: string) => {
    let scrollBy: number = 0;
    if (to !== "home") {
      scrollBy = (document.getElementById(to)?.offsetTop ?? 0) - 100;
    }
    window.scrollTo({
      left: 0,
      top: scrollBy,
      behavior: "smooth",
    });
  };

  return (
    <>
      <header className="flex items-center justify-center mx-auto fixed top-0 w-full z-50">
        <nav className="flex items-center min-h-[10vh] max-w-[1440px] justify-between w-full px-[32px] lg:px-[120px] bg-[#00000086] mt-[20px] rounded-[20px] text-white font-semibold backdrop-blur-lg mx-[20px] md:mx-[50px]">
          <ul className="hidden lg:flex items-center flex-1 justify-between">
            <li className="cursor-pointer" onClick={() => handleClick("about")}>
              About
            </li>
            <li className="cursor-pointer" onClick={() => handleClick("theme")}>
              Theme
            </li>
          </ul>
          <div className="lg:flex-[2] flex items-center justify-center">
            <img
              src={logo}
              alt="TEDXCUSAT Independently organized TED event"
              className="h-[48px]"
              height={48}
              onClick={() => handleClick("home")}
            />
          </div>
          <ul className="hidden lg:flex items-center flex-1 justify-between">
            <li
              className="cursor-pointer"
              onClick={() => handleClick("speakers")}
            >
              Talks and Speakers
            </li>
            <li
              className="cursor-pointer"
              onClick={() => handleClick("partners")}
            >
              Partners
            </li>
          </ul>
          <div
            className="flex lg:hidden flex-col items-center justify-center"
            onClick={() => setNavbarExpanded((prev) => !prev)}
          >
            <span
              className={`h-[2px] w-[30px] bg-themeRed mb-[4px] rounded-full transition-all duration-300 ease-in-out ${
                navbarExpanded
                  ? "transform -rotate-45 origin-center translate-y-[6px]"
                  : ""
              }`}
            ></span>
            <span
              className={`h-[2px] w-[30px] bg-themeRed mb-[4px] rounded-full transition-all duration-300 ease-in-out ${
                navbarExpanded ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`h-[2px] w-[30px] bg-themeRed mb-[4px] rounded-full transition-all duration-300 ease-in-out ${
                navbarExpanded
                  ? "transform rotate-45 origin-center -translate-y-[6px]"
                  : ""
              }`}
            ></span>
          </div>
        </nav>
      </header>
      <div
        className={`fixed top-0 left-0 z-40 w-full transition-all duration-300 ease-in-out ${
          navbarExpanded ? "h-[200px]" : "h-0"
        }`}
      >
        <ul
          className={`flex flex-col justify-center h-full space-y-[10px] bg-[#00000086] z-50 mx-[20px] md:mx-[50px] rounded-[20px] backdrop-blur-lg mt-[15vh] overflow-hidden transition-all duration-200 ease-in-out ${
            navbarExpanded && "p-[30px]"
          }`}
        >
          <li
            onClick={() => handleClick("about")}
            className={`text-white font-semibold ${
              !navbarExpanded && "opacity-0"
            }`}
          >
            About
          </li>
          <li
            onClick={() => handleClick("theme")}
            className={`text-white font-semibold ${
              !navbarExpanded && "opacity-0"
            }`}
          >
            Theme
          </li>
          <li
            onClick={() => handleClick("talks")}
            className={`text-white font-semibold ${
              !navbarExpanded && "opacity-0"
            }`}
          >
            Talks and Speakers
          </li>
          <li
            onClick={() => handleClick("partners")}
            className={`text-white font-semibold ${
              !navbarExpanded && "opacity-0"
            }`}
          >
            Partners
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
