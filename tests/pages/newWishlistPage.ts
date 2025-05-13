import type { Page, Locator } from '@playwright/test';

export class NewWishlistPage {
  readonly newWishListBtn: Locator;
  readonly titleInput: Locator;
  readonly submitBtn: Locator;

  constructor(public readonly page: Page) {
    this.newWishListBtn = this.page.locator('[class^="CarouselWishlists__PlusContainer"]');
    this.titleInput = this.page.getByTestId('create-wishlist-title-input');
    this.submitBtn = this.page.getByTestId('createWishlistSubmitButton');
  }

  async createWishlist(title: string): Promise<void> {
    await this.newWishListBtn.click();
    await this.titleInput.fill(title);
    await this.submitBtn.click();
  }
}
