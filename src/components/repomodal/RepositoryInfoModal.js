import { h } from 'preact';
import './modal.css';

const Contributors = props => {
	if (!props.contributors || props.contributors.length === 0) return (
		<div className="contributors">No active contributors...</div>
	);
	return (
		<div className="contributors">
			<div className="contributors-header">Most active contributors (total contributions):</div>
			<table >
				{props.contributors.map(contributor => (
					<tr>
						<td><img src={contributor.avatar_url} className="avatar"/></td>
						<td><a href={contributor.html_url}>{contributor.login}</a></td>
						<td>{contributor.contributions}</td>
					</tr>
				))}
			</table>
		</div>
	);
};

const Languages = props => {
	if (!props.languages || props.languages.length === 0) return (
		<div className="contributors">No any programming languages recognized...</div>
	);

	return (
		<div className="languages-list">

		</div>
	)
}

const Modal = props => (
	<div className={`github-repo-modal ${props.visible ? 'visible' : ''}`}>
		{ props.data && <div className="github-repo-modal-content">
			<div className="close-button" onClick={props.close} />
			<div className="header"><a href={props.data.url}>{props.data.name}</a></div>
			<Contributors contributors={props.data.contributors} />
		</div> }
	</div>
);

export default Modal;
