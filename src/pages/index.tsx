import React, { useMemo } from 'react';
import { GetServerSideProps } from 'next'
import MDX from '@mdx-js/runtime';
import App, { AppProps as IApp } from '../components/app';
import Grid from '../components/grid';
import useForceHttps, { ForceHttpsStatus, replaceUrlWithHttps } from '../force-https';
import { getContainersWithLabels, AppProps } from '../docker';
import { themeVars } from '../styles/index.css';
import 'inter-ui/Inter (web)/inter.css';
import { createInlineTheme } from '@vanilla-extract/dynamic';

interface Colors {
	background?: string;
	text?: string;
	accent?: string;
};

interface Props {
	colors: Colors;
	mdx: string;
	appData: AppProps[];
	forceHttps: string | boolean;
};

const Style : React.FC<{ colors : Colors }> = ({ colors }) => {
	const style = useMemo(() => {
		if(typeof window !== 'undefined') {
			const match = window.location.hash.match(/^\#([0-9a-f]{3,6})\-([0-9a-f]{3,6})\-([0-9a-f]{3,6})$/i);
			if(match !== null) {
				const color = {
					background: '#' + match[1],
					text: '#' + match[2],
					accent: '#' + match[3],
				};

				return createInlineTheme(themeVars, { color });
			}
		}

		return createInlineTheme(themeVars, { color: colors as any });
	}, [ (typeof window == 'undefined' ? { location: { hash: '' }} : window ).location.hash ])

	return (
		<style>
{`:root {
	${style}
}`}
		</style>
	);
}

const Home : React.FC<Props> = ({ colors,  mdx, appData, forceHttps }) => {
	const httpStatus = useForceHttps(forceHttps);
	let apps : IApp[] = [];

	if(typeof window !== 'undefined') {
		apps = (appData||[]).map(({
			relativeSubdomain,
			url,
			...app
		}) => {
			const href = relativeSubdomain
				? `//${relativeSubdomain}.${window.location.host}/`
				: (url || "");

			if(httpStatus === ForceHttpsStatus.All) {
				return { ...app, href: replaceUrlWithHttps(href) };
			}

			return { ...app, href };
		});
	}

	return <>
		<Style colors={colors} />
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

	const colors : Colors = {};
	if(process.env.bgcolor) colors.background = process.env.bgcolor;
	if(process.env.textcolor) colors.text = process.env.bgcolor;
	if(process.env.accentcolor) colors.accent = process.env.bgcolor;

	return {
		props: {
			colors,
			mdx: process.env.mdx || defaultMdx,
			forceHttps: process.env.forceHttps || false,
			appData,
		} as Props
	}
}
