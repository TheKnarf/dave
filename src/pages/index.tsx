import React from 'react';
import { GetServerSideProps } from 'next'
import MDX from '@mdx-js/runtime';
import fallbackIcon from '../fallback-icon';
import { AppProps } from '../components/app';
import Apps from '../components/apps';
import '../styles';
import 'inter-ui/Inter (web)/inter.css';

interface Props {
	bgcolor: string;
	textcolor: string;
	accentcolor: string;
	mdx: string;
	appData: AppProps[];
};

const Home : React.FC<Props> = ({ bgcolor, textcolor, accentcolor, mdx, appData }) => {
	const style = `:root {
		--bg-color: ${bgcolor};
		--text-color: ${textcolor};
		--accent-color: ${accentcolor};
	}`;

	return <>
		<style>{style}</style>
		<article>
			<MDX components={{ Apps }} scope={{ appData }}>{mdx}</MDX>
		</article>
	</>
};

export default Home;

export const getServerSideProps : GetServerSideProps = async (context) => {
	const {Docker} = require('node-docker-api');
	const docker = new Docker({ socketPath: '/var/run/docker.sock' });

	const fetch = (path, callOverride = {}) => {
		const call = {
			path,
			method: 'GET',
			statusCodes: {
				200: true,
				204: true,
				500: 'server error'
			},
			...callOverride
		};

		return new Promise((resolve, reject) => {
			docker.modem.dial(call, (err, data) => {
				if (err) return reject(err);
				resolve(data);
			});
		});
	}

	const processLabels = (labels : { [key: string]: string }) => {
		return Object
			.keys(labels)
			.filter(key => key.toLowerCase().startsWith('dave.'))
			.map(key => ({
				key: key.substring(5), // Removes 'dave.'
				value: labels[key],
			}))
			.reduce(
				(acc, {key, value }) => ({
					...acc,
					[key]: value,
				}),
				{}
			);
	}

	const appData = (
		await fetch('/containers/json') as any
	)
	.map( ({ Id, Image, Labels, Names, Status }) => {
		const labels = processLabels(Labels) as any;

		return {
			id: Id,
			name: labels.name || Names[0].substring(1),
			url: labels.url || '',
			relativeSubdomain: labels.relativeSubdomain || '',
			icon: labels.icon || fallbackIcon(Image),
			status: Status,
		};
	})
	.filter(({ url, relativeSubdomain }) => url !== '' || relativeSubdomain !== '')
	.sort((first, second) => first.name.localeCompare(second.name));

	const defaultMdx = `
# Dave

_Welcome to your \`dave\` dashboard. You'll find relevant apps underneath._

## Apps

<Apps data={appData} />
`;

	return {
		props: {
			bgcolor: process.env.bgcolor || "#EDEEC0",
			textcolor: process.env.textcolor || "#433E0E",
			accentcolor: process.env.accentcolor || "#553555",
			mdx: process.env.mdx || defaultMdx,
			appData,
		}
	}
}
