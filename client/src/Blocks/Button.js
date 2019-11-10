import React from "react";
import "./Button.css";

export default ({ children, onClick, disabled, className }) => (
  <button class={`button ${className}`} onClick={onClick} disabled={disabled}>
    {children}
  </button>
);
