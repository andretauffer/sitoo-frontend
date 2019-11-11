import React from "react";
import Table from "../../Blocks/Table";
import Card from "../../Blocks/Card";
import PopUp from "../../Blocks/PopUp";
import "./UserManagement.css";
import EditUser from "./EditUser";
import AddUser from "./AddUser";
import TableHeader from "./TableHeader";
import DeleteConfirm from "./DeleteConfirm";
import Notifyer from "../../Blocks/Notifyer";

import HOC from "../../HOC/HOC";
const {
  Composer,
  withFetch,
  UserManagementContainer,
  withUserState,
  withValidation,
  withNotifyerState,
  withPopState
} = HOC;

export default Composer(
  UserManagementContainer,
  withFetch,
  withUserState,
  withValidation,
  withNotifyerState,
  withPopState
)(
  ({
    users,
    pop,
    setPop,
    onClickCard,
    loading,
    selectUser,
    unselectUser,
    isSelected,
    deleteUser,
    createMockUsers,
    ...props
  }) => {
    return (
      <>
        <Table header={<TableHeader pop={pop} setPop={setPop} {...props} />}>
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
          <PopUp
            pop={pop.edit}
            setPop={() => setPop({ type: "hide", field: "edit" })}
            {...props}
          >
            <EditUser setPop={setPop} {...props} />
          </PopUp>
          <PopUp
            pop={pop.add}
            setPop={() => setPop({ type: "hide", field: "add" })}
            {...props}
          >
            <AddUser setPop={setPop} {...props} />
          </PopUp>
          <PopUp
            pop={pop.deleteOne}
            setPop={() => setPop({ type: "hide", field: "deleteOne" })}
            {...props}
          >
            <DeleteConfirm onClick={deleteUser} name="user" {...props} />
          </PopUp>
        </Table>
        <Notifyer {...props}>Server response</Notifyer>
        {/* <Button id="create-mock-button" onClick={createMockUsers}>
          Create mock Users
        </Button> */}
      </>
    );
  }
);
