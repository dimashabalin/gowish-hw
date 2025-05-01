import type { Page, Locator } from "@playwright/test";

export class LandingPage {
  private readonly loginButton: Locator;

  constructor(public readonly page: Page) {
    this.loginButton = this.page.locator('div[data-testid="navBar"] button', {
      hasText: "Log ind",
    });
  }

  async goto() {
    await this.page.goto("https://onskeskyen.dk/da");
  }

  async openLoginForm() {
    await this.loginButton.click();
  }
}
