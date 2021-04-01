import MDX from '@mdx-js/runtime';
import fallbackIcon from '../fallback-icon';

const App = ({ id, icon, name, relativeSubdomain, status, url }) => {
	const href = relativeSubdomain || url;

	return <div className="app">
		<a href={href}>
			<span className="iconify icon" data-icon={`mdi-${icon}`}></span>
			<div className="info">
				<div className="name">{name}</div>
				<div className="status">{status}</div>
				<div className="url">{url}</div>
			</div>
		</a>
	</div>;
}

const Apps = ({ data = [] }) => {
	const style = `
		.apps {
			display: grid;	
			grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
			gap: 1em;
		}
		
		.app > a {
			display: flex;
			flex-direction: row;
			text-decoration: none;
			color: inherit;
		}

		.app .icon {
			height: 3em;
			width: 3em;
			margin-right: 1em;
		}
		
		.app .status, .app .url {
			font-size: 0.8em;
			font-style: italic;
		}

		.app .url {
			color: var(--accent-color);
		}
		
		.app:hover {
			text-decoration: underline;
		}

`;

	return <>
		<style>{style}</style>
		<div className="apps">
		{
			data.map(({ id, ...app}) => (
				<App key={id} {...app} />
			))
		}
		</div>
	</>;
}

const Home = ({ bgcolor, textcolor, accentcolor, mdx, appData }) => {
	const style = `
		:root {
			--accent-color: ${accentcolor};
		}

		body {
			background-color: ${bgcolor};
			color: ${textcolor};
			font-family: sans-serif;
			font-size: max(2vh, 16px);
		}
		article {
			max-width: 60vw;
			margin-left: auto;
			margin-right: auto;
			margin-top: 15vh;
		}
		article h1, article h2, article h3, article h4, article h5, article h6 {
			text-transform: uppercase;
		}
		article h1 {
			font-size: 1.9em;
		}
		article h2 {
			font-size: 1.4em;
		}
`;

	return <>
		<script src="https://code.iconify.design/1/1.0.0-rc7/iconify.min.js"></script>
		<style>{style}</style>
		<article>
			<MDX components={{ Apps }} scope={{ appData }}>{mdx}</MDX>
		</article>
	</>
};

export default Home;

export async function getServerSideProps(context) {
	const {Docker} = require('node-docker-api');
	const docker = new Docker({ socketPath: '/var/run/docker.sock' });

	const fetch = (path, callOverride) => {
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

	const processLabels = (labels) => {
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
		await fetch('/containers/json')
	)
	.map( ({ Id, Image, Labels, Names, Status }) => {
		const labels = processLabels(Labels);

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
