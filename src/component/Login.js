import React, { useContext } from "react";
import { store } from "../store";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function Counter() {
  const classes = useStyles();
  const { state, dispatch } = useContext(store);
  const { user, isLoggedIn, errorMsg } = state;

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
        {isLoggedIn ? (
          <>
            <div style={{ marginTop: 20 }}>Welcome {user.userName}</div>
            <Button
              color="primary"
              onClick={() => dispatch({ type: "logOut" })}
            >
              Log Out
            </Button>
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
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                  name="userName"
                  onChange={handleChange}
                  value={user.userName}
                />

                <TextField
                  style={{ marginTop: 10, marginBottom: 10 }}
                  id="outlined-basic"
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
