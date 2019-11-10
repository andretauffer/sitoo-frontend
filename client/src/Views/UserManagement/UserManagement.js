import React from "react";
import HOC from "../../HOC/HOC";
import Table from "../../Blocks/Table";
import Card from "../../Blocks/Card";
import PopUp from "../../Blocks/PopUp";
import "./UserManagement.css";
import EditUser from "./EditUser";
import AddUser from "./AddUser";
import TableHeader from "./TableHeader";
import DeleteConfirm from "./DeleteConfirm";
import Notifyer from "./Notifyer";

const {
  Composer,
  withFetch,
  UserManagementContainer,
  withUserState,
  withValidation,
  withNotifyerState
} = HOC;

export default Composer(
  UserManagementContainer,
  withFetch,
  withUserState,
  withValidation,
  withNotifyerState
)(
  ({
    users,
    onClickCard,
    loading,
    popEdit,
    setPopEdit,
    popAdd,
    setPopAdd,
    popConfirm,
    setPopConfirm,
    selectUser,
    unselectUser,
    isSelected,
    deleteUser,
    ...props
  }) => {
    return (
      <>
        <Table
          header={
            <TableHeader
              popAdd={popAdd}
              setPopAdd={setPopAdd}
              setPopConfirm={setPopConfirm}
              {...props}
            />
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
                    <i className="fas fa-check-circle"></i>
                  </div>
                ) : (
                  <div
                    className="select-check"
                    onClick={e => selectUser(e, el.userid)}
                  >
                    <i className="far fa-check-circle"></i>
                  </div>
                )}

                <div className="user-image">
                  <i className="fas fa-user-astronaut "></i>
                </div>
                <div className="basic-info">
                  <p className="card-labels">Name</p>
                  <p className="user-name">
                    {el.namefirst + " " + el.namelast}
                  </p>
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
            <EditUser
              setPopEdit={setPopEdit}
              setPopConfirm={setPopConfirm}
              {...props}
            />
          </PopUp>
          <PopUp pop={popAdd} setPop={setPopAdd} {...props}>
            <AddUser setPopAdd={setPopAdd} {...props} />
          </PopUp>
          <PopUp pop={popConfirm} setPop={setPopConfirm} {...props}>
            <DeleteConfirm onClick={deleteUser} name="user" {...props} />
          </PopUp>
        </Table>
        <Notifyer {...props}>Server response</Notifyer>
      </>
    );
  }
);
