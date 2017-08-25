import { connect } from '../../connect';
import Modal from '../../components/repomodal';
import GithubActionCreator from '../../actions/GithubActionCreator';

export default connect(
	state => ({
		visible: state.dialogVisible,
		data: state.dialogInfo
	}),
	dispatch => ({
		close: () => dispatch(GithubActionCreator.setDialogVisible(false))
	}))(Modal);
