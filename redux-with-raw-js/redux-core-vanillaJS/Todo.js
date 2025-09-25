// index.js
const { createStore } = require("redux");

// ===========================
// 1. Action Types
// ===========================
const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const CLEAR_TODOS = "CLEAR_TODOS";

// ===========================
// 2. Action Creators
// ===========================
function addTodo(text) {
	return { type: ADD_TODO, payload: text };
}

function toggleTodo(id) {
	return { type: TOGGLE_TODO, payload: id };
}

function clearTodos() {
	return { type: CLEAR_TODOS };
}

// ===========================
// 3. Initial State
// ===========================
const initialState = {
	todos: [],
};

// ===========================
// 4. Reducer (Pure Function)
// ===========================
function todoReducer(state = initialState, action) {
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
				todos: state.todos.map(
					(todo) =>
						todo.id === action.payload
							? { ...todo, completed: !todo.completed } // শুধু নির্দিষ্ট todo টার completed স্টেট পরিবর্তন হবে
							: todo // অন্য todo গুলো অপরিবর্তিত থাকবে
				),
			};

		case CLEAR_TODOS:
			return initialState;

		default:
			return state;
	}
}

// ===========================
// 5. Store
// ===========================
const store = createStore(todoReducer);

// ===========================
// 6. Subscribe (UI Sync)
// ===========================
store.subscribe(() => {
	console.log("Current State:", store.getState());
});

// ===========================
// 7. Dispatch (Trigger actions)
// ===========================
store.dispatch(addTodo("Learn Redux")); // নতুন todo যোগ হবে
store.dispatch(addTodo("Practice JS")); // আরেকটা যোগ হবে
store.dispatch(addTodo("Build a Project")); // আরেকটা যোগ হবে

const firstTodoId = store.getState().todos[0].id; // প্রথম todo এর id নিলাম
store.dispatch(toggleTodo(firstTodoId)); // প্রথম todo toggle হবে
store.dispatch(clearTodos()); // সব clear হয়ে যাবে
