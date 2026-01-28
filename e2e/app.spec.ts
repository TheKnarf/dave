import { test, expect } from '@playwright/test';

test.describe('Dave Dashboard', () => {
	test('should load the homepage', async ({ page }) => {
		await page.goto('/');

		// Check that the page loads with the title
		await expect(page.locator('h1')).toContainText('Dave');
	});

	test('should display the welcome message', async ({ page }) => {
		await page.goto('/');

		// Check for the welcome text
		await expect(page.locator('article')).toContainText('Welcome to your');
		await expect(page.locator('article')).toContainText('dashboard');
	});

	test('should have correct background color from CSS variables', async ({ page }) => {
		await page.goto('/');

		// Check that the body has a background color set
		const body = page.locator('body');
		const bgColor = await body.evaluate((el) =>
			getComputedStyle(el).backgroundColor
		);

		// Should have some background color (not transparent)
		expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
	});

	test('should have the Apps section', async ({ page }) => {
		await page.goto('/');

		// Check for Apps heading
		await expect(page.locator('h2')).toContainText('Apps');
	});

	test('should open command palette with Cmd+K', async ({ page }) => {
		await page.goto('/');

		// Press Cmd+K (or Ctrl+K on non-Mac)
		await page.keyboard.press('Meta+k');

		// The command dialog should be visible
		// cmdk uses role="dialog"
		const dialog = page.locator('[role="dialog"]');
		await expect(dialog).toBeVisible({ timeout: 2000 });
	});
});
