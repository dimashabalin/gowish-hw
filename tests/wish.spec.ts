import { test, expect } from './fixtures/auth';
import { loadYaml } from '../utils/loadYaml';
import { NewWishlistPage } from './pages/newWishlistPage';
import { NewWishPage } from './pages/newWishPage';
// import { graphqlRequest } from '../utils/apiRequest';
import { MyApiClient } from '../utils/myApiClient';

const testData = loadYaml();
test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Create Feature', () => {
  const title = testData.wishListTitle + process.env.GITHUB_RUN_NUMBER;

  test('should be able to create a wishlist via "+" button', async ({ page }) => {
    const wishlistPage = new NewWishlistPage(page);

    await wishlistPage.createWishlist(title);
    await expect(page.locator(`div[data-cy="wishlistTitle-${title}"]`)).toHaveText(title);
  });

  test('should be able to create a wish via url', async ({ page }) => {
    const wishPage = new NewWishPage(page);
    const wishUrl = testData.newWishUrl;

    await wishPage.createWishViaUrl(wishUrl, title);
    await expect(wishPage.popup).toBeVisible();
  });

  test.afterAll(async ({}, testInfo) => {
    const contextFileName = `storageState.worker${testInfo.workerIndex}.json`;
    const apiClient = new MyApiClient(contextFileName);
    await apiClient.deleteWishlistByName(title);
  });
});
