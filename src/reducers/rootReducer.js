import { combineReducers } from "redux";

import authReducer from "./authReducer";
import tweetReducer from "./tweetReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
	authReducer,
	tweetReducer,
	userReducer,
});

export default rootReducer;
