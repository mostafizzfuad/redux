// ===========================
// 1. Imports (ESM syntax)
// ===========================
import { createStore, applyMiddleware } from "redux";
import pkg from "redux-logger";
const { createLogger } = pkg;

// ===========================
// 2. Action Types
// ===========================
const ADD_PRODUCT = "ADD_PRODUCT";
const REMOVE_PRODUCT = "REMOVE_PRODUCT";
const INCREASE_QTY = "INCREASE_QTY";
const DECREASE_QTY = "DECREASE_QTY";
const CLEAR_PRODUCTS = "CLEAR_PRODUCTS";
const APPLY_COUPON = "APPLY_COUPON"; // ✅ নতুন

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
const applyCoupon = (code) => ({ type: APPLY_COUPON, payload: code });

// ===========================
// 4. Coupon List
// ===========================
const coupons = {
	SAVE10: 10,
	SAVE20: 20,
	HALFPRICE: 50,
};

// ===========================
// 5. Initial State
// ===========================
const initialState = {
	products: [
		{ name: "Sugar", qty: 1, price: 50 },
		{ name: "Salt", qty: 2, price: 20 },
	],
	numberOfProducts: 2,
	totalPrice: 90,
	discount: 0, // %
	coupon: null,
	finalPrice: 90,
};

// ===========================
// 6. Helpers
// ===========================
const calculateTotalPrice = (products) =>
	products.reduce((sum, p) => sum + p.price * p.qty, 0);

const applyDiscountCalc = (totalPrice, discount) =>
	totalPrice - (totalPrice * discount) / 100;

// ===========================
// 7. Reducer
// ===========================
function productReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_PRODUCT: {
			const existing = state.products.find(
				(p) => p.name === action.payload.name
			);
			let updatedProducts;

			if (existing) {
				updatedProducts = state.products.map((p) =>
					p.name === action.payload.name
						? { ...p, qty: p.qty + 1 }
						: p
				);
			} else {
				updatedProducts = [
					...state.products,
					{ ...action.payload, qty: 1 },
				];
			}

			const newTotal = calculateTotalPrice(updatedProducts);
			return {
				...state,
				products: updatedProducts,
				numberOfProducts: updatedProducts.length,
				totalPrice: newTotal,
				finalPrice: applyDiscountCalc(newTotal, state.discount),
			};
		}

		case REMOVE_PRODUCT: {
			const updatedProducts = state.products.filter(
				(p) => p.name !== action.payload
			);
			const newTotal = calculateTotalPrice(updatedProducts);
			return {
				...state,
				products: updatedProducts,
				numberOfProducts: updatedProducts.length,
				totalPrice: newTotal,
				finalPrice: applyDiscountCalc(newTotal, state.discount),
			};
		}

		case INCREASE_QTY: {
			const updatedProducts = state.products.map((p) =>
				p.name === action.payload ? { ...p, qty: p.qty + 1 } : p
			);
			const newTotal = calculateTotalPrice(updatedProducts);
			return {
				...state,
				products: updatedProducts,
				totalPrice: newTotal,
				finalPrice: applyDiscountCalc(newTotal, state.discount),
			};
		}

		case DECREASE_QTY: {
			const updatedProducts = state.products
				.map((p) =>
					p.name === action.payload ? { ...p, qty: p.qty - 1 } : p
				)
				.filter((p) => p.qty > 0);
			const newTotal = calculateTotalPrice(updatedProducts);
			return {
				...state,
				products: updatedProducts,
				numberOfProducts: updatedProducts.length,
				totalPrice: newTotal,
				finalPrice: applyDiscountCalc(newTotal, state.discount),
			};
		}

		case CLEAR_PRODUCTS:
			return {
				products: [],
				numberOfProducts: 0,
				totalPrice: 0,
				discount: 0,
				coupon: null,
				finalPrice: 0,
			};

		case APPLY_COUPON: {
			const code = action.payload;
			const discount = coupons[code] || 0;
			return {
				...state,
				coupon: discount > 0 ? code : null,
				discount,
				finalPrice: applyDiscountCalc(state.totalPrice, discount),
			};
		}

		default:
			return state;
	}
}

// ===========================
// 8. Store with redux-logger
// ===========================
const logger = createLogger();
const store = createStore(productReducer, applyMiddleware(logger));

// ===========================
// 9. Dispatch (Test)
// ===========================
store.dispatch(addProduct("Rice", 60));
store.dispatch(increaseQty("Sugar"));
store.dispatch(applyCoupon("SAVE20")); // ✅ 20% discount
store.dispatch(applyCoupon("HALFPRICE")); // ✅ 50% discount
store.dispatch(removeProduct("Salt"));
store.dispatch(clearProducts());
