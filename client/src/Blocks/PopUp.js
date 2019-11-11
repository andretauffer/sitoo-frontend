import React from "react";
import Card from "./Card";
import "./PopUp.css";

export default ({ pop, setPop, children }) => {
  return pop ? (
    <>
      <div className="overlay" onClick={() => setPop(!pop)} />
      <Card className="in-pop">{children}</Card>
    </>
  ) : null;
};
