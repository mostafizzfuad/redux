// index.js (App entry)
import store from "./store/store.js";
import { increment, decrement, reset } from "./actions/counterActions.js";
import {
	addTodo,
	toggleTodo,
	clearTodos,
	resetAll,
} from "./actions/todoActions.js";

// Subscribe
store.subscribe(() => {
	console.log("State updated:", store.getState());
});

// Dispatch actions
store.dispatch(increment());
store.dispatch(addTodo("Learn Redux Folder Structure"));
store.dispatch(addTodo("Practice RESET_ALL"));

const firstTodoId = store.getState().todo.todos[0].id;
store.dispatch(toggleTodo(firstTodoId));

store.dispatch(clearTodos()); // শুধু todos খালি
store.dispatch(reset()); // শুধু counter reset
store.dispatch(resetAll()); // পুরো store একসাথে reset
