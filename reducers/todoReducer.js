// reducers/todoReducer.js
import { ADD_TODO, TOGGLE_TODO, CLEAR_TODOS } from "../actions/actionTypes.js";

const initialTodoState = { todos: [] };

export default function todoReducer(state = initialTodoState, action) {
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
