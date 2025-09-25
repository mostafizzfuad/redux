// reducers/counterReducer.js
import { INCREMENT, DECREMENT, RESET } from "../actions/actionTypes.js";

const initialCounterState = { count: 0 };

export default function counterReducer(state = initialCounterState, action) {
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
