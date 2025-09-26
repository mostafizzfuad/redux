// src/redux/counterReducer.jsx
import { INCREMENT, DECREMENT, RESET } from "./actions";

const initialState = { count: 0 };

export default function counterReducer(state = initialState, action) {
	switch (action.type) {
		case INCREMENT:
			return { count: state.count + 1 };
		case DECREMENT:
			return { count: state.count - 1 };
		case RESET:
			return initialState;
		default:
			return state;
	}
}
