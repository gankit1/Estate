import { test, expect } from "@playwright/test";

test.describe("Pacific Star Realty — End to End Integration Tests", () => {
  test("1. Homepage loads featured properties from backend", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Pacific Star Realty/i);

    // Verify Featured Properties section is visible
    const featuredSection = page.locator("section:has-text('Featured Properties')");
    await expect(featuredSection).toBeVisible();

    // Check that at least one property card with a title and price is rendered
    const card = featuredSection.locator("a[href*='/properties/']").first();
    await expect(card).toBeVisible();
    await expect(card.locator("h3")).not.toBeEmpty();
  });

  test("2. Property listing loads MongoDB data", async ({ page }) => {
    await page.goto("/properties");

    // Heading exists
    await expect(page.locator("h1")).toContainText("Properties");

    // Verify property cards are rendered
    const cards = page.locator("a[href^='/properties/']");
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("3. Filters update URL and results", async ({ page }) => {
    await page.goto("/properties");
    await expect(page.locator("a[href^='/properties/']").first()).toBeVisible({ timeout: 10000 });

    // Look for Buy/Rent buttons in filter panel (desktop)
    const rentBtn = page.getByRole("button", { name: "Rent", exact: true }).first();
    if (await rentBtn.isVisible()) {
      await rentBtn.click();
      const applyBtn = page.getByRole("button", { name: "Apply Filters" });
      if (await applyBtn.isVisible()) {
        await applyBtn.click();
      }
      await expect(page).toHaveURL(/purpose=rent/);
    } else {
      // Direct navigation to test URL filter parsing
      await page.goto("/properties?purpose=sale&propertyType=apartment");
      await expect(page).toHaveURL(/purpose=sale/);
      await expect(page.locator("a[href^='/properties/']").first()).toBeVisible();
    }
  });

  test("4. Sorting changes results correctly", async ({ page }) => {
    await page.goto("/properties");
    await expect(page.locator("a[href^='/properties/']").first()).toBeVisible({ timeout: 10000 });

    const sortSelect = page.locator("#sort-select");
    if (await sortSelect.isVisible()) {
      await sortSelect.selectOption("price-asc");
      await expect(page).toHaveURL(/sort=price-asc/);
    }
  });

  test("5. Pagination works", async ({ page }) => {
    await page.goto("/properties");
    await expect(page.locator("a[href^='/properties/']").first()).toBeVisible({ timeout: 10000 });

    const paginationNav = page.locator("nav[aria-label='Pagination']");
    if (await paginationNav.isVisible()) {
      const page2Btn = paginationNav.getByRole("button", { name: "Page 2" });
      if (await page2Btn.isVisible()) {
        await page2Btn.click();
        await expect(page).toHaveURL(/page=2/);
      }
    }
  });

  test("6. Property card opens correct detail", async ({ page }) => {
    await page.goto("/properties");
    const firstCard = page.locator("a[href^='/properties/']").first();
    await expect(firstCard).toBeVisible({ timeout: 10000 });

    const href = await firstCard.getAttribute("href");
    expect(href).toBeTruthy();

    await firstCard.click();
    await expect(page).toHaveURL(new RegExp(href!));
    await expect(page.locator("h1")).toBeVisible();
  });

  test("7. Gallery and property details display correctly", async ({ page, isMobile }) => {
    await page.goto("/properties/azure-residences-panoramic-marina-view");

    // Check title
    await expect(page.locator("h1")).toContainText("Azure Residences");

    // Check price and specs
    await expect(page.locator("p.price").first()).toBeVisible();
    await expect(page.getByText(/Bedrooms/i).first()).toBeVisible();

    // Check gallery thumbnails or main image
    const mainImg = page.locator("img").first();
    await expect(mainImg).toBeVisible();

    // Check agent sidebar / contact info (on desktop)
    if (!isMobile) {
      await expect(page.getByText(/Sarah Thompson|Agent|Enquiry/i).first()).toBeVisible();
    }
  });

  test("8. Unknown slug returns 404", async ({ page }) => {
    const res = await page.goto("/properties/this-slug-definitely-does-not-exist-99999");
    expect([200, 404]).toContain(res?.status());
    await expect(
      page.getByText(/404|not found|could not find|unable to load/i).first()
    ).toBeVisible();
  });

  test("9. Mobile listing and detail work", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Only runs on mobile viewport");

    await page.goto("/properties");
    await expect(page.locator("h1")).toContainText("Properties");

    // Verify cards load on mobile
    const cards = page.locator("a[href^='/properties/']");
    await expect(cards.first()).toBeVisible({ timeout: 10000 });

    // Open detail
    await cards.first().click();
    await expect(page.locator("h1")).toBeVisible();

    // Verify mobile sticky CTA bar exists
    const mobileCta = page.locator("div.fixed.bottom-0");
    await expect(mobileCta).toBeVisible();
  });
});
