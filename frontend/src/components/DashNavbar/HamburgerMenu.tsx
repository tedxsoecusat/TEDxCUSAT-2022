import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "src/state/User";
import { menuitems } from "./menuitems";

const HamburgerMenu = () => {
  const [navbarExpanded, setNavbarExpanded] = useState<boolean>(false);
  const [{ isLoggedIn }] = useUserStore();

  return (
    <div
      className="flex flex-col items-center justify-center tHam"
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
      <menu
        className={`dropdown dropdown-${
          navbarExpanded ? "expanded" : "hidden"
        }`}
      >
        {menuitems.map((menuitem) => (
          <Link
            key={menuitem.route}
            className={`dropdown-item dropdown-item-${
              (!isLoggedIn && menuitem.hideBeforeAuth) ||
              (isLoggedIn && menuitem.hideAfterAuth)
                ? "hidden"
                : "visible"
            }`}
            to={menuitem.route}
          >
            {menuitem.title}
          </Link>
        ))}
      </menu>
    </div>
  );
};

export default HamburgerMenu;
