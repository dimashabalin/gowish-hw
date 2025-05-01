import type { Page, Locator } from "@playwright/test";
import dotenv from "dotenv";

export class LoginPage {
  private readonly loginWithEmail: Locator;
  private readonly emailBox: Locator;
  private readonly passwordBox: Locator;
  private readonly loginWithFb: Locator;
  private readonly loginWithGoogle: Locator;
  private readonly loginWithApple: Locator;

  constructor(public readonly page: Page) {
    this.loginWithEmail = this.page.locator(
      'button[data-cy="registerNameNextButton"]',
    );
    this.emailBox = this.page.locator("input[data-cy='signupEmailInput']");
    this.passwordBox = this.page.locator("input[name='password']");
    this.loginWithFb = this.page
      .locator('[class^="LoginInitialView__LoginOptionContainer"]')
      .nth(0);
    this.loginWithGoogle = this.page
      .locator('[class^="LoginInitialView__LoginOptionContainer"]')
      .nth(1);
    this.loginWithApple = this.page
      .locator('[class^="LoginInitialView__LoginOptionContainer"]')
      .nth(2);
  }

  async loginWith() {
    dotenv.config();
    const username = process.env.LOGIN || "";
    const password = process.env.PASS || "";

    await this.loginWithEmail.click();
    await this.emailBox.fill(username);
    await this.passwordBox.fill(password);
    await this.passwordBox.press("Enter");
  }
}
