import React, { useState, useEffect } from 'react';
import { className, appIcon, appStatus, appUrl, appA } from './style.css';

export interface AppProps {
	id: string;
	icon: string;
	name: string;
	relativeSubdomain?: string;
	status: string;
	url?: string;
}

const App : React.FC<AppProps> = ({ id, icon, name, relativeSubdomain, status, url }) => {
	const [href, setHref] = useState(url);

	useEffect(() => {
		if(relativeSubdomain && typeof window !== 'undefined') {
			setHref(`//${relativeSubdomain}.${window.location.host}/`);

		}
	}, [relativeSubdomain]);

	useEffect(() => {
		if(process.browser) {
			const Iconify = require('@iconify/iconify');
		}
	}, [href]);

	return <div className={className}>
		<a href={href} className={appA}>
		<span className={`iconify ${appIcon}`} data-icon={`mdi-${icon}`}></span>
		<div>
			<div>{name}</div>
			<div className={appStatus}>{status}</div>
			<div className={appUrl}>{href}</div>
		</div>
		</a>
	</div>;
}

export default App;
