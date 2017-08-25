import t from '../actions/GithubActionTypes';

const initialState = {
	search: 'talend'
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case t.UPDATE_SEARCH_QUERY: {
			return { ...state, search: action.payload };
		}
		case t.UPDATE_LIST_OF_REPOS: {
			return { ...state, repos: action.payload };
		}
		case t.LOADING: {
			return { ...state, loading: action.payload };
		}
		case t.ERROR: {
			return { ...state, error: action.payload };
		}
		case t.DIALOG_VISIBLE: {
			return { ...state, dialogVisible: action.payload };
		}
		case t.DIALOG_INFO: {
			return { ...state, dialogInfo: action.payload };
		}
		default: return state;
	}
};

export default reducer;
