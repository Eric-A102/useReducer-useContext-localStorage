import React, { useContext } from "react";
import { store } from "../store";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Count from "./Count";
import Login from "./Login";
import Todo from "./Todo";

export default function Sample() {
  const { state, dispatch } = useContext(store);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography
          component="div"
          style={{
            backgroundColor: `${state.backGroundColor}`,
            height: "5vh",
            borderRadius: 10,
            marginBottom: 10,
            marginTop: 50
          }}
        />
      </Container>
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: 10 }}
        onClick={() => dispatch({ type: "changeColorBlue" })}
      >
        Change to Blue
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => dispatch({ type: "changeColorRed" })}
      >
        Change to Red
      </Button>
      <Count />
      <Login />
      <Todo />
    </>
  );
}
