// ===========================
// 1. Import (CommonJS syntax)
// ===========================
// package.json এ "type": "commonjs" দিতে হবে
// npm i redux redux-thunk
const { createStore, applyMiddleware } = require("redux");
const { thunk } = require("redux-thunk");

// ===========================
// 2. Action Types
// ===========================
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST"; // REQUEST → API call শুরু হয়েছে।
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS"; // SUCCESS → ডাটা পাওয়া গেছে।
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE"; // FAILURE → error এসেছে।

// ===========================
// 3. Action Creators
// ===========================
const fetchUsersRequest = () => ({ type: FETCH_USERS_REQUEST });
const fetchUsersSuccess = (users) => ({
	type: FETCH_USERS_SUCCESS,
	payload: users,
});
const fetchUsersFailure = (error) => ({
	type: FETCH_USERS_FAILURE,
	payload: error,
});

// Thunk Action (async)
const fetchUsers = () => {
	return async (dispatch) => {
		dispatch(fetchUsersRequest());

		try {
			const res = await fetch(
				"https://jsonplaceholder.typicode.com/users"
			);
			const data = await res.json();
			dispatch(fetchUsersSuccess(data)); // success হলে ডাটা পাঠানো হবে payload হিসেবে
		} catch (error) {
			dispatch(fetchUsersFailure(error.message)); // error হলে message পাঠানো হবে payload হিসেবে
		}
	};
};

// ===========================
// 4. Initial State
// ===========================
const initialState = {
	loading: false,
	users: [],
	error: "",
};

// ===========================
// 5. Reducer
// ===========================
function userReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_USERS_REQUEST:
			return { ...state, loading: true, error: "" };

		case FETCH_USERS_SUCCESS:
			return { ...state, loading: false, users: action.payload };

		case FETCH_USERS_FAILURE:
			return { ...state, loading: false, error: action.payload };

		default:
			return state;
	}
}

// ===========================
// 6. Store
// ===========================
const store = createStore(userReducer, applyMiddleware(thunk));

// ===========================
// 7. Subscribe
// ===========================
store.subscribe(() => {
	console.log("Updated State:", store.getState());
});

// ===========================
// 8. Dispatch Async Action
// ===========================
store.dispatch(fetchUsers());
