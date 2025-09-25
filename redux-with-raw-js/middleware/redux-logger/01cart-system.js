// ===========================
// 1. Imports (ESM syntax)
// ===========================
import { createStore, applyMiddleware } from "redux";
import pkg from "redux-logger";
const { createLogger } = pkg;

// ===========================
// 2. Action Types
// ===========================
const ADD_PRODUCT = "ADD_PRODUCT"; // নতুন product add বা qty+1
const REMOVE_PRODUCT = "REMOVE_PRODUCT"; // পুরো product remove
const INCREASE_QTY = "INCREASE_QTY"; // qty +1
const DECREASE_QTY = "DECREASE_QTY"; // qty -1
const CLEAR_PRODUCTS = "CLEAR_PRODUCTS"; // সব clear

// ===========================
// 3. Action Creators
// ===========================
const addProduct = (name, price) => ({
	type: ADD_PRODUCT,
	payload: { name, price },
});

const removeProduct = (name) => ({ type: REMOVE_PRODUCT, payload: name });
const increaseQty = (name) => ({ type: INCREASE_QTY, payload: name });
const decreaseQty = (name) => ({ type: DECREASE_QTY, payload: name });
const clearProducts = () => ({ type: CLEAR_PRODUCTS });

// ===========================
// 4. Initial State
// ===========================
const initialState = {
	products: [
		{ name: "Sugar", qty: 1, price: 50 },
		{ name: "Salt", qty: 2, price: 20 },
	],
	numberOfProducts: 2,
	totalPrice: 90, // (1×50 + 2×20)
};

// ===========================
// 5. Helper: calculate totalPrice
// ===========================
const calculateTotalPrice = (products) =>
	products.reduce((sum, p) => sum + p.price * p.qty, 0);

// ===========================
// 6. Reducer
// ===========================
function productReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_PRODUCT: {
			const existing = state.products.find(
				(p) => p.name === action.payload.name
			);
			let updatedProducts;

			if (existing) {
				// product আছে → qty +1
				updatedProducts = state.products.map((p) =>
					p.name === action.payload.name
						? { ...p, qty: p.qty + 1 }
						: p
				);
			} else {
				// নতুন product add
				updatedProducts = [
					...state.products,
					{ ...action.payload, qty: 1 },
				];
			}

			return {
				...state,
				products: updatedProducts,
				numberOfProducts: updatedProducts.length,
				totalPrice: calculateTotalPrice(updatedProducts),
			};
		}

		case REMOVE_PRODUCT: {
			const updatedProducts = state.products.filter(
				(p) => p.name !== action.payload
			);
			return {
				...state,
				products: updatedProducts,
				numberOfProducts: updatedProducts.length,
				totalPrice: calculateTotalPrice(updatedProducts),
			};
		}

		case INCREASE_QTY: {
			const updatedProducts = state.products.map((p) =>
				p.name === action.payload ? { ...p, qty: p.qty + 1 } : p
			);
			return {
				...state,
				products: updatedProducts,
				totalPrice: calculateTotalPrice(updatedProducts),
			};
		}

		case DECREASE_QTY: {
			const updatedProducts = state.products
				.map((p) =>
					p.name === action.payload ? { ...p, qty: p.qty - 1 } : p
				)
				.filter((p) => p.qty > 0); // qty 0 হলে remove করে দিবে

			return {
				...state,
				products: updatedProducts,
				numberOfProducts: updatedProducts.length,
				totalPrice: calculateTotalPrice(updatedProducts),
			};
		}

		case CLEAR_PRODUCTS:
			return { products: [], numberOfProducts: 0, totalPrice: 0 };

		default:
			return state;
	}
}

// ===========================
// 7. Store with redux-logger
// ===========================
const logger = createLogger();
const store = createStore(productReducer, applyMiddleware(logger));

// ===========================
// 8. Dispatch (Test)
// ===========================
store.dispatch(addProduct("Rice", 60)); // নতুন product
store.dispatch(addProduct("Sugar", 50)); // Sugar আগে আছে → qty+1 হবে
store.dispatch(increaseQty("Salt")); // Salt qty+1
store.dispatch(decreaseQty("Salt")); // Salt qty-1
store.dispatch(removeProduct("Rice")); // Rice remove
store.dispatch(clearProducts()); // সব clear


