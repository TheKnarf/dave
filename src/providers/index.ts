import { getContainersWithLabels } from '../docker';
import { getServicesWithLabels } from '../kubernetes';

export interface AppProps {
	id: string;
	icon: string;
	name: string;
	status: string;
	url?: string;
	relativeSubdomain?: string;
}

export type Provider = 'docker' | 'kubernetes' | 'auto';

const detectProvider = (): Provider => {
	// Check for Kubernetes environment (in-cluster)
	if (process.env.KUBERNETES_SERVICE_HOST) {
		return 'kubernetes';
	}

	// Check for Docker socket
	try {
		const fs = require('fs');
		if (fs.existsSync('/var/run/docker.sock')) {
			return 'docker';
		}
	} catch {
		// Ignore errors
	}

	// Default to docker for backwards compatibility
	return 'docker';
};

export const getApps = async (): Promise<AppProps[]> => {
	const configuredProvider = (process.env.DAVE_PROVIDER || 'auto').toLowerCase() as Provider;
	const provider = configuredProvider === 'auto' ? detectProvider() : configuredProvider;

	console.log(`[Dave] Using provider: ${provider}`);

	switch (provider) {
		case 'kubernetes':
			return getServicesWithLabels();
		case 'docker':
		default:
			return getContainersWithLabels();
	}
};
