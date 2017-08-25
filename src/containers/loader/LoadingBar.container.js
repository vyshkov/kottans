import { h } from 'preact';
import { connect } from '../../connect';
import LoadingBar from '../../components/loadingbar/LoadingBar';

const LoadingBarContainer = props => {
	return (
		props.loading ? <LoadingBar/> : null
	);
};

export default connect(
	state => ({loading: state.loading}),
)(LoadingBarContainer);
