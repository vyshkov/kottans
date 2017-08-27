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
			{Object.keys(props.languages)
				.filter(lang => props.languages[lang] > 1023)
				.map(lang => (<div className="lang">{`${lang} | ${(props.languages[lang] / 1024).toFixed(2)}kb`}</div>))}
		</div>
	);
};

const Pulls  = props => {
	if (!props.pulls || props.pulls.length === 0) return (
		<div className="pulls">No PRs found...</div>
	);
	return (
		<div className="pulls">
			<div className="pulls-header">List of popular PRs:</div>
			<ol>
				{props.pulls.map(pull => (
					<li><a className="pull" href={pull.html_url}>{pull.title}</a></li>
				))}
			</ol>
		</div>
	);
};

const Modal = props => (
	<div className={`github-repo-modal ${props.visible ? 'visible' : ''}`}>
		{ props.data && <div className="github-repo-modal-content">
			<div className="close-button" onClick={props.close} />
			<div className="header">
				<a href={props.data.url}>{props.data.name}</a>
				{ props.data.repo && props.data.repo.parent && (
					<span className="forked-from">forked from: <a href={props.data.repo.parent.html_url}>{props.data.repo.parent.name}</a></span>
				)}
			</div>
			<Contributors contributors={props.data.contributors} />
			<Pulls pulls={props.data.pulls} />
			<Languages languages={props.data.languages} />
		</div> }
	</div>
);

export default Modal;
