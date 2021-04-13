import { style } from '@vanilla-extract/css';

export const className = style({
	display: 'flex',
	':hover': {
		textDecoration: 'underline',
	},
});

export const appA = style({
	display: 'flex',
	flexDirection: 'row',
	textDecoration: 'none',
	color: 'inherit',
});

export const appUrl = style({
	color: 'var(--accent-color)',
	fontSize: '0.8em',
	fontStyle: 'italic',
});

export const appStatus = style({
	fontSize: '0.8em',
	fontStyle: 'italic',
});

export const appIconWrapper = style({
	height: '3em',
	width: '3em',
	marginRight: '1em',
});

export const appIcon = style({
	height: '100%',
	width: '100%',
});
