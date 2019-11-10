import React from "react";
import "./TableHeader.css";

export default ({
  page,
  showPage,
  pagination,
  setPopAdd,
  popAdd,
  deleteSelected
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
        {pagination().map(el => (
          <p
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
    <div className="delete-selected" onClick={deleteSelected}>
      <i class="fas fa-user-times"></i>{" "}
    </div>
  </>
);
