import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { store } from "../store";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import EditIcon from "@material-ui/icons/Edit";
import Tab from "@material-ui/core/Tab";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DoneIcon from "@material-ui/icons/Done";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import * as ls from "local-storage";

import AlertDialog from "./Dialog";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    width: 500,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const { state, dispatch } = useContext(store);
  const { allList, processList, doneList } = state;
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    ls.get("processList") ||
      (ls.get("doneList") &&
        dispatch({
          type: "getList"
        }));
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleDelete = (todoId, process) => {
    dispatch({ type: "delete", id: todoId, process: process });
  };

  const handleProcess = (todoId, process, from) => {
    dispatch({
      type: "process",
      id: todoId,
      process: process,
      from: from
    });
  };

  const handleEdit = (i, todoId, todoContent, process) => {
    dispatch({
      type: "edit",
      index: i,
      id: todoId,
      value: todoContent,
      process: process
    });
  };

  return (
    <div className={classes.root} style={{ marginLeft: "37%" }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          centered
        >
          <Tab label="To Do" {...a11yProps(0)} />
          <Tab label="On Process" {...a11yProps(1)} />
          <Tab label="Done" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      {allList.length ? (
        allList.map((data, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <TabPanel value={value} index={0}>
              {data.content}
              <Tooltip title="Delete" arrow>
                <DeleteIcon
                  style={{ marginLeft: 50 }}
                  onClick={() => handleDelete(data.id, "allList")}
                />
              </Tooltip>
              <Tooltip title="Edit" arrow>
                <EditIcon
                  style={{ marginLeft: 20 }}
                  onClick={() =>
                    handleEdit(i, data.id, data.content, "allList")
                  }
                />
              </Tooltip>
              <Tooltip title="In Progress ?" arrow>
                <ArrowForwardIcon
                  style={{ marginLeft: 20 }}
                  onClick={() =>
                    handleProcess(data.id, "processList", "allList")
                  }
                />
              </Tooltip>
            </TabPanel>
          </div>
        ))
      ) : (
        <TabPanel value={value} index={0}>
          No Data
        </TabPanel>
      )}
      {processList.length ? (
        processList.map((data, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <TabPanel value={value} index={1}>
              <Tooltip title="Edit" arrow>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    handleEdit(i, data.id, data.content, "processList")
                  }
                >
                  {data.content}
                </span>
              </Tooltip>
              <Tooltip title="Delete" arrow>
                <DeleteIcon
                  style={{ marginLeft: 50 }}
                  onClick={() => handleDelete(data.id, "processList")}
                />
              </Tooltip>
              <Tooltip title="Back To do?" arrow>
                <ArrowBackIcon
                  style={{ marginLeft: 20 }}
                  id="backTodo"
                  onClick={() =>
                    handleProcess(data.id, "allList", "processList")
                  }
                />
              </Tooltip>
              <Tooltip title="Done?" arrow>
                <DoneIcon
                  style={{ marginLeft: 20 }}
                  id="done"
                  onClick={() =>
                    handleProcess(data.id, "doneList", "processList")
                  }
                />
              </Tooltip>
            </TabPanel>
          </div>
        ))
      ) : (
        <TabPanel value={value} index={1}>
          No Data
        </TabPanel>
      )}
      {doneList.length ? (
        doneList.map((data, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <TabPanel value={value} index={2}>
              {data.content}
              <Tooltip title="Delete" arrow>
                <DeleteIcon
                  style={{ marginLeft: 50 }}
                  onClick={() => handleDelete(data.id, "doneList")}
                />
              </Tooltip>
              <Tooltip title="Back to Progress" arrow>
                <ArrowBackIcon
                  style={{ marginLeft: 20 }}
                  id="backInProgress"
                  onClick={() =>
                    handleProcess(data.id, "processList", "doneList")
                  }
                />
              </Tooltip>
            </TabPanel>
          </div>
        ))
      ) : (
        <TabPanel value={value} index={2}>
          No Data
        </TabPanel>
      )}
      <AlertDialog />
    </div>
  );
}
