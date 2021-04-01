import { globalStyle } from '@vanilla-extract/css';

globalStyle('body', {
	backgroundColor: 'var(--bg-color)',
	color: 'var(--text-color)',
	fontFamily: 'sans-serif',
	fontSize: 'max(2vh, 16px)',
});

globalStyle('article', {
	maxWidth: '60vw',
	marginLeft: 'auto',
	marginRight: 'auto',
	marginTop: '15vh',
});

globalStyle('article h1, article h2, article h3, article h4, article h5, article h6', {
	textTransform: 'uppercase',
});

globalStyle('article h1', {
	fontSize: '1.9em',
});

globalStyle('article h2', {
	fontSize: '1.4em',
});
