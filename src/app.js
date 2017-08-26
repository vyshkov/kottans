import { h } from 'preact';

import Provider from 'preact-context-provider';
import reducer from './reducers/index';
import createStore from './store/createStore';

import SearchBar from './containers/searchbar/SearchBar.container';
import ListOfRepos from './containers/repolist/ListOfRepos.container';
import LoadingBar from './containers/loader/LoadingBar.container';
import Modal from './containers/repodialog/RepositoryInfoModal.container';

import GithubActionCreator from './actions/GithubActionCreator';

import './styles/app.css';

const store = createStore(reducer);

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
	};
	updateForwardedUrl();
	updateState();
	window.addEventListener('popstate', updateState, false);
};

enableUrlController(store);
window.store = store;
console.log('!!!!!', store);

export default () => (
	<Provider store={store}>
		<div>
			<SearchBar/>
			<ListOfRepos/>
			<Modal />
			<LoadingBar/>
		</div>
	</Provider>
);
