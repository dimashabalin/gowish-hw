import { test, expect } from "./pages";

test.beforeEach(async ({ page }) => {
  await page.goto("https://onskeskyen.dk/da");
  await page.getByRole("button", { name: "Accepter alle" }).click();
});

test("should be able to login", async ({
  landingPage,
  loginPage,
  overviewPage,
}) => {
  await landingPage.openLoginForm();
  await loginPage.loginWith();
  await expect(overviewPage.wishlists).toBeVisible();
});
