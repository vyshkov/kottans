import { h, Component } from 'preact';

export function connect(extractStateProps, extractActions) {
	const extractProps = (ownProps, extractStateProps, extractActions, store) => {
		let state = ownProps;
		if (!store ) return ownProps;
		if (extractStateProps) {
			state = { ...state, ...extractStateProps(store.getState())};
		}
		if (extractActions) {
			state = { ...state, ...extractActions(store.dispatch)};
		}
		return state;
	};

	return function(WrappedComponent) {
		return class Connect extends Component {
			componentDidMount() {
				this.store = this.context.store;
				this.unsubscribe = this.store.subscribe(() => this.setState({}));
				this.setState({});
			}
			componentWillUnmount() {
				this.unsubscribe();
				this.store = null;
			}
			render() {
				const wrapperProps = extractProps(this.props, extractStateProps, extractActions, this.store);
				// Wraps the input component in a container, without mutating it. Good!
				return <WrappedComponent {...wrapperProps}/>;
			}
		};
	};
}
