import React from "react";
import Button from "../../Blocks/Button";
import AddInput from "../../Blocks/AddInput";
import "./AddUser.css";

export default ({ userData, addUser, setPopAdd, valid, ...props }) => (
  <div className="data-card">
    <div className="close-icon" onClick={e => setPopAdd(false)}>
      <i className="fas fa-times-circle "></i>
    </div>

    <div className="categories">
      <div className="first-name field">
        <p className="label">First Name</p>
        <AddInput
          data={userData.namefirst}
          userData={userData}
          field="namefirst"
          type="alpha"
          validated={valid.namefirst}
          {...props}
        />
      </div>
      <div className="last-name field">
        <p className="label">Last Name</p>
        <AddInput
          data={userData.namelast}
          userData={userData}
          field="namelast"
          type="alpha"
          validated={valid.namelast}
          {...props}
        />
      </div>
      <div className="company field">
        <p className="label">Company</p>
        <AddInput
          data={userData.company}
          userData={userData}
          field="company"
          type="alphanumerical"
          validated={valid.company}
          {...props}
        />
      </div>
      <div className="email field">
        <p className="label">Email</p>
        <AddInput
          data={userData.email}
          userData={userData}
          field="email"
          type="email"
          validated={valid.email}
          {...props}
        />
      </div>
    </div>
    <Button onClick={addUser} disabled={valid.valid ? false : true}>
      Add user
    </Button>
  </div>
);
