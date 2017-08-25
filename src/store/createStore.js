const createStore = (reducer, listeners = []) => {
	let state;
	const getState = () => state;

	const dispatch = (action) => {
		if (typeof action === 'function') {
			action(dispatch);
		} else {
			state = reducer(state, action);
			console.log("New state", state);
			listeners.forEach(listener => listener());
		}
	};

	const subscribe = (listener) => {
		listeners.push(listener);
		return () => {
			listeners = listeners.filter(l => l !== listener);
		};
	};

	dispatch({});

	return { getState, dispatch, subscribe };
};

export default createStore;
