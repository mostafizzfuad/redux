// actions/counterActions.js
import { INCREMENT, DECREMENT, RESET } from "./actionTypes.js";

export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
export const reset = () => ({ type: RESET });
