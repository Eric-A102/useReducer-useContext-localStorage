export default function reducer(state, action) {
  switch (action.type) {
    case "changeColor":
      return { ...state, backGroundColor: "blue" };
    default:
      throw new Error();
  }
}
