import React from 'react';
import styles from './style.module.css';
import { Icon } from '@iconify/react-with-api';

export interface AppProps {
	id: string;
	icon: string;
	name: string;
	status: string;
	href: string;
}

const App: React.FC<AppProps> = ({ id, icon, name, status, href }) => {
	return (
		<div className={styles.container}>
			<a href={href} className={styles.link}>
				<div className={styles.iconWrapper}>
					<Icon icon={icon} className={styles.icon} />
				</div>
				<div>
					<div>{name}</div>
					<div className={styles.status}>{status}</div>
					<div className={styles.url}>{href}</div>
				</div>
			</a>
		</div>
	);
};

export default App;
