import React from 'react';
import App, { AppProps } from '../app/index.tsx';
import { className } from './style.css.ts';

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
