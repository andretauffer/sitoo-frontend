import React from "react";
import "./Card.css";

export default ({ onClick, children, id }) => (
  <div id={id} className="card" onClick={onClick}>
    {children}
  </div>
);
