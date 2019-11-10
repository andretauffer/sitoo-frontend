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
    ...props
  }) => {
    const [users, setUsers] = useState([]);
    const [popEdit, setPopEdit] = useState(false);
    const [popAdd, setPopAdd] = useState(false);
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
        .then(setPopEdit(false));
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
        .then(getUsers(page))
        .then(setPopAdd(!popAdd))
        .then(setUserData({ type: "reset" }));
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
      }).then(getUsers(page));
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

    const unselectUser = userId => {
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
          .then(getUsers(page))
          .then(setUserData({ type: "reset" }))
      );
    };

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
        onClickCard={onClickCard}
        onClickUpdate={onClickUpdate}
        deleteUser={deleteUser}
        addUser={addUser}
        pagination={pagination}
        selectUser={selectUser}
        unselectUser={unselectUser}
        isSelected={isSelected}
        deleteSelected={deleteSelected}
        {...props}
      />
    );
  };
  return Container;
};
