/**
 *	Fallback icon - finds a fallback icon based on Docker image name
 */
const fallbackIcon = (dockerImage : string|undefined = undefined) => {
	switch(dockerImage) {
		case 'theknarf/hello-world':
			return 'mdi-earth';

		case 'linuxserver/sonarr':
			return 'mdi-television-box';

		case 'linuxserver/transmission':
			return 'mdi-progress-download';

		case 'linuxserver/jackett':
			return 'mdi-tshirt-crew-outline';

		case 'linuxserver/jellyfin':
			return 'mdi-plex';
	};

	return 'mdi-web';
}

export default fallbackIcon;
