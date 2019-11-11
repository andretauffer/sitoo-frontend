import React, { useReducer, useEffect } from "react";

const initialState = {
  showNotifyer: false,
  text: ""
};

const validationReducer = (state, action) => {
  switch (action.type) {
    case "show":
      return {
        ...state,
        showNotifyer: true,
        text: action.value
      };
    case "hide":
      return {
        ...state,
        showNotifyer: false,
        text: ""
      };
    default:
      return {
        ...state
      };
  }
};

export default Component => {
  const State = ({ ...props }) => {
    const [notifyer, dispatch] = useReducer(validationReducer, initialState);

    const revert = () =>
      setTimeout(() => {
        dispatch({ type: "hide" });
      }, 6000);

    const fullCycle = ({ value }) => {
      dispatch({ type: "show", value });
      revert();
    };

    return <Component notifyer={notifyer} notify={fullCycle} {...props} />;
  };
  return State;
};
