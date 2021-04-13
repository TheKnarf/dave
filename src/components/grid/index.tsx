import React from 'react';
import App, { AppProps } from '../app';
import { className } from './style.css';

const Grid : React.FC = ({ children }) => {
	return <div className={className}>
	{
		children	
	}
	</div>;
}

export default Grid;
