const { createStore } = require("redux");

// ===========================
// 1. Action Types
// ===========================
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESET = "RESET";

// ===========================
// 2. Action Creators
// ===========================
const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });
const reset = () => ({ type: RESET });

// ===========================
// 3. Initial State
// ===========================
const initialState = {
	count: 0,
};

// ===========================
// 4. Reducer (Pure Function)
// ===========================
function counterReducer(state = initialState, action) {
	switch (action.type) {
		case INCREMENT:
			return { count: state.count + 1 };
		case DECREMENT:
			return { count: state.count - 1 };
		case RESET:
			return initialState; // reuse করা গেলো
		default:
			return state;
	}
}

// ===========================
// 5. Store
// ===========================
const store = createStore(counterReducer);

// ===========================
// 6. Subscribe (UI Sync)
// ===========================
store.subscribe(() => {
	console.log("Current State:", store.getState());
});

// ===========================
// 7. Dispatch (Trigger actions)
// ===========================
store.dispatch(increment()); // count = 1
store.dispatch(increment()); // count = 2
store.dispatch(decrement()); // count = 1
store.dispatch(reset()); // count = 0
