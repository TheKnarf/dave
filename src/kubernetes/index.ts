import * as https from 'https';
import * as fs from 'fs';
import fallbackIcon from '../fallback-icon';
import { AppProps } from '../providers';

interface DaveLabels {
	name?: string;
	url?: string;
	relativeSubdomain?: string;
	icon?: string;
}

interface V1Service {
	metadata?: {
		uid?: string;
		name?: string;
		namespace?: string;
		annotations?: { [key: string]: string };
	};
}

interface V1ServiceList {
	items: V1Service[];
}

const processAnnotations = (annotations: { [key: string]: string } | undefined): DaveLabels => {
	if (!annotations) return {};

	return Object
		.keys(annotations)
		.filter(key => key.toLowerCase().startsWith('dave.'))
		.map(key => ({
			key: key.substring(5), // Removes 'dave.'
			value: annotations[key],
		}))
		.reduce(
			(acc: DaveLabels, { key, value }) => ({
				...acc,
				[key]: value,
			}),
			{}
		);
};

const fetchFromKubernetes = async (path: string): Promise<any> => {
	// In-cluster config paths
	const tokenPath = '/var/run/secrets/kubernetes.io/serviceaccount/token';
	const caPath = '/var/run/secrets/kubernetes.io/serviceaccount/ca.crt';
	const namespaceFile = '/var/run/secrets/kubernetes.io/serviceaccount/namespace';

	const host = process.env.KUBERNETES_SERVICE_HOST;
	const port = process.env.KUBERNETES_SERVICE_PORT || '443';

	if (!host) {
		throw new Error('Not running in Kubernetes cluster');
	}

	const token = fs.readFileSync(tokenPath, 'utf8');
	const ca = fs.readFileSync(caPath);

	return new Promise((resolve, reject) => {
		const options = {
			hostname: host,
			port: parseInt(port),
			path,
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Accept': 'application/json',
			},
			ca,
		};

		const req = https.request(options, (res) => {
			let data = '';
			res.on('data', (chunk) => { data += chunk; });
			res.on('end', () => {
				if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
					resolve(JSON.parse(data));
				} else {
					reject(new Error(`Kubernetes API error: ${res.statusCode} - ${data}`));
				}
			});
		});

		req.on('error', reject);
		req.end();
	});
};

export const getServicesWithLabels = async (): Promise<AppProps[]> => {
	const response = await fetchFromKubernetes('/api/v1/services') as V1ServiceList;
	const services = response.items;

	return services
		.map((service: V1Service) => {
			const annotations = processAnnotations(service.metadata?.annotations);
			const name = service.metadata?.name || 'unknown';
			const namespace = service.metadata?.namespace || 'default';

			return {
				id: service.metadata?.uid || `${namespace}-${name}`,
				name: annotations.name || name,
				icon: annotations.icon || fallbackIcon(name),
				status: 'Running',
				url: annotations.url || '',
				relativeSubdomain: annotations.relativeSubdomain || '',
			};
		})
		.filter(({ url, relativeSubdomain }: { url: string; relativeSubdomain: string }) => url !== '' || relativeSubdomain !== '')
		.sort((first: AppProps, second: AppProps) => first.name.localeCompare(second.name));
};
