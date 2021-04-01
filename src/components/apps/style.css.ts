import { style } from '@vanilla-extract/css';

export const className = style({
	display: 'grid;',
	gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
	gap: '1em',
});
