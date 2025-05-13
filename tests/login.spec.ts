import { test, expect } from './fixtures/auth';
import { loadYaml } from '../utils/loadYaml';
import { OverviewPage } from './pages/overviewPage';

const localeStrings = loadYaml('locale_strings.yml');

test('should land on dashboard when logged in', async ({ page }) => {
  const lang = 'dk'; // could be set via ENV
  const overviewPage = new OverviewPage(page);

  await page.goto('/');

  await expect(page).toHaveTitle(localeStrings[lang].overviewPageTitle);
  await expect(overviewPage.wishlistCarusel).toBeVisible();
  await expect(overviewPage.avatarContainer).toHaveScreenshot({ maxDiffPixels: 100 });
});
