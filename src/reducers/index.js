import t from '../actions/GithubActionTypes';

const initialState = {
	search: 'talend',
	viewConfig: {
		hasOpenIssues: false,
		hasTopics: false,
		starsGtThan: 0,
		modifiedAfter: null,
		selectedLanguage: 'all',
		allLanguages: ['all'],
		selectedType: 'all',
		allTypes: ['all', 'forks', 'sources'],
		selectedSort: 'name',
		allSorts: ['name', 'stars', 'issues', 'date']
	}
};

const applyFilterAndSort = (items, config) => (
	items.filter((item) => {
		if (config.hasOpenIssues && item.open_issues_count === 0 ||
			config.hasTopics && !item.has_wiki ||
			config.selectedLanguage !== 'all' && config.selectedLanguage !== item.language ||
			((config.selectedType === 'forks' && !item.fork) || (config.selectedType === 'sources' && item.fork)) ||
			config.modifiedAfter !== null && config.modifiedAfter.getTime() > new Date(item.updated_at).getTime() ||
			config.starsGtThan > item.stargazers_count) {
			return false;
		}
		return true;
	})
)

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case t.UPDATE_SEARCH_QUERY: {
			return { ...state, search: action.payload };
		}
		case t.UPDATE_LIST_OF_REPOS: {
			const repos = action.payload;
			const allLanguages = repos.reduce(
				(res, curr) => ( !curr.language || res.includes(curr.language) ? res : [ ...res, curr.language]), ['all']
			);
			const viewConfig = { ...state.viewConfig, allLanguages };
			const visibleItems = applyFilterAndSort(repos, viewConfig);
			return { ...state, repos, viewConfig, visibleItems };
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
		case t.VIEW_CONFIG: {
			const visibleItems = applyFilterAndSort(state.repos, action.payload);
			return { ...state, visibleItems, viewConfig: action.payload };
		}
		default: return state;
	}
};

export default reducer;
