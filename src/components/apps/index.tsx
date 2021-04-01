import React from 'react';
import App, { AppProps } from '../app';
import { className } from './style.css';

interface Props {
	data: AppProps[];
}

const Apps : React.FC<Props> = ({ data = [] }) => {
	return <div className={className}>
	{
		data.map(app => (
			<App key={app.id} {...app} />
		))
	}
	</div>;
}

export default Apps;
