import { test as base, chromium } from '@playwright/test';
import fs from 'fs';
import 'dotenv/config';

export const test = base.extend<{}>({
  context: async ({ browser }, use, testInfo) => {
    const STORAGE_STATE_PATH = `storageState.worker${testInfo.workerIndex}.json`;

    // If state file doesn't exist, login and save it
    if (!fs.existsSync(STORAGE_STATE_PATH)) {
      const page = await browser.newPage();

      // handle accept cookies popup
      await page.goto('/');
      await page.getByRole('button', { name: 'Accepter alle' }).click();

      // login with email creds
      const loginButton = page.locator('div[data-testid="navBar"] button', {
        hasText: 'Log ind',
      });
      const loginWithEmail = page.locator('button[data-cy="registerNameNextButton"]');
      const emailInput = page.locator('input[data-cy="signupEmailInput"]');
      const passwordInput = page.locator('input[name="password"]');

      await loginButton.click();
      await loginWithEmail.click();
      await emailInput.fill(process.env.LOGIN || '');
      await passwordInput.fill(process.env.PASS || '');
      await passwordInput.press('Enter');
      await page.waitForFunction(() => {
        return localStorage.getItem('token') !== null;
      });

      // Save storage state
      const context = await page.context();
      await context.storageState({ path: STORAGE_STATE_PATH });
      await page.close();
    }

    // Use stored auth state
    const context = await browser.newContext({ storageState: STORAGE_STATE_PATH });
    await use(context);
    await context.close();
  },

  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
    await page.close();
  },
});

export { expect } from '@playwright/test';
