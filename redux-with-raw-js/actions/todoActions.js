// actions/todoActions.js
import {
	ADD_TODO,
	TOGGLE_TODO,
	CLEAR_TODOS,
	RESET_ALL,
} from "./actionTypes.js";

export const addTodo = (text) => ({ type: ADD_TODO, payload: text });
export const toggleTodo = (id) => ({ type: TOGGLE_TODO, payload: id });
export const clearTodos = () => ({ type: CLEAR_TODOS });
export const resetAll = () => ({ type: RESET_ALL }); // Global reset action
