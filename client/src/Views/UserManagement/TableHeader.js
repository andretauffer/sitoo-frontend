import React from "react";
import "./TableHeader.css";
import PopUp from "../../Blocks/PopUp";
import Button from "../../Blocks/Button";
import DeleteConfirm from "./DeleteConfirm";

export default ({
  page,
  showPage,
  pagination,
  setPopAdd,
  popAdd,
  popConfirm,
  setPopConfirm,
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
    <div className="add-user" onClick={e => setPopAdd(!popAdd)}>
      <i className="fas fa-plus-circle "></i>
    </div>
    {disableDeleteAllButton() ? (
      <div className="delete-selected" onClick={() => setPopConfirm(true)}>
        <i class="fas fa-user-times"></i>{" "}
      </div>
    ) : null}
    <PopUp pop={popConfirm} setPop={setPopConfirm} {...props}>
      <DeleteConfirm
        onClick={deleteSelected}
        name="the selected users"
        {...props}
      />
    </PopUp>
  </>
);
