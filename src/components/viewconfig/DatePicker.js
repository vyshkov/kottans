import { h } from 'preact';

const pad = num => {
	const s = "0" + num;
	return s.substr(s.length-2);
};

const extractDate = date => `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`;

const DatePicker = props => (
	<div className={props.className}>
		{props.label}
		<input type="date" onChange={props.onChange} value={props.value ? extractDate(props.value) : null}/>
	</div>
);

export default DatePicker;
