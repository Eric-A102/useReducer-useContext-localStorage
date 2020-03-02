import React, { useContext } from "react";
import { store } from "../store";
import Button from "@material-ui/core/Button";

export default function Sample() {
  const globalState = useContext(store);
  console.log(globalState);
  const { state, dispatch } = globalState;

  return (
    <>
      <Button onClick={() => dispatch({ type: "changeColor" })}>
        Click to Change to Blue
      </Button>
      <div>{console.log(state)}</div>
    </>
  );
}
