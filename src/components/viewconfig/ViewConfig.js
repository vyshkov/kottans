import { h } from 'preact';

import CheckboxWithLabel from './CheckboxWithLabel';
import LabelWithSelect from './LabelWithSelect';
import DatePicker from './DatePicker';
import LabelWithInput from './LabelWithInput';

import './filters.css';

const getNewConfig = (name, value, config) => {
	const newConfig = { ...config };
	newConfig[name] = value;
	return newConfig;
};

const ViewConfig = ({config, onChange}) => (
	<div className="filters">
		<LabelWithSelect
			label="Sort: "
			selected={config.sort}
			items={config.allSorts}
			onChange={(e) => onChange(getNewConfig('sort', e.target.value, config))}
		/>
		<LabelWithSelect
			label="Sort order: "
			selected={config.order}
			items={config.sortOrders}
			onChange={(e) => onChange(getNewConfig('order', e.target.value, config))}
		/>
		<LabelWithSelect
			label="Language: "
			selected={config.language}
			items={config.allLanguages}
			onChange={(e) => onChange(getNewConfig('language', e.target.value, config))}
		/>
		<LabelWithSelect
			label="Type: "
			selected={config.type}
			items={config.allTypes}
			onChange={(e) => onChange(getNewConfig('type', e.target.value, config))}
		/>
		<DatePicker
			value={config.updated_at}
			label="Modified after: "
			onChange={(e) => onChange(getNewConfig('updated_at', e.target.value ? new Date(e.target.value) : null, config))}
		/>
		<CheckboxWithLabel
			label="Has open issues"
			name="issues"
			checked={config.has_open_issues}
			onClick={() => onChange(getNewConfig('has_open_issues', !config.has_open_issues, config))}
		/>
		<CheckboxWithLabel
			label="Has topics"
			name="topics"
			checked={config.has_topics}
			onClick={() => onChange(getNewConfig('has_topics', !config.has_topics, config))}
		/>
		<LabelWithInput
			label="Starred >= than: "
			value={config.starred_gt}
			onChange={(e) => onChange(getNewConfig('starred_gt', Number(e.target.value), config))}
		/>
	</div>
);

const ConfigSection = props => (
	<div className="github-filters-container">
		<div className="header">View configuration</div>
		{ props.config && <ViewConfig config={props.config} onChange={props.onChange}/> }
	</div>
);

export default ConfigSection;
