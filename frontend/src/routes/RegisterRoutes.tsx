import React from "react";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";

import { useUserStore } from "../state/User";
import routes from "../common/routes";
import NavbarLayout from "src/layouts/NavbarLayout";
import { Login, Registration } from "src/pages/Dashboard";

const RegisterRoute = () => {
  const [{ isLoggedIn }] = useUserStore();
  const { pathname } = useLocation();

  if (!isLoggedIn) {
    return (
      <NavbarLayout>
        <Routes>
          <Route path={routes.LOGIN} element={<Login />} />
          <Route path={routes.REGISTRATION} element={<Registration />} />
        </Routes>
      </NavbarLayout>
    );
  } else {
    if (pathname !== routes.LANDING) {
      return <Navigate to={routes.LANDING} />;
    }
    return null;
  }
};

export default RegisterRoute;
