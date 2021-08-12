export default function tweetReducer(state = { loggedUser: {} }, action) {
  switch (action.type) {
    case "SET_LOGGED_USER": {
      return { loggedUser: action.payload };
    }
    case "SET_USER": {
      return { profile: action.payload };
    }
    case "CLEAR_DATA": {
      return {
        loggedUser: {},
      };
    }
    case "CREATE_TWEET": {
      return {
        ...state,
        loggedUser: {
          ...state.loggedUser,
          tweets: [...state.loggedUser.tweets, action.payload],
          tweetCount: state.loggedUser.tweetCount + 1,
        },
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
          following: [...state.loggedUser.following.filter((item) => item !== action.payload)],
          followingCount: state.loggedUser.followingCount - 1,
        },
      };
    }
    case "SET_LIKE": {
      return {
        // ...state,
        loggedUser: {
          ...state.loggedUser,
          tweetsLiked: [...state.loggedUser.tweetsLiked, action.payload],
        },
        // tweets: state.tweets.map((item) => {
        // 	if (item._id !== action.payload) return item;
        // 	return {
        // 		...item,
        // 		likes: item.likes + 1,
        // 	};
        // }),
      };
    }
    case "SET_UNLIKE": {
      return {
        ...state,
        loggedUser: {
          ...state.loggedUser,
          tweetsLiked: [...state.loggedUser.tweetsLiked.filter((tweet) => tweet !== action.payload)],
        },
        // tweets: state.tweets.map((tweet) => {
        // 	if (tweet._id !== action.payload) return tweet;
        // 	return {
        // 		...tweet,
        // 		likes: tweet.likes - 1,
        // 	};
        // }),
      };
    }
    default:
      return state;
  }
}
