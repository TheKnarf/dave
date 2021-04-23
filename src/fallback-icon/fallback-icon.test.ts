import fallbackIcon from '.';

const containerWithKnownDefault = 'theknarf/hello-world';

describe('fallback-icon', () => {

	it('Should return a deafult image for both an empty value and for something it doesn\'t know about', () => {
		expect(fallbackIcon())
			.toBe(fallbackIcon('random-name-it-doesn\'t-know-about12312312'));
	});

	it('Should have a default for \'theknarf/hello-world\' that is diffrent from the default icon', () => {
		expect(fallbackIcon(containerWithKnownDefault))
			.not.toBe(fallbackIcon());
	});

	it('Should support Dockerhub and Github packages the same', () => {
		const dockerhub = fallbackIcon(containerWithKnownDefault);
		const github = fallbackIcon('ghcr.io/' + containerWithKnownDefault);

		expect(dockerhub).not.toBe(fallbackIcon());
		expect(github).not.toBe(fallbackIcon());
		expect(dockerhub).toBe(github);
	});

});
