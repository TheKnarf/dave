import { createTheme, style } from '@vanilla-extract/css';

export const [themeClass, themeVars] = createTheme({
	minWidth: '330px',
});

export const className = style({
	display: 'grid',
	gridTemplateColumns: `repeat(auto-fill, minmax(${themeVars.minWidth}, 1fr))`,
	rowGap: '1.5em',
	columnGap: '1.2em',
});
