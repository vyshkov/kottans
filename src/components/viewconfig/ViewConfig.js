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
		<CheckboxWithLabel
			label="Has open issues"
			name="issues"
			checked={config.hasOpenIssues}
			onClick={() => onChange(getNewConfig('hasOpenIssues', !config.hasOpenIssues, config))}
		/>
		<CheckboxWithLabel
			label="Has topics"
			name="topics"
			checked={config.hasTopics}
			onClick={() => onChange(getNewConfig('hasTopics', !config.hasTopics, config))}
		/>
		<LabelWithSelect
			label="Language: "
			selected={config.selectedLanguage}
			items={config.allLanguages}
			onChange={(e) => onChange(getNewConfig('selectedLanguage', e.target.value, config))}
		/>
		<LabelWithSelect
			label="Type: "
			selected={config.selectedType}
			items={config.allTypes}
			onChange={(e) => onChange(getNewConfig('selectedType', e.target.value, config))}
		/>
		<DatePicker
			value={config.modifiedAfter}
			label="Modified after: "
			onChange={(e) => onChange(getNewConfig('modifiedAfter', e.target.value ? new Date(e.target.value) : null, config))}
		/>
		<LabelWithInput
			label="Starred >= than: "
			value={config.starsGtThan}
			onChange={(e) => onChange(getNewConfig('starsGtThan', Number(e.target.value), config))}
		/>
		<LabelWithSelect
			label="Sort: "
			selected={config.selectedSort}
			items={config.allSorts}
			onChange={(e) => onChange(getNewConfig('selectedSort', e.target.value, config))}
		/>
	</div>
);

const ConfigSection = props => {
	return (<div className="github-filters-container">
		<div className="header">View configuration</div>
		{ props.config && <ViewConfig config={props.config} onChange={props.onChange}/> }
	</div>)
};

export default ConfigSection;
