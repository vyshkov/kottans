import { h } from 'preact';
import { connect } from '../../connect';
import Card from '../../components/card';
import GithubActionCreator from '../../actions/GithubActionCreator';
import './ListOfRepos.css';
import SortAndFilter from '../sortandfilter/SortAndFilter.container';

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
			{props.repos && props.repos.map(repo => <Card repo={repo} openDetails={props.openDetails}/>)}
		</div>
	);
};

export default connect(
	state => ({
		repos: state.visibleItems,
		noRepos: !state.repos || state.repos.length === 0,
		error: state.error
	}),
	dispatch => ({
		openDetails: repo => dispatch(GithubActionCreator.loadRepoDetails(repo))
	})
)(ListOfRepos);
