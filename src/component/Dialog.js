import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { TextField } from "@material-ui/core";
import { store } from "../store";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog() {
  const classes = useStyles();
  const { state, dispatch } = React.useContext(store);
  const { open, todo } = state;

  const handleClose = () => {
    dispatch({ type: "close" });
  };
  const handleSubmit = () => {
    dispatch({ type: "doneEditing", index: todo.index, content: todo.content });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Edit Todo</DialogTitle>
      <DialogContent>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Todo"
            variant="outlined"
            name="todo"
            value={todo.content}
            onChange={e =>
              dispatch({
                type: "editing",
                index: todo.index,
                id: todo.id,
                value: e.target.value
              })
            }
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleSubmit()} color="primary">
          Ok
        </Button>
        <Button onClick={handleClose} color="primary" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
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
