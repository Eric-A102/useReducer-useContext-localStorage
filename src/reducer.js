import * as ls from "local-storage";
export default function reducer(state, action) {
  var newList = JSON.parse(ls.get(`${action.process}`));
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
        allList: JSON.parse(ls.get("allList")),
        processList: JSON.parse(ls.get("processList")),
        doneList: JSON.parse(ls.get("doneList")),
        todo: { ...state.todo, id: state.todo.id + 1, content: "" }
      };

    case "delete":
      if (action.process === "allList") {
        ls.set(
          "allList",
          JSON.stringify(newList.filter(todo => todo.id !== action.id))
        );
        return {
          ...state,
          allList: JSON.parse(ls.get(action.process))
        };
      } else if (action.process === "processList") {
        ls.set(
          "processList",
          JSON.stringify(newList.filter(todo => todo.id !== action.id))
        );
        return { ...state, processList: JSON.parse(ls.get(action.process)) };
      } else {
        ls.set(
          "doneList",
          JSON.stringify(newList.filter(todo => todo.id !== action.id))
        );
        return { ...state, doneList: JSON.parse(ls.get(action.process)) };
      }

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
        ...state.allList.map(
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
      if (newList == null) newList = [];
      JSON.parse(ls.get(`${action.from}`))
        .filter(todo => {
          return todo.id === action.id;
        })
        .map(res => newList.push(res));
      ls.set(`${action.process}`, JSON.stringify(newList));
      ls.set(
        `${action.from}`,
        JSON.stringify(
          JSON.parse(ls.get(`${action.from}`)).filter(
            todo => todo.id !== action.id
          )
        )
      );
      return {
        ...state,
        [action.process]: JSON.parse(ls.get(`${action.process}`)),
        [action.from]: JSON.parse(ls.get(`${action.from}`))
      };

    case "back":
      JSON.parse(ls.get(`${action.from}`))
        .filter(todo => {
          return todo.id === action.id;
        })
        .map(res => newList.push(res));
      ls.set(`${action.process}`, JSON.stringify(newList));
      ls.set(
        `${action.from}`,
        JSON.stringify(
          JSON.parse(ls.get(`${action.from}`)).filter(
            todo => todo.id !== action.id
          )
        )
      );
      return {
        ...state,
        [action.process]: JSON.parse(ls.get(`${action.process}`)),
        [action.from]: JSON.parse(ls.get(`${action.from}`))
      };

    default:
      throw new Error();
  }
}
