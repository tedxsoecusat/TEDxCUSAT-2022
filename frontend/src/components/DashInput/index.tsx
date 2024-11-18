import "./index.scss";
import React from "react";

type DashInputProps = {
  name?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  state?: string;
  errMsg?: string;
  onChange?: (val: string) => void;
};

const DashInput = ({
  name,
  label,
  placeholder,
  state,
  errMsg,
  className,
  onChange,
}: DashInputProps) => {
  const handleChange = (val: string) => {
    if (onChange) onChange(val);
  };

  return (
    <div className={`tInput tInput-${state} ${className ?? ""}`}>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
      />
      <p className="tInput-errMsg">{errMsg}</p>
    </div>
  );
};

export default DashInput;
