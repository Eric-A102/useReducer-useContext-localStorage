import React, { useContext } from "react";
import { store } from "../store";
import { Button } from "@material-ui/core";

export default function Count() {
  const { state, dispatch } = useContext(store);
  return (
    <div>
      <div style={{ marginTop: 60 }}>Count: {state.count}</div>
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: 10 }}
        onClick={() => dispatch({ type: "increment" })}
      >
        +
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: 10 }}
        onClick={() => dispatch({ type: "decrement" })}
      >
        -
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch({ type: "reset" })}
      >
        Reset
      </Button>
    </div>
  );
}
