import "./index.scss";
import React from "react";
import { useLocation, Link } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";
import { menuitems, menuitemType } from "./menuitems";
import { logo } from "src/static/img";
import { useUserStore } from "src/state/User";
// import routes from "src/common/routes";

const Navbar = () => {
  const location = useLocation();
  const [{ isLoggedIn }] = useUserStore();

  const getMenuItemClassName = (menuitem: menuitemType): string =>
    "tMenuItem " +
    ((!isLoggedIn && menuitem.hideBeforeAuth) ||
    (isLoggedIn && menuitem.hideAfterAuth)
      ? "tMenuHidden"
      : location.pathname === menuitem.route
      ? "tMenuActive"
      : "tMenuInactive");

  return (
    <nav className="tNav">
      <div className="tNav-upper">
        <div className="tNav-logo">
          <img src={logo} alt="logo" />
        </div>
        <menu className="tMenu">
          {menuitems.map((menuitem) => (
            <Link
              key={menuitem.route}
              className={getMenuItemClassName(menuitem)}
              to={menuitem.route}
            >
              {menuitem.title}
            </Link>
          ))}
          {/* {isLoggedIn && (
            <Link className="tMenuItem" to={routes.LOGOUT}>
              Logout
            </Link>
          )} */}
        </menu>
      </div>
      <HamburgerMenu />
      <div className="tNav-lower"></div>
    </nav>
  );
};

export default Navbar;
