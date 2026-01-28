import React from 'react';
import styles from './style.module.css';

interface Props {
	/* setting the min width for columns */
	minWidth?: string;
	children?: React.ReactNode;
}

const Grid: React.FC<Props> = ({ children, minWidth = '330px' }) => {
	const customStyle = {
		'--grid-min-width': minWidth,
	} as React.CSSProperties;

	return (
		<div className={styles.grid} style={customStyle}>
			{children}
		</div>
	);
};

export default Grid;
