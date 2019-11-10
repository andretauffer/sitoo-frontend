import React from "react";
import EditInput from "../../Blocks/EditInput";

export default ({ userData, deleteUser, setPopEdit, valid, ...props }) => (
  <div className="data-card">
    {console.log("valid", valid)}
    <div className="close-icon" onClick={() => setPopEdit(false)}>
      <i className="fas fa-times-circle "></i>
    </div>
    <div className="delete-user" onClick={deleteUser}>
      <i className="fas fa-trash-alt"></i>
    </div>
    <div className="user-image">
      <i className="fas fa-user-astronaut "></i>
    </div>
    <div className="categories">
      <div className="first-name field">
        <p className="label">First Name</p>
        <EditInput
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
        <EditInput
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
        <EditInput
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
        <EditInput
          data={userData.email}
          userData={userData}
          field="email"
          type="email"
          validated={valid.email}
          {...props}
        />
      </div>
    </div>
  </div>
);
