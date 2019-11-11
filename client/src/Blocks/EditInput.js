import React, { useState } from "react";
import withFetch from "../HOC/withFetch";
import "./EditInput.css";

export default withFetch(
  ({ data, setUserData, field, type, validated, onClickUpdate }) => {
    const [edit, setEdit] = useState(false);

    return edit ? (
      <>
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
        {validated ? (
          <div
            className="edit-button"
            onClick={() => {
              onClickUpdate(field);
              setEdit(false);
            }}
          >
            <i className="fas fa-save edit"></i>
          </div>
        ) : (
          <div className="edit-button disabled">
            <i className="fas fa-save edit"></i>
          </div>
        )}
      </>
    ) : (
      <>
        <div className="input-wrapper">
          <p className="item-text">{data}</p>
        </div>
        <div className="edit-button" onClick={() => setEdit(true)}>
          <i className="fas fa-pen edit"></i>
        </div>
      </>
    );
  }
);
