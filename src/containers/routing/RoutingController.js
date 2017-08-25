import { h, Component } from 'preact';
import { connect } from '../../connect';
import GithubActionCreator from '../../actions/GithubActionCreator';

class RoutingController extends Component {

	componentDidMount(){
		console.log(window.location);
		const pathname = window.location.pathname;
		if (pathname !== '/'){
			console.log('!!!', this.props)
			//this.props.updateSearch(pathname.slice(1));
		}
	}

	render() {
		console.log('!!!>', this.props)
		return null;
	}
}

export default connect(
	state => ({
		name: state.search
	}),
	dispatch => ({
		updateSearch: name => dispatch(GithubActionCreator.updateSearch(name)),
		search: name => dispatch(GithubActionCreator.findRepos(name))
	}))(RoutingController);

