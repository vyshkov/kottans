import { h } from 'preact';
import './card.css';
import formatDate from '../../utils/formatDate';

const trimToThouthands = num => (
	num > 999 ? `${(num / 1000).toFixed(1)}k`: num
);

const card = props => (
	<div className="github-repo-card" onClick={() => props.openDetails(props.repo)}>
		<div className="github-repo-header">
			<span>{props.repo.name}</span>
			<span>{formatDate(props.repo.updated_at)}</span>
		</div>
		{ props.repo.description && <div className="repo-description">{props.repo.description}</div> }
		<div className="repo-labels">
			<div className="repo-label-language">{props.repo.language || 'Unavailable'}</div>
			<div>★ {trimToThouthands(props.repo.stargazers_count)}</div>
			{props.repo.fork && <div className="fork-label">fork</div>}
		</div>
	</div>
);

export default card;
