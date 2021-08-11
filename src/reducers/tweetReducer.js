export default function taskReducer(state = { loggedUser: {} }, action) {
	switch (action.type) {
		case "SET_LOGGED_USER": {
			return { loggedUser: action.payload };
		}
		case "SET_USER": {
			return { profile: action.payload };
		}
		case "SET_TWEETS": {
			return { loggedUser: state.loggedUser, tweets: action.payload };
		}
		case "CLEAR_DATA": {
			return {
				loggedUser: {},
			};
		}
		case "SET_FOLLOW": {
			return {
				...state,
				loggedUser: {
					...state.loggedUser,
					following: [...state.loggedUser.following, action.payload],
					followingCount: state.loggedUser.followingCount + 1,
				},
			};
		}
		case "SET_UNFOLLOW": {
			return {
				...state,
				loggedUser: {
					...state.loggedUser,
					following: [
						...state.loggedUser.following.filter(
							(item) => item != action.payload
						),
					],
					followingCount: state.loggedUser.followingCount - 1,
				},
			};
		}
		default:
			return state;
	}
}
