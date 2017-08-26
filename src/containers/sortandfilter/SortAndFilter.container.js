import { connect } from '../../connect';
import GithubActionCreator from '../../actions/GithubActionCreator';
import ViewConfig from '../../components/viewconfig/ViewConfig';

export default connect(
	state => ({
		config: state.viewConfig
	}),
	dispatch => ({
		onChange: newConfig => dispatch(GithubActionCreator.viewConfigChanged(newConfig))
	}),
)(ViewConfig);
