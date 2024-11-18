import "./index.scss";
import React from "react";
// import NavbarLayout from "src/layouts/NavbarLayout";
import { useUserStore } from "src/state/User";
import DashTitle from "src/components/DashTitle";
import DashButton from "src/components/DashButton";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [{ isAuthenticating }, { handleGoogleSignin }] = useUserStore();

  return (
    <div className="dashLayout">
      <DashTitle title="Login" />
      <DashButton
        loading={isAuthenticating}
        onClick={() => handleGoogleSignin(navigate)}
      >
        Login with Google
      </DashButton>
    </div>
  );
};

export default Login;
