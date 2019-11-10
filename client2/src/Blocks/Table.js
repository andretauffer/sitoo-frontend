import React from "react";
import "./Table.css";

export default ({ header, children }) => (
  <div className="table">
    <header className="table-header">{header}</header>
    <div className="table-children">{children}</div>
  </div>
);
