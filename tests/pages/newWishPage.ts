import type { Page, Locator } from '@playwright/test';

export class NewWishPage {
  readonly newWishBtn: Locator;
  readonly newWishUrlInput: Locator;
  readonly titleInput: Locator;
  readonly wishListFirstItem: Locator;
  readonly submitBtn: Locator;
  readonly popup: Locator;
  readonly closeBtn: Locator;

  constructor(public readonly page: Page) {
    this.newWishBtn = this.page.getByTestId('new-wish-btn');
    this.newWishUrlInput = this.page.locator('[data-cy="new-wish-input-automatic"]');
    this.titleInput = this.page.getByTestId('new-wish-form-title-input');
    this.wishListFirstItem = this.page.getByTestId('select-wishlist-list-item-0');
    this.submitBtn = this.page.getByTestId('new-wish-form-submit-btn');
    this.popup = this.page.locator('div').filter({ hasText: 'Wish created successfully in' }).nth(2);
    this.closeBtn = this.page.locator('button[class^=SearchState__IconButton]');
  }

  async createWishManualy(title: string): Promise<void> {
    await this.newWishBtn.click();
    await this.titleInput.fill(title);
    await this.submitBtn.click();
  }

  async createWishViaUrl(url: string, wishlist: string = 'default'): Promise<void> {
    await this.newWishBtn.click();
    await this.newWishUrlInput.fill(url);

    if (wishlist === 'default') {
      await this.wishListFirstItem.click();
    } else {
      await this.page
        .locator('[data-testid^="select-wishlist-list-item"]', {
          hasText: wishlist,
        })
        .click();
    }
  }
}
