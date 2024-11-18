import React from "react";
import DashButton from "../DashButton";
import "./index.scss";

type ModalProps = {
  children: React.ReactNode;
  okText?: string;
  title: string;
  className?: string;
  visible: boolean;
  footer?: boolean;
  okBtnProps?: { loading?: boolean; disabled?: boolean };
  onOk: () => void;
  onCancel: () => void;
};

const Modal = ({
  title,
  okText,
  children,
  visible,
  className,
  okBtnProps,
  footer = true,
  onOk,
  onCancel,
}: ModalProps) => {
  return (
    <div
      className={`tModalBg tModalBg-${
        visible ? "visible" : "hidden"
      } min-h-screen min-w-full h-[400px] flex items-center justify-center bg-[#000000b3] fixed top-0 left-0 z-50`}
    >
      <div
        className={`tModal tModal-${
          visible ? "visible" : "hidden"
        } bg-white w-fit max-w-[500px] rounded-sm overflow-hidden ${className}`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">{title}</h2>
          <span className="cursor-pointer" onClick={onCancel}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </span>
        </div>

        <div className="tModal-body">{children}</div>

        {footer && (
          <div className="tModal-footer">
            <DashButton btnType="link" btnSize="small" onClick={onCancel}>
              Cancel
            </DashButton>
            <DashButton onClick={onOk} btnSize="small" {...okBtnProps}>
              {okText}
            </DashButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
