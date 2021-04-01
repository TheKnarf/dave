/**
 *	Fallback icon - finds a fallback icon based on Docker image name
 */
const fallbackIcon = (dockerImage) => {
	switch(dockerImage) {
		case 'theknarf/hello-world':
			return 'earth';
	};

	return 'web';
}

export default fallbackIcon;
