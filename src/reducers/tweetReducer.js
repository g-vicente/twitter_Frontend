export default function taskReducer(state = { loggedUser: {} }, action) {
	switch (action.type) {
		case "SET_LOGGED_USER": {
			return { loggedUser: action.payload };
		}
		case "SET_USER": {
			return { profile: action.payload };
		}
		default:
			return state;
	}
}
