// src/redux/actions.jsx
// Action Types
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const RESET = "RESET";

// Action Creators
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
export const reset = () => ({ type: RESET });
