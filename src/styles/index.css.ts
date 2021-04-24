import { createGlobalTheme, globalStyle } from '@vanilla-extract/css';

export const themeVars = createGlobalTheme(':root', {
	color: {
		background: "#EDEEC0",
		text: "#433E0E",
		accent: "#553555",
	},
});

globalStyle('html', {
	margin: 0,
	padding: 0,
});

globalStyle('body', {
	backgroundColor: themeVars.color.background,
	color: themeVars.color.text,
	fontFamily: 'serif',
	fontSize: 'max(2vh, 16px)',
	margin: 0,
	padding: 0,
});

globalStyle('article', {
	marginLeft: '15vw',
	marginRight: '20vw',
	marginTop: 'min(15vh, 15vw)',
});

globalStyle('article h1, article h2, article h3, article h4, article h5, article h6', {
	fontFamily: '"Inter", sans-serif',
	fontWeight: 400,
});

globalStyle('article h1', {
	fontSize: '1.9em',
});

globalStyle('article h2', {
	fontSize: '1.4em',
});
