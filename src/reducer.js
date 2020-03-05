export default function reducer(state, action) {
  switch (action.type) {
    case "changeColorBlue":
      return { ...state, backGroundColor: "blue" };
    case "changeColorRed":
      return { ...state, backGroundColor: "Red" };
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    case "reset":
      return { ...state, count: 0 };
    case "form":
      return {
        ...state,
        user: { ...state.user, [action.field]: action.value }
      };
    case "login":
      return { ...state, isLoggedIn: true, errorMsg: "" };
    case "logOut":
      return {
        ...state,
        isLoggedIn: false,
        user: { ...state.user, userName: "", passWord: "" }
      };
    case "error":
      return { ...state, errorMsg: "Invalid username or password" };
    default:
      throw new Error();
  }
}
