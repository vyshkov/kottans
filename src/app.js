import { h } from 'preact';

import Provider from 'preact-context-provider';
import reducer from './reducers/index';
import createStore from './store/createStore';

import SearchBar from './containers/searchbar/SearchBar.container';
import ListOfRepos from './containers/repolist/ListOfRepos.container';
import LoadingBar from './containers/loader/LoadingBar.container';
import Modal from './containers/repodialog/RepositoryInfoModal.container';

import enableUrlController from './storemiddleware/enableUrlController';

import './styles/app.css';

const store = createStore(reducer);

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
