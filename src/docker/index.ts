import fallbackIcon from '../fallback-icon';
import { Docker } from 'node-docker-api';

const fetch = (docker : Docker, path : string, callOverride = {}) => {
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
		docker.modem.dial(call, (err : any, data : any) => {
			if (err) return reject(err);
			resolve(data);
		});
	});
};

const processLabels = (labels : { [key: string]: string }) : {
	name?: string;
	url?: string;
	relativeSubdomain?: string;
	icon?: string;
} => {
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
};

interface Container {
	Id: string;
	Image: string;
	Labels: { [key: string]: string};
	Names: string[];
	Status: string;
};

export interface AppProps {
	id: string;
	icon: string;
	name: string;
	status: string;
	url?: string;
	relativeSubdomain?: string;
};

const processContainer = (containers : Container[]) : AppProps[] => {
	return containers
		.map( ({ Id, Image, Labels, Names, Status }) => {
			const labels = processLabels(Labels);

			return {
				id: Id,
				name: labels.name || Names[0].substring(1),
				icon: labels.icon || fallbackIcon(Image),
				status: Status,
				url: labels.url || '',
				relativeSubdomain: labels.relativeSubdomain || '',
			};
		})
		.filter(({ url, relativeSubdomain }) => url !== '' || relativeSubdomain !== '')
		.sort((first, second) => first.name.localeCompare(second.name));
};

export const getContainersWithLabels = async () => {
	const docker = new Docker({ socketPath: '/var/run/docker.sock' });
	const containers = await fetch(docker, '/containers/json') as Container[];

	return processContainer(containers);
};
