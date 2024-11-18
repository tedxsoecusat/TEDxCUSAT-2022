import React from "react";
import "./index.scss";

type DashLoaderPropTypes = {
  isFullPage?: boolean;
};
const DashLoader = ({ isFullPage }: DashLoaderPropTypes) => {
  return (
    <div
      className={`tLoaderContainer-${isFullPage ? "fullpage" : "fitContent"}`}
    >
      <svg
        className="tLoader"
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="60"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="18" x2="12" y2="22" color="#000000"></line>
        <line x1="12" y1="2" x2="12" y2="6" color="#ff2b06"></line>zzz
        <line
          x1="16.24"
          y1="16.24"
          x2="19.07"
          y2="19.07"
          color="#000000"
        ></line>
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" color="#ff2b06"></line>
        <line x1="18" y1="12" x2="22" y2="12" color="#000000"></line>
        <line x1="2" y1="12" x2="6" y2="12" color="#ff2b06"></line>
        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" color="#000000"></line>
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" color="#ff2b06"></line>
      </svg>
    </div>
  );
};

export default DashLoader;
