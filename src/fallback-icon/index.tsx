/**
 *	Fallback icon - finds a fallback icon based on Docker image name.
 *
 *	Icons come from https://iconify.design/
 */
const fallbackIcon = (dockerImage : string|undefined = "") => {
	if(dockerImage.startsWith('ghcr.io/')) {
		dockerImage = dockerImage.substr('ghcr.io/'.length);
	}

	switch(dockerImage) {
		case 'theknarf/hello-world':
			return 'mdi-earth';

		/*
		 *	Docker images from linuxserver
		 *	based on this list https://fleet.linuxserver.io/, sorted by pulls
		 */
		case 'linuxserver/radarr':
			return 'bi:play-fill';

		case 'linuxserver/sonarr':
			return 'mdi-television-box';

		case 'linuxserver/jackett':
			return 'mdi-tshirt-crew-outline';

		case 'linuxserver/ombi':
			return 'fa:chain';

		case 'linuxserver/tautulli':
			return 'entypo:line-graph';

		case 'linuxserver/nzbget':
			return 'entypo:signal';

		case 'linuxserver/plex':
			return 'mdi:plex';

		case 'linuxserver/sabnzbd':
			return 'fa-solid:signal';

		case 'linuxserver/heimdall':
			return 'whh:viking';

		case 'linuxserver/lidarr':
			return 'tabler:scooter-electric';

		case 'linuxserver/transmission':
			return 'mdi-progress-download';

		case 'linuxserver/jellyfin':
			return 'mdi-plex';
	};

	return 'mdi-web';
}

export default fallbackIcon;
