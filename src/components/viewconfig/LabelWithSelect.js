import { h } from 'preact';

const LabelWithSelect = props => (
	<div className={props.className}>
		{props.label}
		<select onChange={props.onChange}>
			{props.items.map(item => (<option selected={props.selected === item}>{item}</option>))}
		</select>
	</div>
);

export default LabelWithSelect;
