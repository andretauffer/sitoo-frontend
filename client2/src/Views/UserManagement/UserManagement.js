import React from "react";
import HOC from "../../HOC/HOC";
import Table from "../../Blocks/Table";
import Card from "../../Blocks/Card";
import PopUp from "../../Blocks/PopUp";
import "./UserManagement.css";
import EditUser from "./EditUser";
import AddUser from "./AddUser";
import TableHeader from "./TableHeader";

const {
  Composer,
  withFetch,
  UserManagementContainer,
  withUserState,
  withValidation
} = HOC;

export default Composer(
  UserManagementContainer,
  withFetch,
  withUserState,
  withValidation
)(
  ({
    users,
    onClickCard,
    loading,
    popEdit,
    setPopEdit,
    popAdd,
    setPopAdd,
    selectUser,
    unselectUser,
    isSelected,
    ...props
  }) => {
    return (
      <Table
        header={
          <TableHeader popAdd={popAdd} setPopAdd={setPopAdd} {...props} />
        }
      >
        {users.length !== 0 ? (
          users.items.map((el, index) => (
            <Card key={index} onClick={() => onClickCard(el)}>
              {isSelected(el.userid) ? (
                <div
                  className="select-check"
                  onClick={e => unselectUser(e, el.userid)}
                >
                  <i class="fas fa-check-circle"></i>
                </div>
              ) : (
                <div
                  className="select-check"
                  onClick={e => selectUser(e, el.userid)}
                >
                  <i class="far fa-check-circle"></i>
                </div>
              )}

              <div className="user-image">
                <i className="fas fa-user-astronaut "></i>
              </div>
              <div className="basic-info">
                <p className="card-labels">Name</p>
                <p className="user-name">{el.namefirst + " " + el.namelast}</p>
                <p className="card-labels for-company">Company</p>
                <p className="company-name">{el.company}</p>
              </div>
            </Card>
          ))
        ) : (
          <p className="unable-to-connect">
            Loading users, it will only take a second! Or two...
          </p>
        )}
        <PopUp pop={popEdit} setPop={setPopEdit} {...props}>
          <EditUser setPopEdit={setPopEdit} {...props} />
        </PopUp>
        <PopUp pop={popAdd} setPop={setPopAdd} {...props}>
          <AddUser setPopAdd={setPopAdd} {...props} />
        </PopUp>
      </Table>
    );
  }
);
