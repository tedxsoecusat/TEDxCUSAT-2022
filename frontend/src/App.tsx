import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import routes from "./common/routes";
import { Login, Logout, Registration, Tickets } from "./pages/Dashboard";
import NavbarLayout from "./layouts/NavbarLayout";
import AuthLayout from "./layouts/AuthLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.LANDING} element={<Landing />} />
        <Route path={routes.LANDING} element={<NavbarLayout />}>
          <Route path={routes.LOGIN} element={<Login />} />
          <Route path={routes.REGISTRATION} element={<Registration />} />
          <Route path={routes.LANDING} element={<AuthLayout />}>
            <Route path={routes.LOGOUT} element={<Logout />} />
            <Route path={routes.TICKETS} element={<Tickets />} />
          </Route>
        </Route>
        <Route path="*" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
