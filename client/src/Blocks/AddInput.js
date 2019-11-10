import React, { useState } from "react";
import withFetch from "../HOC/withFetch";
import "./EditInput.css";

export default ({ data, setUserData, field, type, validated }) => {
  return (
    <div className="input-wrapper">
      <input
        className="edit-input"
        placeholder="New info..."
        onChange={e => setUserData({ e, field, type })}
        value={data}
      />
      {data === "" || validated ? null : (
        <p className="invalid-message">Invalid input</p>
      )}
    </div>
  );
};
