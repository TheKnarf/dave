import App from '.';
import { render } from '@testing-library/react'

describe('App-component', () => {
	it('Renders', () => {
		render(
			<App id="test" icon="test" name="test" status="test" href="http://example.com" />
		);
	});
});
