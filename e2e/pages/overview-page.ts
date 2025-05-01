import type { Page, Locator } from "@playwright/test";

export class OverviewPage {
  public readonly wishlists: Locator;
  private readonly activity: Locator;
  private readonly inspiration: Locator;
  private readonly generator: Locator;

  constructor(public readonly page: Page) {
    this.wishlists = this.page.getByTestId("navbarWishlists");
    this.activity = this.page.getByTestId("navbarActivity");
    this.inspiration = this.page.getByTestId("navbarForYou");
    this.generator = this.page.getByTestId("navbarGiftGenerator");
  }

  async goto() {
    await this.page.goto("https://onskeskyen.dk/overview");
  }

  // async visible() {
  //   try {
  //     return await this.wishlists.isVisible();
  //   } catch (e) {
  //     return false;
  //   }
  // }
}
