import { h } from 'preact';
import { connect } from '../../connect';
import Card from '../../components/card';
import GithubActionCreator from '../../actions/GithubActionCreator';
import SortAndFilter from '../sortandfilter/SortAndFilter.container';
import './ListOfRepos.css';

const ListOfRepos = props => {
	if (props.error || !props.repos) return (<div className="kottans-welcome">
		{props.error || 'Welcome! Please enter some repository name and click search button.'}
	</div>);
	if (props.noRepos) return (<div className="kottans-welcome">This user/organisation hasn't any repositories</div>);
	return (
		<div className="list-of-repos">
			<SortAndFilter />
			{ props.repos.length === 0  && (
				<div className="kottans-welcome">No items found by you filter query</div>
			)}
			{props.repos && props.repos.slice(0, props.numberOfShowed).map(repo => <Card repo={repo} openDetails={props.openDetails}/>)}
			{ props.numberOfShowed < props.repos.length && <button className="show-more-button" onClick={props.loadMore}>Show more!</button>}
		</div>
	);
};

export default connect(
	state => ({
		numberOfShowed: state.viewConfig.itemsPerPage * state.viewConfig.showPages,
		repos: state.visibleItems,
		noRepos: !state.repos || state.repos.length === 0,
		error: state.error
	}),
	dispatch => ({
		loadMore: () => dispatch(GithubActionCreator.showMore()),
		openDetails: repo => dispatch(GithubActionCreator.loadRepoDetails(repo))
	})
)(ListOfRepos);
