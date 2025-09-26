// main.jsx
import { createRoot } from "react-dom/client";
import "./index.css"; // Tailwind CSS import
import App from "./App.jsx"; // Main App component
import { Provider } from "react-redux"; // React-Redux Provider
import store from "./redux/store"; // Redux store

createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<App />
	</Provider>
);
