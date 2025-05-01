import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://onskeskyen.dk/da");
  await page.getByRole("button", { name: "Accepter alle" }).click();
});

test("should load the homepage and display the correct content", async ({
  page,
}) => {
  // Check if the page title is correct
  await expect(page).toHaveTitle(
    "Ønskeskyen |  Danmarks mest populære ønske- og huskeliste",
  );

  // Check if a specific element is visible
  const header = page.locator("h1");
  await expect(header).toHaveText("Alle dine ønsker samlet ét sted");

  // Check page screenshot
  await expect(page).toHaveScreenshot();
});

test("should be able to open login form", async ({ page }) => {
  // Simulate a user interaction
  await page
    .locator('div[data-testid="navBar"] button', { hasText: "Log ind" })
    .click();
  await expect(
    page.locator('button[data-cy="registerNameNextButton"]'),
  ).toBeVisible();
});
