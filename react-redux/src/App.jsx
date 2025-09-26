// src/App.jsx
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "./redux/actions";

const App = () => {
	const count = useSelector((state) => state.count); // state পড়া
	const dispatch = useDispatch(); // action পাঠানো

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-2">
			<h1 className="text-3xl font-medium">Count: {count}</h1>
			<div className="space-x-2">
				<button
					onClick={() => dispatch(increment())}
					className="bg-teal-900 text-white rounded px-2 py-1 mb-2 cursor-pointer"
				>
					+ Increment
				</button>
				<button
					onClick={() => dispatch(decrement())}
					className="bg-red-900 text-white rounded px-2 py-1 mb-2 cursor-pointer"
				>
					- Decrement
				</button>
				<button
					onClick={() => dispatch(reset())}
					className="bg-gray-900 text-white rounded px-2 py-1 mb-2 cursor-pointer"
				>
					Reset
				</button>
			</div>
		</div>
	);
};

export default App;


