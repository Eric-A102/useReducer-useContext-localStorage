import React, { createContext, useReducer } from "react";
import reducer from "./reducer";

const initialState = {
  backGroundColor: "black",
  count: 0,
  user: { userName: "", passWord: "" },
  isLoggedIn: false,
  errorMsg: "",
  todo: {
    id: 0,
    content: ""
  },
  list: [],
  open: false,
  processList: [],
  doneList: []
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
