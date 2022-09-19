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
function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
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
    await sleep(1000);
    expect(await getLogEntry(page, -1)).toEqual("event focusChanged false");

    // Focus
    // This triggers two event, one for the focus and one for the cursor position
    await getEditor(page).click();
    await sleep(1000);
    const lastEntries = [
      await getLogEntry(page, -1),
      await getLogEntry(page, -2)
    ];
    expect(lastEntries).toContain("event focusChanged true");
  });
});
