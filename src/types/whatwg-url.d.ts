declare module 'whatwg-url' {
	export class URL {
		constructor(url: string, base?: string);
		href: string;
		protocol: string;
		host: string;
		hostname: string;
		port: string;
		pathname: string;
		search: string;
		hash: string;
	}
}
