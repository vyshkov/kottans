import GithubActionCreator from '../actions/GithubActionCreator';

const extractParams = string => string.substring(1).split("&").reduce((res, curr) => {
	if (curr.indexOf('=') === -1) {
		res[decodeURIComponent(curr)] = true;
	} else {
		const tokens = curr.split('=');
		res[decodeURIComponent(tokens[0])] = decodeURIComponent(tokens[1]);
	}
	return res;
} , {});

const enableUrlController = store => {
	/*
	 * This function needed to trick free hostings that don't work SPAs.
	 */
	const updateForwardedUrl = function () {
		if (location.search.startsWith('?forwardedFrom=')) {
			const decoded = decodeURIComponent(location.search.substring('?forwardedFrom='.length));
			history.pushState(null, null, decoded);
		}
	};
	const updateState = () => {
		let urlRepo = window.location.pathname.slice(1);
		if (urlRepo) {
			store.dispatch(GithubActionCreator.updateSearch(urlRepo));
			store.dispatch(GithubActionCreator.findRepos(urlRepo, true));
		}
		if (location.search){
			store.dispatch(GithubActionCreator.mergeViewConfig(extractParams(document.location.search)));
		}
	};
	updateForwardedUrl();
	updateState();
	window.addEventListener('popstate', updateState, false);
};

export default enableUrlController;
