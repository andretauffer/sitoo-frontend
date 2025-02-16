import React from "react";
import "./Button.css";

export default ({ children, onClick, disabled, className, id }) => (
  <button
    id={id}
    className={`button ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);
