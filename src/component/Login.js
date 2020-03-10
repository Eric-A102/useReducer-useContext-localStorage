import React, { useContext } from "react";
import { store } from "../store";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Sample from "../component/Sample";
import * as ls from "local-storage";
import Count from "./Count";
import Todo from "./Todo";
import AppBar from "./AppBar";

export default function Counter() {
  const classes = useStyles();
  const { state, dispatch } = useContext(store);
  const { user, errorMsg, isLoggedIn } = state;

  const handleChange = e => {
    dispatch({
      type: "form",
      field: e.target.name,
      value: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (user.userName === "eric" && user.passWord === "atento123") {
      ls.set("processList", "[]");
      ls.set("doneList", "[]");
      ls.set("user", {
        stats: true,
        Username: user.userName,
        Password: user.passWord
      });
      dispatch({
        type: "login"
      });
    } else {
      dispatch({
        type: "error"
      });
    }
  };
  return (
    <>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        {(JSON.parse(ls.get("user") === null) ? (
          isLoggedIn
        ) : (
          ls.get("user").stats
        )) ? (
          <>
            <AppBar />
            {/* <Sample />
            <Count /> */}
            <Todo />
          </>
        ) : (
          <>
            <h3>Login</h3>
            <form
              style={{ marginLeft: "44.5%" }}
              className={classes.root}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <TextField
                  id="username"
                  label="Username"
                  variant="outlined"
                  name="userName"
                  onChange={handleChange}
                  value={user.userName}
                />

                <TextField
                  style={{ marginTop: 10, marginBottom: 10 }}
                  id="password"
                  label="Password"
                  variant="outlined"
                  name="passWord"
                  type="password"
                  onChange={handleChange}
                  value={user.passWord}
                />
                <Button variant="contained" color="primary" type="submit">
                  Log In
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));
