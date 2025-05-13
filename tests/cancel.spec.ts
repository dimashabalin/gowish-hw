import { test, expect } from './fixtures/auth';
import { NewWishlistPage } from './pages/newWishlistPage';
import { NewWishPage } from './pages/newWishPage';
import { ModalPage } from './pages/modalPage';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('should be able to close wishlist creation dialog', async ({ page }) => {
  const wishlistPage = new NewWishlistPage(page);
  const modalPage = new ModalPage(page);

  await wishlistPage.newWishListBtn.click();
  await expect(modalPage.modalDlg).toBeVisible();
  await modalPage.closeBtn.click();
  await expect(modalPage.modalDlg).toBeHidden();
});

test('should be able to close wish creation dialog', async ({ page }) => {
  const wishPage = new NewWishPage(page);
  const modalPage = new ModalPage(page);

  await wishPage.newWishBtn.click();
  await expect(modalPage.modalDlg).toBeVisible();
  // Found stange behavior - custom new wish dialog rendered over generic one.
  // So generic close button doesn't work despite persist in DOM.
  // Also click boxes for few elements in this dialog are strangly scattered acreoss the dialog.
  // In general circumstances I'll consider this is a BUG
  await wishPage.closeBtn.click();
  await expect(modalPage.modalDlg).toBeHidden();
});
