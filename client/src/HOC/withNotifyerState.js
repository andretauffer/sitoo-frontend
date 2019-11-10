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

    useEffect(() => {
      revert();
    }, [notifyer]);

    const revert = () =>
      setTimeout(() => {
        dispatch({ type: "hide" });
      }, 4000);

    return <Component notifyer={notifyer} notify={dispatch} {...props} />;
  };
  return State;
};
