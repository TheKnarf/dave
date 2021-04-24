import React, { useMemo } from 'react';
import { GetServerSideProps } from 'next'
import MDX from '@mdx-js/runtime';
import App from '../components/app';
import Grid from '../components/grid';
import useForceHttps, { ForceHttpsStatus, replaceUrlWithHttps } from '../force-https';
import { getContainersWithLabels, AppProps } from '../docker';
import { themeVars } from '../styles/index.css';
import 'inter-ui/Inter (web)/inter.css';
import { createInlineTheme } from '@vanilla-extract/dynamic';

interface Props {
	bgcolor: string | false;
	textcolor: string | false;
	accentcolor: string | false;
	mdx: string;
	appData: AppProps[];
	forceHttps: string | boolean;
};

const makeStyle = (bgcolor: string | false, textcolor: string | false, accentcolor: string | false) => {
	const color : any = {};

	if(bgcolor) color.background = bgcolor;
	if(textcolor) color.text = textcolor;
	if(accentcolor) color.accent = accentcolor;

	const customTheme = createInlineTheme(themeVars, { color });

	return `:root { ${customTheme.toString()} }`;
};

const Home : React.FC<Props> = ({ bgcolor, textcolor, accentcolor, mdx, appData, forceHttps }) => {
	const httpStatus = useForceHttps(forceHttps);

	const style = useMemo(() => {
		if(typeof window !== 'undefined') {
			const match = window.location.hash.match(/^\#([0-9a-f]{3,6})\-([0-9a-f]{3,6})\-([0-9a-f]{3,6})$/i);
			if(match !== null) {
				return makeStyle(
					'#' + match[1],
					'#' + match[2],
					'#' + match[3],
				);
			}
		}

		return makeStyle(bgcolor, textcolor, accentcolor);
	}, [ (typeof window == 'undefined' ? { location: { hash: '' }} : window ).location.hash ])

	const apps = useMemo(() => {
		return (appData||[]).map(({
			relativeSubdomain,
			url,
			...app
		}) => {
			const href = (relativeSubdomain && typeof window !== 'undefined')
				? `//${relativeSubdomain}.${window.location.host}/`
				: (url || "");

			if(httpStatus === ForceHttpsStatus.All) {
				return { ...app, href: replaceUrlWithHttps(href) };
			}

			return { ...app, href };
		});
	}, [appData, httpStatus]);

	return <>
		<style>{style}</style>
		<article>
			<MDX components={{ Grid, App }} scope={{ apps }}>{mdx}</MDX>
		</article>
	</>
};

export default Home;

export const getServerSideProps : GetServerSideProps = async (context) => {
	const appData = await getContainersWithLabels();

	const defaultMdx = `
# Dave

_Welcome to your \`dave\` dashboard. You'll find relevant apps underneath._

## Apps

<Grid>
{ apps.map(app => <App key={app.id} {...app} />) }
</Grid>
`;

	return {
		props: {
			bgcolor: process.env.bgcolor || false,
			textcolor: process.env.textcolor || false,
			accentcolor: process.env.accentcolor || false,
			mdx: process.env.mdx || defaultMdx,
			forceHttps: process.env.forceHttps || false,
			appData,
		} as Props
	}
}
