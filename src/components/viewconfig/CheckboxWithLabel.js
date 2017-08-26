import { h } from 'preact';

const CheckboxWithLabel = props => (
	<div className={props.className}>
		<label>
			<input onClick={props.onClick} type="checkbox" name={props.name} checked={props.checked}/>
			{props.label}
		</label>
	</div>
);

export default CheckboxWithLabel;
