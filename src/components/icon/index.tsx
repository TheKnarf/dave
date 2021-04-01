import React, { useEffect } from 'react';

const Icon : React.FC<{ icon: string; className?: string }> = ({ icon, className }) => {
	useEffect(() => {
		if(process.browser) {
			const Iconify = require('@iconify/iconify');
		}
	}, []);

	return <span className={`iconify ${className}`} data-icon={icon} />;
};

export default Icon;
