import "./index.scss";
import React from "react";
import spinner from "./tail-spin.svg";
type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  htmlType?: "button" | "submit" | "reset";
  btnType?: string;
  btnSize?: string;
  img?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
};

const DashButton = ({
  children,
  onClick,
  htmlType = "button",
  btnType = "primary",
  btnSize = "normal",
  img,
  disabled,
  loading,
  className,
}: ButtonProps) => {
  return (
    <button
      className={`tBtn tBtn-${btnType} tBtn-${btnSize} ${
        disabled ? "tBtn-disabled" : ""
      } ${className}`}
      onClick={disabled || loading ? () => {} : onClick}
      type={disabled ? "button" : htmlType}
    >
      {loading && <img src={spinner} className="btnLoader" alt="btnLoader" />}
      {img && <img src={img} alt="btnImg" />}
      {children}
    </button>
  );
};

export default DashButton;
