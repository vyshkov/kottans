import { h, Component } from 'preact';
import Provider from 'preact-context-provider';
import reducer from './reducers/index';
import createStore from './store/createStore';

import SearchBar from './components/searchbar/index';
import ListOfRepos from './containers/repolist/ListOfRepos.container';
import LoadingBar from './containers/loader/LoadingBar.container';
import Modal from './containers/repodialog/RepositoryInfoModal.container';

import GithubActionCreator from './actions/GithubActionCreator';

import './styles/app.css';

const store = createStore(reducer);

const enableUrlController = store => {
	const updateState = () => {
		let urlRepo = window.location.pathname.slice(1);
		if (urlRepo) {
			store.dispatch(GithubActionCreator.updateSearch(urlRepo));
			store.dispatch(GithubActionCreator.findRepos(urlRepo, true));
		}
	};
	updateState();
	window.addEventListener('popstate', updateState, false);
};

enableUrlController(store);

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
