import { combineReducers, createStore } from "redux";

// ===========================
// 1. Action Types
// ===========================
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESET = "RESET"; // শুধু counter reset

const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const CLEAR_TODOS = "CLEAR_TODOS";

const RESET_ALL = "RESET_ALL"; // পুরো store reset

// ===========================
// 2. Action Creators
// ===========================
const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });
const reset = () => ({ type: RESET });

const addTodo = (text) => ({ type: ADD_TODO, payload: text });
const toggleTodo = (id) => ({ type: TOGGLE_TODO, payload: id });
const clearTodos = () => ({ type: CLEAR_TODOS });

const resetAll = () => ({ type: RESET_ALL });

// ===========================
// 3. Initial States
// ===========================
const initialCounterState = { count: 0 };
const initialTodoState = { todos: [] };

// ===========================
// 4. Reducers
// ===========================
function counterReducer(state = initialCounterState, action) {
	switch (action.type) {
		case INCREMENT:
			return { count: state.count + 1 };
		case DECREMENT:
			return { count: state.count - 1 };
		case RESET:
			return initialCounterState;
		default:
			return state;
	}
}

function todoReducer(state = initialTodoState, action) {
	switch (action.type) {
		case ADD_TODO:
			return {
				...state,
				todos: [
					...state.todos,
					{ id: Date.now(), text: action.payload, completed: false },
				],
			};

		case TOGGLE_TODO:
			return {
				...state,
				todos: state.todos.map((todo) =>
					todo.id === action.payload
						? { ...todo, completed: !todo.completed }
						: todo
				),
			};

		case CLEAR_TODOS:
			return initialTodoState;

		default:
			return state;
	}
}

// ===========================
// 5. Combine Reducers
// ===========================
const appReducer = combineReducers({
	counter: counterReducer,
	todo: todoReducer,
});

// ===========================
// 6. Root Reducer (RESET_ALL handle করবে)
// ===========================
function rootReducer(state, action) {
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

// ===========================
// 7. Store
// ===========================
const store = createStore(rootReducer);

// ===========================
// 8. Subscribe
// ===========================
store.subscribe(() => {
	console.log("State updated:", store.getState());
});

// ===========================
// 9. Dispatch (Test)
// ===========================
store.dispatch(increment());
store.dispatch(addTodo("Learn Redux"));
store.dispatch(addTodo("Practice RESET_ALL"));

console.log("Before RESET_ALL:", store.getState());

store.dispatch(resetAll()); // সব reset হবে

console.log("After RESET_ALL:", store.getState());
