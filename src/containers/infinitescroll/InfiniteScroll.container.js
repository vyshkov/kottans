import { h, Component } from 'preact';
import { connect } from '../../connect';

class InfiniteScroll extends Component {

	render(){
		console.log(">>>>>>>>", this.props)
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

export default connect(state => ({
	a: 1
}), null)(InfiniteScroll);
