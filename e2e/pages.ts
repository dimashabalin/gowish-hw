import { test as base } from "@playwright/test";
import { LoginPage } from "./pages/login-page";
import { OverviewPage } from "./pages/overview-page";
import { LandingPage } from "./pages/landing-page";

// Declare the types of your fixtures.
type MyFixtures = {
  loginPage: LoginPage;
  overviewPage: OverviewPage;
  landingPage: LandingPage;
};

// Extend base test by providing "loginPage" and "overviewPage", "landingPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    // Set up the fixture.
    const loginPage = new LoginPage(page);

    // Use the fixture value in the test.
    await use(loginPage);
  },

  overviewPage: async ({ page }, use) => {
    const overviewPage = new OverviewPage(page);

    // Use the fixture value in the test.
    await use(overviewPage);
  },

  landingPage: async ({ page }, use) => {
    // Set up the fixture.
    const landingPage = new LandingPage(page);

    // Use the fixture value in the test.
    await use(landingPage);
  },
});
export { expect } from "@playwright/test";
