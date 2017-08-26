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
		const url = location.href;
		const params = url.indexOf('?') === -1 ? '' : url.substring(url.indexOf('?'));
		window.history.pushState(null, null, `/${name}${params}`);
	}
};

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

				fetch(`${url}/contributors`)
					.then(errorHandler())
					.then(resp => resp.json())
					.then(resp => ({contributors: resp.slice(0,3)}))
					.catch(showError),

				fetch(`${url}/languages`)
					.then(errorHandler())
					.then(resp => resp.json())
					.then(resp => ({languages: resp}))
					.catch(showError),

				fetch(`${url}/pulls?sort=popularity&direction=desc&q=is:pr%20is:open`)
					.then(errorHandler())
					.then(resp => resp.json())
					.then(resp => ({pulls: resp.slice(0,5)}))
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
							.map((val, i) => (fetch(`${baseUrl}${i+1}`).then(resp => resp.json())))
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
