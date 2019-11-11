import React from "react";
import Button from "../../Blocks/Button";

export default ({ cancelSelection, children, onClick }) => (
  <div className="confirm-card">
    <div className="input-wrapper">
      <p className="confirm-message">
        Are you sure you want to delete {children}?
      </p>
      <div className="confirm-cancel-wrapper">
        <Button className="confirmation-button" onClick={onClick}>
          Yes
        </Button>
        <Button onClick={cancelSelection}>Cancel</Button>
      </div>
    </div>
  </div>
);
