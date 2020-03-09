import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Typography, Button } from "@material-ui/core";
import { store } from "../store";
import Tabs from "./Tabs";
import * as ls from "local-storage";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));
export default function Todo() {
  const { state, dispatch } = useContext(store);
  const { todo } = state;
  const classes = useStyles();

  useEffect(() => {
    ls.get("allList") &&
      dispatch({
        type: "getList"
      });
  }, [dispatch]);
  const handleSubmit = e => {
    e.preventDefault();
    var existing = JSON.parse(ls.get("allList"));
    if (existing == null) existing = [];
    ls.set("list", JSON.stringify(todo));
    existing.push(todo);
    ls.set("allList", JSON.stringify(existing));

    dispatch({
      type: "getList"
    });
  };

  return (
    <div>
      <Typography style={{ marginTop: 10 }}>Todo List</Typography>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Todo"
          variant="outlined"
          name="todo"
          value={todo.content}
          onChange={e =>
            dispatch({
              type: "todo",
              value: e.target.value
            })
          }
        />
      </form>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
      <div className={classes.demo} style={{ marginTop: 10 }}>
        <Tabs />
      </div>
    </div>
  );
}
