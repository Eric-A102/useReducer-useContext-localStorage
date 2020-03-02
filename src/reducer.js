export default function reducer(state, action) {
  switch (action.type) {
    case "changeColorBlue":
      return { ...state, backGroundColor: "blue" };
    case "changeColorRed":
      return { ...state, backGroundColor: "Red" };
    default:
      throw new Error();
  }
}
