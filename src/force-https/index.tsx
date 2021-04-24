import React, { useEffect } from 'react';

export enum ForceHttpsStatus {
	// Force dave dashboard and all links over to https
	All,
	// Only force the dave dashboard of to https
	Dave,
	// Don't force anythign over to https
	False,
}

/**
 * Parses a string representing one of the possible values for the ForceHttpsStatus-codes.
 */
export const checkStatus = (status : string | boolean) : ForceHttpsStatus => {
	switch(('' + status).toLowerCase()) {
		case 'all':
		case 'everything':
			return ForceHttpsStatus.All;

		case 'true':
		case 'dashboard':
		case 'dave':
			return ForceHttpsStatus.Dave;

		default:
			return ForceHttpsStatus.False;
	}
}

export const replaceUrlWithHttps = (url : string) : string => {
	const match = url.match(/^(http\:|https\:)?(\/\/)?(?<url>.*)$/);
	if(match && match.groups) {
		return `https://${match.groups.url}`;
	}

	return url;
}

/*
 * Redirects browser to https if it's not https and the status indicates it should be
 */
const usePossiblyRedirect = ( status : string | boolean) => {
	const httpsStatus : ForceHttpsStatus = checkStatus(status);

	useEffect(() => {
		if(
			(typeof window !== 'undefined') &&
			(
				httpsStatus === ForceHttpsStatus.All ||
				httpsStatus === ForceHttpsStatus.Dave
			) &&
			window.location.protocol.toLowerCase() !== 'https:'
		) {
			window.location.replace(`https:${location.href.substring(location.protocol.length)}`);
		}
	}, [httpsStatus]);

	return httpsStatus;
}

export default usePossiblyRedirect;
