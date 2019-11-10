import React from "react";
import "./Button.css";

export default ({ children, onClick, disabled }) => (
  <button class="button" onClick={onClick} disabled={disabled}>
    {children}
  </button>
);
