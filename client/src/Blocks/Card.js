import React from "react";
import "./Card.css";

export default ({ onClick, children, id, className }) => (
  <div id={id} className={`${className} card`} onClick={onClick}>
    {children}
  </div>
);
