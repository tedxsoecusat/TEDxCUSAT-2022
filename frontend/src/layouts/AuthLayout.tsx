// import { Row, Spin } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import DashLoader from "src/components/DashLoader";
import { useUserStore } from "src/state/User";

const AuthLayout = ({ children }: any) => {
  const [{ isAuthenticating }, { authenticate }] = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    authenticate(navigate);
    // eslint-disable-next-line
  }, [authenticate]);

  if (isAuthenticating) return <DashLoader isFullPage />;
  return <Outlet />;
};

export default AuthLayout;
