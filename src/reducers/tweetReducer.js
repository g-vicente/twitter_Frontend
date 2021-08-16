export default function tweetReducer(state = { tweets: [] }, action) {
	switch (action.type) {
		// case "SET_TWEETS": {
		// 	return { tweets: action.payload };
		// }

		// case "TWEET_CREATE_TWEET": {
		// 	return { tweets: [...state.tweets, action.payload] };
		// }
		case "SET_COUNT_LIKE": {
			return {
				tweets: state.tweets.map((item) => {
					if (item._id !== action.payload) {
						return { ...item };
					}
					return { ...item, likes: item.likes + 1 };
				}),
			};
		}
		case "SET_COUNT_UNLIKE":
			return {
				tweets: state.tweets.map((item) => {
					if (item._id !== action.payload) {
						return { ...item };
					}
					return { ...item, likes: item.likes - 1 };
				}),
			};
		case "TWEET_DELETE1":
			return {
				tweets: [...state.tweets.filter((item) => item !== action.payload)],
			};
		default:
			return state;
	}
}
