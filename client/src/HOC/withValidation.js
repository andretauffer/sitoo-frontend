import React, { useReducer } from "react";

const initialState = {
  company: false,
  email: false,
  namefirst: false,
  namelast: false,
  empty_fields: [],
  valid: false
};

const validationReducer = (state, action) => {
  switch (action.type) {
    case "input":
      return {
        ...state,
        [action.field]: action.valid
      };
    case "empty":
      return {
        ...state,
        empty_fields: action.value
      };
    case "valid":
      return {
        ...state,
        validated: action.valid
      };
    case "fillup":
      return {
        company: true,
        email: true,
        namefirst: true,
        namelast: true,
        empty_fields: [],
        valid: true
      };
    case "reset":
      return {
        company: false,
        email: false,
        namefirst: false,
        namelast: false,
        empty_fields: true,
        valid: false
      };
    case "grant-permission":
      return {
        ...state,
        valid: true
      };
    case "deny-permission":
      return {
        ...state,
        valid: false
      };
    default:
      return {
        ...state
      };
  }
};

export default Component => {
  const ValidateInput = ({ ...props }) => {
    const [valid, dispatch] = useReducer(validationReducer, initialState);
    const validateInput = ({ field, input, type }) => {
      const regex = {
        alpha: /^[a-öA-Ö\s]+$/g,
        alphanumerical: /^[a-öA-Ö\s\d]+$/g,
        email: /^[a-öA-Ö\d]+([.-]?[a-öA-Ö\d]+)*@[a-öA-Ö\d]+([.-]?[a-öA-Ö\d]+)*(\.[a-öA-Ö]{2,})+$/g
      };
      if (!regex[type].test(input)) {
        dispatch({ type: "input", field, valid: false });
      } else {
        dispatch({ type: "input", field, valid: true });
      }
      return valid[field];
    };

    const emptyFieldsValidation = state => {
      const keys = Object.keys(state);
      const empty = [];
      keys.forEach(key => {
        if (state[key] === "" && key !== "userid") {
          empty.push(key);
        }
      });
      dispatch({ type: "empty", value: empty });
    };

    const submitPermit = () => {
      valid.company &&
      valid.email &&
      valid.namefirst &&
      valid.namelast &&
      valid.empty_fields.length === 0
        ? dispatch({ type: "grant-permission" })
        : dispatch({ type: "deny-permission" });
    };

    return (
      <Component
        validateInput={validateInput}
        emptyFieldsValidation={emptyFieldsValidation}
        submitPermit={submitPermit}
        setValid={dispatch}
        valid={valid}
        setDuplicate={dispatch}
        {...props}
      />
    );
  };
  return ValidateInput;
};
