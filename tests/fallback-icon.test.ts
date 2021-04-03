import fallbackIcon from '../src/fallback-icon';

describe('fallback-icon', () => {

	it('Should return a deafult image for both an empty value and for something it doesn\'t know about', () => {
		expect(fallbackIcon())
			.toBe(fallbackIcon('random-name-it-doesn\'t-know-about12312312'));
	});

	it('Should have a default for \'theknarf/hello-world\' that is diffrent from the default icon', () => {
		expect(fallbackIcon('theknarf/hello-world'))
			.not.toBe(fallbackIcon());
	});

});
