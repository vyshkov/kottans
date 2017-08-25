import { h, Component } from 'preact';
import { connect } from '../../connect';
import GithubActionCreator from '../../actions/GithubActionCreator';

import './searchbar.css';

class SearchBar extends Component {

	search = () => this.props.findRepos(this.props.value);

	handleEnterPress = e => {
		if (e.key === 'Enter'){
			this.search();
		}
	};

	render() {
		return (
			<div className="kottans-search-bar">
				<input
					disabled={this.props.loading}
					className="kottans-text-input"
					type="text"
					onInput={this.props.updateSearch}
					value={this.props.value}
					onKeyPress={this.handleEnterPress}
				/>
				<input
					disabled={this.props.loading}
					className="kottans-search-button"
					type="button"
					value="🡒"
					onClick={this.search}
				/>
			</div>
		);
	}
}
export default connect(
	state => ({
		value: state.search,
		loading: state.loading,
	}),
	dispatch => ({
		updateSearch: e => dispatch(GithubActionCreator.updateSearch(e.target.value)),
		findRepos: name => dispatch(GithubActionCreator.findRepos(name))
	}),
)(SearchBar);
