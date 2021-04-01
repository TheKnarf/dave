/**
 *	Fallback icon - finds a fallback icon based on Docker image name
 */
const fallbackIcon = (dockerImage : string) => {
	switch(dockerImage) {
		case 'theknarf/hello-world':
			return 'mdi-earth';
	};

	return 'mdi-web';
}

export default fallbackIcon;
