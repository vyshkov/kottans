import t from './GithubActionTypes';

const errorHandler = message => resp => {
	if (resp.status === 403){
		throw new Error(' You made too much requests on Github. It now sends 403 error code! Please wait a while. Go make a tea :)');
	}
	if (!resp.ok) {
		throw new Error(message || 'Bad response code');
	}
	return resp;
};

const showError = e => console.warn(e);

const updateUrlState = (disablePushUrl, name) => {
	if (!disablePushUrl) {
		const params = location.search ? '' : location.search;
		window.history.pushState(null, null, `/${name}${params}`);
	}
};

const convertConfigToUrlParams = config => (
	Object.keys(config).reduce((res, curr) => {
		const value = config[curr];
		if (value === true) return `${res}${curr}&`;
		if (typeof value === 'string' || typeof value === 'number') return `${res}${curr}=${value}&`;
		return res;
	}, '?').slice(0, -1)
);

export default class GithubActionCreator {
	static updateSearch(payload){
		return {
			type: t.UPDATE_SEARCH_QUERY,
			payload
		};
	}

	static updateListOfRepos(payload){
		return {
			type: t.UPDATE_LIST_OF_REPOS,
			payload
		};
	}

	static loading(payload){
		return {
			type: t.LOADING,
			payload
		};
	}

	static error(payload) {
		return {
			type: t.ERROR,
			payload
		};
	}

	static updateDialogInfo(payload) {
		return {
			type: t.DIALOG_INFO,
			payload
		};
	}

	static viewConfigChanged(payload) {
		history.pushState(null, null, convertConfigToUrlParams(payload));
		return {
			type: t.VIEW_CONFIG_REPLACE,
			payload
		};
	}

	static showMore() {
		return {
			type: t.SHOW_MORE_ITEMS
		};
	}

	static loadRepoDetails(repo) {
		return dispatch => {
			dispatch(this.updateDialogInfo(null));
			dispatch(this.loading(true));
			const url = repo.url;
			Promise.all([
				fetch(url)
					.then(errorHandler(`Can't find repo ${url}`))
					.then(resp => resp.json())
					.then(resp => ({repo: resp}))
					.catch(showError),

				fetch(`${url}/contributors?per_page=3`)
					.then(errorHandler())
					.then(resp => resp.json())
					.then(resp => ({contributors: resp}))
					.catch(showError),

				fetch(`${url}/languages`)
					.then(errorHandler())
					.then(resp => resp.json())
					.then(resp => ({languages: resp}))
					.catch(showError),

				fetch(`${url}/pulls?sort=popularity&per_page=5&direction=desc&q=is:pr%20is:open`)
					.then(errorHandler())
					.then(resp => resp.json())
					.then(resp => ({pulls: resp}))
					.catch(showError)
			]).then(resonses => {
				dispatch(this.updateDialogInfo({
					name: repo.name,
					url: repo.html_url,
					...resonses.reduce((res, curr) => ({ ...res, ...curr}), {})
				}));
				dispatch(this.setDialogVisible(true));
				dispatch(this.loading(false));
			}).catch(e => {
				dispatch(this.loading(false));
				console.error(e);
			});

		};
	}

	static setDialogVisible(payload) {
		return {
			type: t.DIALOG_VISIBLE,
			payload
		};
	}

	static mergeViewConfig(payload) {
		return {
			type: t.VIEW_CONFIG_UPDATE,
			payload
		};
	}

	static findRepos(name, disablePushUrl){
		if (!name || name.trim().length === 0){
			updateUrlState(disablePushUrl, name);
			return dispatch => {
				dispatch(this.updateListOfRepos(null));
				dispatch(this.error('Please enter valid, not empty value'));
			};
		}
		return dispatch => {
			dispatch(this.loading(true));
			dispatch(this.error(null));
			fetch(`https://api.github.com/users/${name}`)
				.then(errorHandler(`Can't find user ${name}`))
				.then(resp => resp.json())
				.then(resp => {
					const isUser = resp.type === 'User';
					const baseUrl = `https://api.github.com/${isUser ? 'users' : 'orgs'}/${name}/repos?per_page=100&page=`;
					const length = Math.ceil(resp.public_repos / 100);
					return Promise.all(
						new Array(length)
							.fill(0)
							.map((val, i) => (fetch(`${baseUrl}${i+1}`,
								{ headers: {'Accept': 'application/vnd.github.mercy-preview+json'} })
								.then(resp => resp.json())))
					);
				})
				.then(resp => {
					const all = resp.reduce((res, curr) => [...res, ...curr], []);
					dispatch(this.updateListOfRepos(all));
					updateUrlState(disablePushUrl, name);
					dispatch(this.loading(false));
				})
				.catch(e => {
					dispatch(this.loading(false));
					updateUrlState(disablePushUrl, name);
					dispatch(this.error(`Can't find repositories of the user '${name}'. ${e.message}`));
					console.error(e);
				});
		}
	}
}
