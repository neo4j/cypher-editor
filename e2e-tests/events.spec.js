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
  return page.locator(".database-editor");
}
async function getEditorContents(page) {
  const cm6Locator = page.locator(".cm-content");
  if ((await cm6Locator.count()) > 0) {
    return await cm6Locator.textContent();
  }
  const cm5Content = await page
    .locator(".CodeMirror-code .CodeMirror-line")
    .allTextContents();
  const cm5String = cm5Content.join("\n");
  // Annoyingly it has a "zero width space" if empty, let's drop them
  return cm5String.replace(/\u200B/g, "");
}
function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

test.describe("Commands and Editor events", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:" + process.env.PORT);
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      // Get a unique place for the screenshot.
      const screenshotPath = testInfo.outputPath(`failure.png`);
      // Add it to the report.
      testInfo.attachments.push({
        name: "screenshot",
        path: screenshotPath,
        contentType: "image/png"
      });
      // Take the screenshot itself.
      await page.screenshot({ path: screenshotPath, timeout: 5000 });
    }
  });

  test("Has title", async ({ page }) => {
    const title = page.locator("text=/Cypher Codemirror/i");
    await expect(title).toBeVisible();
  });

  test("Focus events", async ({ page }) => {
    // Setup
    await getEditor(page).click();
    let lastEntries = [];

    // Blur
    const title = page.locator("text=/Cypher Codemirror/i");
    await title.click();
    await sleep(1000);
    expect(await getLogEntry(page, -1)).toEqual("event focusChanged false");

    // Focus
    // This triggers two event, one for the focus and one for the cursor position
    await getEditor(page).click();
    await sleep(1000);
    lastEntries = [await getLogEntry(page, -1), await getLogEntry(page, -2)];
    expect(lastEntries).toContain("event focusChanged true");
  });
  test("Change schema", async ({ page }) => {
    // Setup
    let lastEntries = [];
    const clearCypherBtn = page.locator(".cypher >> text=/clear/i");
    const simpleButton = page.locator(".autocompleteSchema >> text=/simple/i");
    const longButton = page.locator(".autocompleteSchema >> text=/long/i");

    // Empty getEditor
    await clearCypherBtn.click();
    expect(await getEditorContents(page)).toBe("");

    // Click simple schema
    await simpleButton.click();
    await sleep(1000);
    expect(await getLogEntry(page, -1)).toEqual(
      'command setAutocompleteSchema "simple"'
    );

    // Check log for autocomplete items in consoleCommand
    await getEditor(page).click();
    await getEditor(page).type(":", { delay: 100 });
    await sleep(1000);
    lastEntries = [
      await getLogEntry(page, -1),
      await getLogEntry(page, -2),
      await getLogEntry(page, -3)
    ];
    expect(lastEntries).toContain(
      'event autocompleteChanged {"open":true,"from":0,"options":{"consoleCommand":7}}'
    );

    // Click long schema
    await longButton.click();
    await sleep(1000);
    lastEntries = [
      await getLogEntry(page, -1),
      await getLogEntry(page, -2),
      await getLogEntry(page, -3)
    ];
    expect(lastEntries).toContain('command setAutocompleteSchema "long"');

    // Check log for autocomplete items in consoleCommand
    await getEditor(page).click();
    await getEditor(page).press("Backspace");
    await getEditor(page).type(":", { delay: 100 });
    await sleep(1000);
    lastEntries = [
      await getLogEntry(page, -1),
      await getLogEntry(page, -2),
      await getLogEntry(page, -3)
    ];
    expect(lastEntries).toContain(
      'event autocompleteChanged {"open":true,"from":0,"options":{"consoleCommand":8}}'
    );
  });

  test("External value updates from (button click)", async ({ page }) => {
    // Setup
    const clearCypherBtn = page.locator(".cypher >> text=/clear/i");

    // Clear from outside
    await clearCypherBtn.click();

    const lastEntries = [
      await getLogEntry(page, -1),
      await getLogEntry(page, -2),
      await getLogEntry(page, -3),
      await getLogEntry(page, -4)
    ];

    // Check command side
    expect(lastEntries).toContain('command setValue "0 (clear)"');

    // Check event side
    expect(lastEntries).toContain("event valueChanged 0");
  });
});
