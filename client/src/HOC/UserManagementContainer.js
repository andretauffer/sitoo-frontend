import React, { useEffect, useState } from "react";

const mockPpl = () => {
  const ppl = [];
  for (let i = 0; i < 60; i++) {
    ppl.push({
      namefirst: "test",
      namelast: "test",
      email: `name${i}@email.com`,
      company: `comapany${i}`
    });
  }
  return ppl;
};

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
    revert,
    pop,
    setPop,
    ...props
  }) => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const getUsers = (start = 1) => {
      const num = 8;
      const page = (start - 1) * num;
      fetcher({
        path: `http://localhost:8088/https://api-sandbox.mysitoo.com/v2/accounts/90316/sites/1/users.json?num=8&start=${page}`
      }).then(res => {
        handleResponse(res);
        setUsers(res);
      });
    };

    const parseDate = date => {
      const dateToParse = new Date(date);
      const monthCreated = dateToParse.toLocaleString("default", {
        month: "short"
      });
      const dayCreated = dateToParse.getDate();
      const hourCreated =
        dateToParse.getHours() < 10
          ? `0${dateToParse.getHours()}`
          : dateToParse.getHours();
      const minuteCreated =
        dateToParse.getMinutes() < 10
          ? `0${dateToParse.getMinutes()}`
          : dateToParse.getMinutes();

      const time = `${dayCreated} ${monthCreated}, ${hourCreated}:${minuteCreated} ${
        hourCreated < 12 ? "AM" : "PM"
      } `;
      return time;
    };

    useEffect(() => {
      getUsers(page);
    }, [page]);

    useEffect(() => {
      emptyFieldsValidation(userData);
      submitPermit();
    }, [userData]);

    const onClickCard = el => {
      setPop({ type: "pop", field: "edit" });
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
        .then(res =>
          res === true
            ? notify({ type: "show", value: "User successfully deleted!" })
            : handleResponse(res)
        )
        .then(getUsers(page))
        .then(setUserData({ type: "reset" }))
        .then(setPop({ type: "hide", field: "edit" }))
        .then(setPop({ type: "hide", field: "deleteOne" }));
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
        .then(res =>
          typeof res === "string"
            ? notify({ type: "show", value: "User successfully created!" })
            : handleResponse(res)
        )
        .then(getUsers(page))
        .then(setPop({ type: "hide", type: "add" }))
        .then(setUserData({ type: "reset" }));
    };

    const createMockUsers = () => {
      mockPpl().forEach(person =>
        fetcher({
          path:
            "http://localhost:8088/https://api-sandbox.mysitoo.com/v2/accounts/90316/sites/1/users.json",
          method: "POST",
          object: person
        })
      );
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
      setPop({ type: "pop", field: "add" });
    };

    const onClickUpdate = update => {
      fetcher({
        path: `http://localhost:8088/https://api-sandbox.mysitoo.com/v2/accounts/90316/sites/1/users/${userData.userid}.json`,
        method: "PUT",
        object: { [update]: userData[update] }
      })
        .then(res =>
          res === true
            ? notify({ type: "show", value: "User information updated" })
            : handleResponse(res)
        )
        .then(getUsers(page));
    };

    const closeEdit = () => {
      setUserData({ type: "reset" });
      setValid({ type: "reset" });
      setPop({ type: "hide", type: "edit" });
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
          .then(res =>
            res === true
              ? notify({ type: "show", value: "User(s) successfully deleted!" })
              : handleResponse(res)
          )
          .then(setSelectedUsers([]))
          .then(getUsers(page))
          .then(setUserData({ type: "reset" }))
          .then(setPop({ type: "hide", field: "deleteGroup" }))
      );
    };

    const cancelSelection = () => {
      setSelectedUsers([]);
      setPop({ type: "hide", field: "deleteGroup" });
    };

    const disableDeleteAllButton = () =>
      selectedUsers.length !== 0 ? true : false;

    return (
      <Component
        users={users}
        pop={pop}
        setPop={setPop}
        getUsers={getUsers}
        showPage={showPage}
        page={page}
        userData={userData}
        setUserData={onChangeInput}
        closeEdit={closeEdit}
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
        cancelSelection={cancelSelection}
        disableDeleteAllButton={disableDeleteAllButton}
        createMockUsers={createMockUsers}
        parseDate={parseDate}
        {...props}
      />
    );
  };
  return Container;
};
