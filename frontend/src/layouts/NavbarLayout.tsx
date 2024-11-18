import "./index.scss";
import React from "react";
import { Outlet } from "react-router-dom";
import DashNavbar from "../components/DashNavbar";

// type LayoutProps = {
//   children: React.ReactNode;
// };
const NavbarLayout = ({ children }: any) => {
  return (
    <main className="tLayout">
      <DashNavbar />
      <section className="tLayout-section">
        <Outlet />
      </section>
    </main>
  );
};

export default NavbarLayout;
