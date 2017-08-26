import { h } from 'preact';

const LabelWithInput = props => (
	<div className={props.className}>
		{props.label}
		<input type="number" size="4" onInput={props.onChange} value={props.value} style={{width: '50px'}} />
	</div>
);

export default LabelWithInput;
