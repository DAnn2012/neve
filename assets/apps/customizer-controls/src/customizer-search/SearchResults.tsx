import React from 'react';
import { Control } from './SearchComponent';
import classnames from 'classnames';

/**
 * Type SearchComponentProps
 */
type SearchResultsProps = {
	matchResults: Control[];
	setMatchResults: (value: Control[]) => void;
	query: string;
	setQuery: (value: string) => void;
};

/**
 * SearchResults Component
 *
 * @param {SearchResultsProps} params
 * @class
 */
const SearchResults: React.FC<SearchResultsProps> = ({
	matchResults,
	setMatchResults,
	query,
	setQuery,
}) => {
	const customizerPanels = document.getElementById(
		'customize-theme-controls'
	);

	/**
	 * Handle redirect to specific section on click.
	 *
	 * @param {string} sectionName
	 * @return {void}
	 */
	const expandSection = (sectionName: string) => {
		if (!sectionName) {
			return;
		}

		const section = wp.customize.section(sectionName);
		setQuery('');
		setMatchResults([]);
		customizerPanels?.classList.remove('search-not-found');
		section.expand();
	};

	/**
	 * Highlight text from search query.
	 *
	 * @param {string} text
	 * @param {string} highlight
	 */
	const getHighlightedText = (text: string, highlight: string) => {
		const matchQuery = highlight.replace(
			/[-[\]{}()*+?.,\\^$|#\s]/g,
			'\\$&'
		);
		const parts = text.split(new RegExp(`(${matchQuery})`, 'gi'));
		return (
			<span>
				{' '}
				{parts.map((part, i) => (
					<span
						key={i}
						className={classnames({
							hl: part.toLowerCase() === highlight.toLowerCase(),
						})}
						style={
							part.toLowerCase() === highlight.toLowerCase()
								? { fontWeight: 'bold' }
								: {}
						}
					>
						{part}
					</span>
				))}{' '}
			</span>
		);
	};

	return (
		<>
			{query !== '' && (
				<ul id="customizer-search-results">
					{matchResults.map((control) => {
						if ('' === control.label) return '';

						let breadcrumbs = control.panelName;
						if (breadcrumbs === null) {
							breadcrumbs = '';
						}

						if ('' !== control.sectionName) {
							breadcrumbs = `${breadcrumbs} ▸ ${control.sectionName}`;
						}

						const label = control.label;

						return (
							// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
							<li
								id={`accordion-section-${control.section}`}
								className="accordion-section control-section control-section-default"
								aria-owns={`sub-accordion-section-${control.section}`}
								key={control.instanceNumber}
								onClick={() => {
									expandSection(control.section);
								}}
							>
								<h3
									className="accordion-section-title"
									tabIndex={0}
								>
									{getHighlightedText(label, query)}
									<span className="screen-reader-text">
										Press return or enter to open this
										section
									</span>
								</h3>
								<span className="search-setting-path">
									{getHighlightedText(breadcrumbs, query)}
								</span>
							</li>
						);
					})}
				</ul>
			)}
		</>
	);
};

export default SearchResults;
