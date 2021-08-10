import { combineReducers } from "redux";

import authReducer from "./authReducer";
import tweetReducer from "./tweetReducer";

const rootReducer = combineReducers({
	authReducer,
	tweetReducer,
});

export default rootReducer;
