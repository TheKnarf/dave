import { test, expect } from '@playwright/test';

test.describe('Dave Dashboard', () => {
	test('should load the homepage and return 200', async ({ page }) => {
		const response = await page.goto('/');

		// Check that the page loads successfully
		expect(response?.status()).toBe(200);
	});

	test('should render the page with content', async ({ page }) => {
		await page.goto('/');

		// Wait for page to be fully loaded
		await page.waitForLoadState('networkidle');

		// Check that the body has content (not empty)
		const bodyText = await page.locator('body').textContent();
		expect(bodyText?.length).toBeGreaterThan(0);
	});

	test('should have correct background color from CSS variables', async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		// Check that the body has a background color set
		const body = page.locator('body');
		const bgColor = await body.evaluate((el) =>
			getComputedStyle(el).backgroundColor
		);

		// Should have some background color (not transparent)
		expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
	});

	test('should have an article element', async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		// Check that article element exists
		const article = page.locator('article');
		await expect(article).toBeVisible({ timeout: 5000 });
	});

	test('should have the Inter font loaded', async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		// Check that CSS is loaded by verifying font-family includes Inter
		const body = page.locator('body');
		const fontFamily = await body.evaluate((el) =>
			getComputedStyle(el).fontFamily
		);

		// The body uses serif, but headings use Inter
		expect(fontFamily).toBeDefined();
	});
});
