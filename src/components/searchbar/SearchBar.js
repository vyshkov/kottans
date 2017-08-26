import { h, Component } from 'preact';

import './searchbar.css';

export default class SearchBar extends Component {

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
					size="10"
				/>
				<input
					disabled={this.props.loading}
					className="kottans-search-button"
					type="button"
					value="→"
					onClick={this.search}
				/>
			</div>
		);
	}
}
