import { test, expect } from "@playwright/test";

async function getLogEntry(page, i) {
  const str = await getLogElement(page).inputValue();
  const arr = str.split("\n");
  if (i >= 0) {
    return arr[i];
  }
  return arr[arr.length + i];
}
function getLogElement(page) {
  return page.locator("#log");
}
function getEditor(page) {
  return page.locator(".editor");
}

test.describe("Commands and Editor events", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:" + process.env.PORT);
  });

  test("Has title", async ({ page }) => {
    const title = page.locator("text=/Cypher Codemirror/i");
    await expect(title).toBeVisible();
  });

  test("Focus events", async ({ page }) => {
    // Setup
    await getEditor(page).click();

    // Blur
    const title = page.locator("text=/Cypher Codemirror/i");
    await title.click();
    expect(await getLogEntry(page, -1)).toEqual("event focusChanged false");

    // Focus
    // This triggers two event, one for the focus and one for the cursor position
    await getEditor(page).click();
    const lastEntries = [
      await getLogEntry(page, -1),
      await getLogEntry(page, -2)
    ];
    expect(lastEntries).toContain("event focusChanged true");
  });
});
