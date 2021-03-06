import t from '../actions/GithubActionTypes';

const initialState = {
	search: 'talend',
	repos: [],
	viewConfig: {
		itemsPerPage: 10,
		showPages: 1,
		has_open_issues: false,
		has_topics: false,
		starred_gt: 0,
		updated_at: null,
		language: 'all',
		allLanguages: ['all'],
		type: 'all',
		allTypes: ['all', 'forks', 'sources'],
		sort: 'name',
		allSorts: ['name', 'stars', 'issues', 'updated'],
		order: 'desc',
		sortOrders: ['asc', 'desc']
	}
};

const sortMapping = {
	name: 'name',
	stars: 'stargazers_count',
	issues: 'open_issues_count',
	updated: 'updated_at'
};

const applyFilterAndSort = (items, config) => (
	items.filter((item) => (
		!(config.has_open_issues && item.open_issues_count === 0 ||
			config.has_topics && (item.topics === undefined || item.topics.length === 0) ||
			config.language !== 'all' && config.language !== item.language ||
			((config.type === 'forks' && !item.fork) || (config.type === 'sources' && item.fork)) ||
			config.updated_at !== null && new Date(config.updated_at).getTime() > new Date(item.updated_at).getTime() ||
			config.starred_gt > item.stargazers_count)
	))
		.sort((first, second) => {
			const delta = config.order === 'desc' ? 1 : -1;
			const column = sortMapping[config.sort];
			const wordA = first[column];
			const wordB = second[column];
			if (wordA < wordB) return delta;
			if (wordA > wordB) return -delta;
			return 0;
		})
);

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case t.UPDATE_SEARCH_QUERY: {
			return { ...state, search: action.payload };
		}
		case t.UPDATE_LIST_OF_REPOS: {
			const repos = action.payload;
			let viewConfig = state.viewConfig;
			viewConfig.itemsPerPage = 10;
			viewConfig.showPages = 1;

			if (!repos){
				return { ...state, repos, viewConfig, vusibleItems: [] };
			}
			const allLanguages = repos.reduce(
				(res, curr) => ( !curr.language || res.includes(curr.language) ? res : [ ...res, curr.language]), ['all']
			);
			viewConfig = { ...viewConfig, allLanguages };
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
		case t.SHOW_MORE_ITEMS: {
			const viewConfig = { ...state.viewConfig, showPages: state.viewConfig.showPages + 1 };
			return { ...state, viewConfig};
		}
		case t.VIEW_CONFIG_REPLACE: {
			const viewConfig = action.payload;
			viewConfig.itemsPerPage = 10;
			viewConfig.showPages = 1;
			const visibleItems = applyFilterAndSort(state.repos, viewConfig);
			return { ...state, visibleItems, viewConfig };
		}
		case t.VIEW_CONFIG_UPDATE: {
			const viewConfig = { ...state.viewConfig, ...action.payload };
			const visibleItems = applyFilterAndSort(state.repos, viewConfig);
			return { ...state, visibleItems, viewConfig };
		}
		default: return state;
	}
};

export default reducer;
