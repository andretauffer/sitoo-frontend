import React from "react";
import "./TableHeader.css";
import PopUp from "../../Blocks/PopUp";
import DeleteConfirm from "./DeleteConfirm";

export default ({
  page,
  showPage,
  pagination,
  setPop,
  pop,
  disableDeleteAllButton,
  deleteSelected,
  ...props
}) => (
  <>
    <p className="table-title">Users Management</p>
    <div className="pagination">
      {page === 1 ? (
        <p className="end-of-the-line"> First page</p>
      ) : (
        <p
          className="page-number"
          id="button-previous"
          onClick={() => showPage(page - 1)}
        >
          <i className="fas fa-arrow-left"></i>
        </p>
      )}
      <div className="pages-numbers">
        {pagination().map((el, index) => (
          <p
            key={index}
            className="page-number"
            id={el === page ? "selected" : null}
            onClick={() => showPage(el)}
          >
            {el}
          </p>
        ))}
      </div>
      {page + 1 > pagination().length ? (
        <p className="end-of-the-line"> Last page</p>
      ) : (
        <p
          className="page-number"
          id="button-next"
          onClick={() => showPage(page + 1)}
          hidden={page + 1 > pagination().length ? true : false}
        >
          <i className="fas fa-arrow-right"></i>
        </p>
      )}
    </div>
    <div
      className="add-user"
      onClick={() => setPop({ type: "pop", field: "add" })}
    >
      <i className="fas fa-plus-circle "></i>
    </div>
    {disableDeleteAllButton() ? (
      <div
        className="delete-selected"
        onClick={() => {
          setPop({ type: "pop", field: "deleteGroup" });
        }}
      >
        <i className="fas fa-user-times"></i>{" "}
      </div>
    ) : null}
    <PopUp
      pop={pop.deleteGroup}
      setPop={() => setPop({ type: "hide", field: "deleteGroup" })}
      {...props}
    >
      <DeleteConfirm onClick={deleteSelected} {...props}>
        the selected users
      </DeleteConfirm>
    </PopUp>
  </>
);
