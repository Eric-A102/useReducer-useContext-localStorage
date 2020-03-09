import * as ls from "local-storage";
export default function reducer(state, action) {
  // console.log(action);
  switch (action.type) {
    //Change Color
    case "changeColorBlue":
      return { ...state, backGroundColor: "blue" };
    case "changeColorRed":
      return { ...state, backGroundColor: "Red" };
    //Count
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    case "reset":
      return { ...state, count: 0 };
    //LogIn
    case "form":
      return {
        ...state,
        user: { ...state.user, [action.field]: action.value }
      };
    case "login":
      return {
        ...state,
        isLoggedIn: ls.get("user") === null ? ls.get("user").stats : true,
        errorMsg: ""
      };
    case "logOut":
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: ls.get("user") === null ? ls.get("user").stats : false,
          userName: "",
          passWord: ""
        }
      };
    case "error":
      return { ...state, errorMsg: "Invalid username or password" };
    //TODO
    case "todo":
      return {
        ...state,
        todo: {
          ...state.todo,
          content: action.value
        }
      };
    case "getList":
      return {
        ...state,
        list: JSON.parse(ls.get("allList")),
        todo: { ...state.todo, id: state.todo.id + 1, content: "" }
      };
    case "delete":
      return {
        ...state,
        list: state.list.filter(todo => todo.id !== action.id),
        processList: state.processList.filter(todo => todo.id !== action.id),
        doneList: state.doneList.filter(todo => todo.id !== action.id)
      };
    case "edit":
      return {
        ...state,
        open: true,
        todo: {
          ...state.todo,
          index: action.index,
          id: action.id,
          content: action.value
        }
      };
    case "editing":
      return {
        ...state,
        todo: {
          ...state.todo,
          content: action.value
        }
      };
    case "doneEditing":
      return {
        ...state,
        ...state.list.map(
          (item, i) => i === action.index && (item.content = action.content)
        ),
        ...state.processList.map(
          (item, i) => i === action.index && (item.content = action.content)
        ),

        open: false,
        todo: { ...state.todo, content: "" }
      };
    case "close":
      return { ...state, open: false, todo: { ...state.todo, content: "" } };
    case "process":
      return {
        ...state,
        processList: [
          ...state.processList,
          ...state.list.filter(todo => todo.id === action.id)
        ],
        list: state.list.filter(todo => todo.id !== action.id)
      };
    case "done":
      return {
        ...state,
        doneList: [
          ...state.doneList,
          ...state.processList.filter(todo => todo.id === action.id)
        ],
        processList: state.processList.filter(todo => todo.id !== action.id)
      };
    case "backTodo":
      return {
        ...state,
        list: [
          ...state.list,
          ...state.processList.filter(todo => todo.id === action.id)
        ],
        processList: state.processList.filter(todo => todo.id !== action.id)
      };
    case "backInProgress":
      return {
        ...state,
        processList: [
          ...state.processList,
          ...state.doneList.filter(todo => todo.id === action.id)
        ],
        doneList: state.doneList.filter(todo => todo.id !== action.id)
      };

    default:
      throw new Error();
  }
}
