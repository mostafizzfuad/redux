// reducers/rootReducer.js
import { combineReducers } from "redux";
import counterReducer from "./counterReducer.js";
import todoReducer from "./todoReducer.js";
import { RESET_ALL } from "../actions/actionTypes.js";

// Combined Reducers
const appReducer = combineReducers({
	counter: counterReducer,
	todo: todoReducer,
});

// Root Reducer to handle RESET_ALL
export default function rootReducer(state, action) {
	if (action.type === RESET_ALL) {
		// পুরো store initial state এ চলে যাবে
		return appReducer(undefined, { type: "@@INIT" });
	}
	return appReducer(state, action);
}
/* 
Redux reducer-এ যদি state = undefined পাঠানো হয়, তাহলে reducer initial state রিটার্ন করে।
আর { type: "@@INIT" } হলো Redux-এর একটা ডিফল্ট action, যা দিয়ে initial state সেট করা হয়।
এর মানে হচ্ছে: "পুরো store কে আবার প্রথমবারের মতো initialize করো।"
*/
