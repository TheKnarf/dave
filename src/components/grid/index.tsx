import React from 'react';
import App, { AppProps } from '../app';
import { themeClass, themeVars, className } from './style.css';
import { createInlineTheme } from '@vanilla-extract/dynamic';

interface Props {
	/* setting the min width for columns */
	minWidth?: string;
}

const Grid : React.FC<Props> = ({ children, minWidth='330px' }) => {
	const customTheme = createInlineTheme(themeVars, {
		minWidth,
	});

	return <div className={className} style={customTheme}>
	{
		children	
	}
	</div>;
}

export default Grid;
