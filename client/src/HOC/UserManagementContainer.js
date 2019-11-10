import React, { useEffect, useState } from "react";

export default Component => {
  const Container = ({
    fetcher,
    data,
    loading,
    setUserData,
    userData,
    validateInput,
    setValid,
    emptyFieldsValidation,
    submitPermit,
    notify,
    ...props
  }) => {
    const [users, setUsers] = useState([]);
    const [popEdit, setPopEdit] = useState(false);
    const [popAdd, setPopAdd] = useState(false);
    const [popConfirm, setPopConfirm] = useState(false);
    const [page, setPage] = useState(1);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const getUsers = (start = 1) => {
      const num = 8;
      const page = (start - 1) * num;
      fetcher({
        path: `http://localhost:8088/https://api-sandbox.mysitoo.com/v2/accounts/90316/sites/1/users.json?num=8&start=${page}`
      }).then(res => setUsers(res));
    };

    useEffect(() => {
      getUsers(page);
    }, [page]);

    useEffect(() => {
      emptyFieldsValidation(userData);
      submitPermit();
    }, [userData]);

    const onClickCard = el => {
      setPopEdit(!popEdit);
      setUserData({ type: "fillup", value: el });
      setValid({ type: "fillup" });
    };

    const onChangeInput = ({ e, field, type }) => {
      setUserData({ type: "input", value: e.target.value, field });
      validateInput({ field, input: e.target.value, type });
    };

    const deleteUser = () => {
      fetcher({
        path: `http://localhost:8088/https://api-sandbox.mysitoo.com/v2/accounts/90316/sites/1/users/${userData.userid}.json`,
        method: "DELETE"
      })
        .then(getUsers(page))
        .then(setUserData({ type: "reset" }))
        .then(setPopEdit(false))
        .then(setPopConfirm(false));
    };

    const pagination = () => {
      const pages = parseInt(users.totalcount / 8);
      const lastPage = users.totalcount % 8;
      const total = pages + (lastPage !== 0 ? 1 : 0);
      const array = [];
      for (let i = 1; i <= total; i++) {
        array.push(i);
      }
      return array;
    };

    const showPage = num => {
      if ((num != 0) & (num <= pagination().length)) {
        setPage(num);
      }
    };

    const addUser = () => {
      const newUser = {
        company: userData.company,
        email: userData.email,
        namefirst: userData.namefirst,
        namelast: userData.namelast
      };
      fetcher({
        path:
          "http://localhost:8088/https://api-sandbox.mysitoo.com/v2/accounts/90316/sites/1/users.json",
        method: "POST",
        object: newUser
      })
        .then(res => handleResponse(res))
        .then(getUsers(page))
        .then(setPopAdd(!popAdd))
        .then(setUserData({ type: "reset" }));
    };

    const handleResponse = res => {
      switch (res.statuscode) {
        case 400:
          notify({ type: "show", value: res.errortext });
          break;
        case 401:
          notify({
            type: "show",
            value: "Authorization failed. Please contact the staff"
          });
          break;
        case 404:
          notify({ type: "show", value: "Resourse not found" });
          break;
        case 429:
          notify({
            type: "show",
            value: "Connection issues. Please try again in 5 minutes"
          });
          break;
        case 200:
          notify({ type: "show", value: "Operation successful" });
          break;
        default:
          break;
      }
    };

    const openAdd = () => {
      setUserData({ type: "reset" });
      setValid({ type: "reset" });
      setPopAdd(!popAdd);
    };

    const onClickUpdate = update => {
      fetcher({
        path: `http://localhost:8088/https://api-sandbox.mysitoo.com/v2/accounts/90316/sites/1/users/${userData.userid}.json`,
        method: "PUT",
        object: { [update]: userData[update] }
      })
        .then(res =>
          res === true
            ? notify({ type: "show", value: "Operation successful" })
            : handleResponse(res)
        )
        .then(getUsers(page));
    };

    const closeEdit = () => {
      setUserData({ type: "reset" });
      setValid({ type: "reset" });
      setPopEdit(!popEdit);
    };

    const selectUser = (e, userId) => {
      e.stopPropagation();
      setSelectedUsers([...selectedUsers, userId]);
    };

    const unselectUser = (e, userId) => {
      e.stopPropagation();
      let newState = [];
      selectedUsers.forEach(el => (el !== userId ? newState.push(el) : null));
      setSelectedUsers(newState);
    };

    const isSelected = userId => {
      return selectedUsers.includes(userId);
    };

    const deleteSelected = () => {
      selectedUsers.forEach(id =>
        fetcher({
          path: `http://localhost:8088/https://api-sandbox.mysitoo.com/v2/accounts/90316/sites/1/users/${id}.json`,
          method: "DELETE"
        })
          .then(res => console.log(res))
          .then(getUsers(page))
          .then(setUserData({ type: "reset" }))
          .then(setPopConfirm(false))
      );
    };

    const cancelSelection = () => {
      setSelectedUsers([]);
      setPopConfirm(false);
    };

    const disableDeleteAllButton = () =>
      selectedUsers.length !== 0 ? true : false;

    return (
      <Component
        users={users}
        getUsers={getUsers}
        showPage={showPage}
        page={page}
        userData={userData}
        setUserData={onChangeInput}
        popEdit={popEdit}
        setPopEdit={closeEdit}
        popAdd={popAdd}
        setPopAdd={openAdd}
        popConfirm={popConfirm}
        setPopConfirm={setPopConfirm}
        onClickCard={onClickCard}
        onClickUpdate={onClickUpdate}
        deleteUser={deleteUser}
        addUser={addUser}
        pagination={pagination}
        selectUser={selectUser}
        unselectUser={unselectUser}
        isSelected={isSelected}
        deleteSelected={deleteSelected}
        cancelSelection={cancelSelection}
        disableDeleteAllButton={disableDeleteAllButton}
        {...props}
      />
    );
  };
  return Container;
};
