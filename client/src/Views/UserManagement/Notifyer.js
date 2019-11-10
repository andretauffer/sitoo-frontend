import React from "react";
import "./Notifyer.css";

export default ({ notifyer }) => {
  return notifyer.showNotifyer ? (
    <div className="notifyer">{notifyer.text}</div>
  ) : null;
};
