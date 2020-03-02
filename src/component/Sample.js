import React, { useContext } from "react";
import { store } from "../store";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

export default function Sample() {
  const classes = useStyles();
  const globalState = useContext(store);
  const { state, dispatch } = globalState;

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
            marginBottom: 10
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
    </>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));
