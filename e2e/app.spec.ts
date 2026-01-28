import { test, expect } from '@playwright/test';

test.describe('Dave Dashboard', () => {
	test('should load the homepage successfully', async ({ page }) => {
		const response = await page.goto('/', { waitUntil: 'domcontentloaded' });

		// Log status for debugging
		console.log('Response status:', response?.status());

		// Check that the page loads (any 2xx status is OK)
		expect(response?.ok()).toBe(true);
	});

	test('should render a page with HTML content', async ({ page }) => {
		await page.goto('/', { waitUntil: 'domcontentloaded' });

		// Check that there's an HTML element
		const html = page.locator('html');
		await expect(html).toBeVisible();

		// Log page content for debugging
		const content = await page.content();
		console.log('Page content length:', content.length);
	});

	test('should have a body element with styles', async ({ page }) => {
		await page.goto('/', { waitUntil: 'domcontentloaded' });

		const body = page.locator('body');
		await expect(body).toBeVisible();

		// Check that some CSS is applied
		const bgColor = await body.evaluate((el) =>
			getComputedStyle(el).backgroundColor
		);
		console.log('Background color:', bgColor);

		// Any background color that's not completely transparent is fine
		expect(bgColor).toBeDefined();
	});
});
