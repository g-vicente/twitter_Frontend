export default function taskReducer(state = {}, action) {
  switch (action.type) {
    case "SET_USER": {
      return (state = action.payload);
    }
    default:
      return state;
  }
}
