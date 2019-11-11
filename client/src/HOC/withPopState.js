import React, { useReducer } from "react";

const initialState = {
  edit: false,
  add: false,
  deleteOne: false,
  deleteGroup: false
};

const validationReducer = (state, action) => {
  switch (action.type) {
    case "pop":
      return {
        ...state,
        [action.field]: true
      };
    case "hide":
      return {
        ...state,
        [action.field]: false
      };
    default:
      return {
        ...state
      };
  }
};

export default Component => {
  const State = ({ ...props }) => {
    const [pop, dispatch] = useReducer(validationReducer, initialState);

    return <Component pop={pop} setPop={dispatch} {...props} />;
  };
  return State;
};
