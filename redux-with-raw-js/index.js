// index.js
const { createStore } = require("redux");

// Reducer
function counterReducer(state = { count: 0 }, action) {
	switch (action.type) {
		case "INCREMENT":
			return { count: state.count + 1 };
		default:
			return state;
	}
}

// Store তৈরি
const store = createStore(counterReducer);

// Subscribe → state change হলে notify করবে
store.subscribe(() => {
	console.log("State changed:", store.getState()); // getState() দিয়ে state পড়া
});

// Dispatch
store.dispatch({ type: "INCREMENT" }); // 🔔 এখানে subscribe কল হবে
store.dispatch({ type: "INCREMENT" }); // আবার কল হবে
