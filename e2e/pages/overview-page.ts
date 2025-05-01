import type { Page, Locator } from "@playwright/test";

export class OverviewPage {
  public readonly wishlists: Locator;
  public readonly activity: Locator;
  public readonly inspiration: Locator;
  public readonly generator: Locator;

  constructor(public readonly page: Page) {
    this.wishlists = this.page.getByTestId("navbarWishlists");
    this.activity = this.page.getByTestId("navbarActivity");
    this.inspiration = this.page.getByTestId("navbarForYou");
    this.generator = this.page.getByTestId("navbarGiftGenerator");
  }

  async goto() {
    await this.page.goto("https://onskeskyen.dk/overview");
  }
}
