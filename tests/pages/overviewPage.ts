import type { Page, Locator } from '@playwright/test';

export class OverviewPage {
  readonly wishlistsBtn: Locator;
  readonly activityBtn: Locator;
  readonly inspirationBtn: Locator;
  readonly generatorBtn: Locator;
  readonly wishlistCarusel: Locator;
  readonly avatarContainer: Locator;

  constructor(public readonly page: Page) {
    this.wishlistsBtn = this.page.getByTestId('navbarWishlists');
    this.activityBtn = this.page.getByTestId('navbarActivity');
    this.inspirationBtn = this.page.getByTestId('navbarForYou');
    this.generatorBtn = this.page.getByTestId('navbarGiftGenerator');
    this.wishlistCarusel = this.page.locator('[class^="CarouselWishlists__Wrapper"]');
    this.avatarContainer = this.page.locator('[class^="UserHeader__AvatarContainer"]');
  }
}
