// store/store.js
const { createStore } = require("redux");
import rootReducer from "../reducers/rootReducer.js";

const store = createStore(rootReducer);

export default store;
