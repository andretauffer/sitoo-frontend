import React, { useReducer } from "react";

const initialState = {
  company: "",
  email: "",
  namefirst: "",
  namelast: "",
  userid: ""
};

const validationReducer = (state, action) => {
  switch (action.type) {
    case "input":
      return {
        ...state,
        [action.field]: action.value
      };
    case "fillup":
      return {
        company: action.value.company,
        email: action.value.email,
        namefirst: action.value.namefirst,
        namelast: action.value.namelast,
        userid: action.value.userid
      };
    case "reset":
      return {
        company: "",
        email: "",
        namefirst: "",
        namelast: "",
        userid: ""
      };
    default:
      return {
        ...state
      };
  }
};

export default Component => {
  const State = ({ ...props }) => {
    const [userData, dispatch] = useReducer(validationReducer, initialState);

    return <Component userData={userData} setUserData={dispatch} {...props} />;
  };
  return State;
};
