import { style } from '@vanilla-extract/css';

export const className = style({
	display: 'grid;',
	gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
	rowGap: '1.5em',
	columnGap: '1.2em',
});
