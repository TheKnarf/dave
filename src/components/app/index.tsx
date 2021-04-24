import React, { useState, useEffect } from 'react';
import { className, appIconWrapper, appIcon, appStatus, appUrl, appA } from './style.css';
import { Icon } from '@iconify/react-with-api';

export interface AppProps {
	id: string;
	icon: string;
	name: string;
	status: string;
	href: string;
}

const App : React.FC<AppProps> = ({ id, icon, name, status, href }) => {
	return <div className={className}>
		<a href={href} className={appA}>
			<div className={appIconWrapper}>
				<Icon icon={icon} className={appIcon} />
			</div>
			<div>
				<div>{name}</div>
				<div className={appStatus}>{status}</div>
				<div className={appUrl}>{href}</div>
			</div>
		</a>
	</div>;
}

export default App;
