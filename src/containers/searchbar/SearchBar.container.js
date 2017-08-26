import { connect } from '../../connect';
import GithubActionCreator from '../../actions/GithubActionCreator';
import SearchBar from '../../components/searchbar';

export default connect(
	state => ({
		value: state.search,
		loading: state.loading
	}),
	dispatch => ({
		updateSearch: e => dispatch(GithubActionCreator.updateSearch(e.target.value)),
		findRepos: name => dispatch(GithubActionCreator.findRepos(name))
	}),
)(SearchBar);
