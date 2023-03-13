import { test, expect } from "@playwright/test";

async function getLogEntry(page, i) {
  const str = await getLogElement(page).inputValue();
  const arr = str.split("\n");
  if (i >= 0) {
    return arr[i];
  }
  return arr[arr.length + i];
}

const COMMAND_PREFIX = "command ";
const EVENT_PREFIX = "event ";

async function getCommandLogEntries(page, filter) {
  return getLogEntries(
    page,
    (line) =>
      line.startsWith(COMMAND_PREFIX) &&
      filter(line.substring(COMMAND_PREFIX.length))
  );
}
async function getEventLogEntries(page, filter) {
  return getLogEntries(
    page,
    (line) =>
      line.startsWith(EVENT_PREFIX) &&
      filter(line.substring(EVENT_PREFIX.length))
  );
}
async function getLogEntries(page, filter) {
  const str = await getLogElement(page).inputValue();
  const lines = str.split("\n");
  return lines.filter(filter);
}

function getLogElement(page) {
  return page.locator("#log");
}
function getEditor(page) {
  return page.locator(".database-editor");
}

/**
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<string>}
 * */
async function getEditorContents(page) {
  const cm6Locator = page.locator(".cm-content");
  if ((await cm6Locator.count()) > 0) {
    return await cm6Locator.innerText();
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
    const simpleButton = page.locator(".schema >> text=/simple/i");
    const longButton = page.locator(".schema >> text=/long/i");

    // Empty getEditor
    await clearCypherBtn.click();
    expect((await getEditorContents(page)).trim()).toBe("");

    // Click simple schema
    await simpleButton.click();
    await sleep(1000);
    expect(await getLogEntry(page, -1)).toEqual('command setSchema "simple"');

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
      'event autocompleteChanged {"open":true,"from":[0],"options":{"consoleCommand":7}}'
    );

    // Click long schema
    await longButton.click();
    await sleep(1000);
    lastEntries = [
      await getLogEntry(page, -1),
      await getLogEntry(page, -2),
      await getLogEntry(page, -3)
    ];
    expect(lastEntries).toContain('command setSchema "long"');

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
      'event autocompleteChanged {"open":true,"from":[0],"options":{"consoleCommand":8}}'
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

  test("selection and position", async ({ page }) => {
    const longCypherBtn = page.locator(".cypher >> text=/long/i");
    const clearLogsBtn = page.locator(".logs-header >> text=/clear/i");
    await longCypherBtn.click();

    await clearLogsBtn.click();
    const growingSelectionBtn = page.locator(".selection >> text=/growing/i");
    await growingSelectionBtn.click();

    const selectionLogsA = await getCommandLogEntries(page, (line) =>
      line.startsWith("setSelection")
    );
    const selectionEventsA = await getEventLogEntries(page, (line) =>
      line.startsWith("selectionChanged")
    );
    const positionLogsA = await getCommandLogEntries(page, (line) =>
      line.startsWith("setPosition")
    );
    const positionEventsA = await getEventLogEntries(page, (line) =>
      line.startsWith("positionChanged")
    );

    expect(selectionLogsA).toEqual([
      `command setSelection: {"ranges":[{"anchor":1,"head":2},{"anchor":3,"head":5},{"anchor":6,"head":9}],"main":2}`
    ]);
    expect(selectionEventsA).toEqual([
      `event selectionChanged {"ranges":[{"anchor":1,"head":2},{"anchor":3,"head":5},{"anchor":6,"head":9}],"main":2}`
    ]);
    expect(positionLogsA).toEqual([]);
    expect(positionEventsA).toEqual([
      `event positionChanged {"line":1,"column":10,"position":9}`
    ]);

    await clearLogsBtn.click();
    const zigzagSelectionBtn = page.locator(".selection >> text=/zigzag/i");
    await zigzagSelectionBtn.click();

    const selectionLogsB = await getCommandLogEntries(page, (line) =>
      line.startsWith("setSelection")
    );
    const selectionEventsB = await getEventLogEntries(page, (line) =>
      line.startsWith("selectionChanged")
    );
    const positionLogsB = await getCommandLogEntries(page, (line) =>
      line.startsWith("setPosition")
    );
    const positionEventsB = await getEventLogEntries(page, (line) =>
      line.startsWith("positionChanged")
    );

    expect(selectionLogsB).toEqual([
      `command setSelection: {"ranges":[{"anchor":0,"head":2},{"anchor":6,"head":4},{"anchor":8,"head":10},{"anchor":14,"head":12}],"main":1}`
    ]);
    expect(selectionEventsB).toEqual([
      `event selectionChanged {"ranges":[{"anchor":0,"head":2},{"anchor":6,"head":4},{"anchor":8,"head":10},{"anchor":14,"head":12}],"main":1}`
    ]);
    expect(positionLogsB).toEqual([]);
    expect(positionEventsB).toEqual([
      `event positionChanged {"line":1,"column":5,"position":4}`
    ]);

    await clearLogsBtn.click();
    const setPositionStartBtn = page.locator(
      ".position-start-end >> text=/start/i "
    );
    await setPositionStartBtn.click();

    const selectionLogsC = await getCommandLogEntries(page, (line) =>
      line.startsWith("setSelection")
    );
    const selectionEventsC = await getEventLogEntries(page, (line) =>
      line.startsWith("selectionChanged")
    );
    const positionLogsC = await getCommandLogEntries(page, (line) =>
      line.startsWith("setPosition")
    );
    const positionEventsC = await getEventLogEntries(page, (line) =>
      line.startsWith("positionChanged")
    );

    expect(selectionLogsC).toEqual([]);
    expect(selectionEventsC).toEqual([
      `event selectionChanged {"ranges":[{"anchor":0,"head":0}],"main":0}`
    ]);
    expect(positionLogsC).toEqual([`command setPosition 0`]);
    expect(positionEventsC).toEqual([
      `event positionChanged {"line":1,"column":1,"position":0}`
    ]);

    await clearLogsBtn.click();
    await page.fill(".position-position input", "55");
    const setPositionPositionBtn = page.locator(
      ".position-position >> text=/go/i "
    );
    await setPositionPositionBtn.click();

    const selectionLogsD = await getCommandLogEntries(page, (line) =>
      line.startsWith("setSelection")
    );
    const selectionEventsD = await getEventLogEntries(page, (line) =>
      line.startsWith("selectionChanged")
    );
    const positionLogsD = await getCommandLogEntries(page, (line) =>
      line.startsWith("setPosition")
    );
    const positionEventsD = await getEventLogEntries(page, (line) =>
      line.startsWith("positionChanged")
    );

    expect(selectionLogsD).toEqual([]);
    expect(selectionEventsD).toEqual([
      `event selectionChanged {"ranges":[{"anchor":55,"head":55}],"main":0}`
    ]);
    expect(positionLogsD).toEqual([`command setPosition 55`]);
    expect(positionEventsD).toEqual([
      `event positionChanged {"line":2,"column":26,"position":55}`
    ]);
  });

  test.describe.skip("Paste events", () => {
    // These tests pass perfectly locally, but fail on CI
    // See https://github.com/microsoft/playwright/issues/18901
    // so we skip them for now but keep them here for when the issue is fixed
    // Setup
    const isMac = process.platform === "darwin";
    const modifier = isMac ? "Meta" : "Control";

    test("handles pasting <= than 32 lines", async ({ page, browserName }) => {
      if (browserName === "chromium") {
        // This test doesn't work in chromium
        // because of clipboard permissions
        test.skip();
        return;
      }

      const text_10_lines = Array(10).fill("MATCH (n) RETURN n").join("\n");
      const clearCypherBtn = page.locator(".cypher >> text=/clear/i");

      // Empty getEditor
      await clearCypherBtn.click();
      await getEditor(page).click();
      await page.evaluate(
        (text) => navigator.clipboard.writeText(text),
        text_10_lines
      );
      await page.keyboard.press(`${modifier}+KeyV`);

      const text = await getEditorContents(page);

      expect(text.trim()).toEqual(text_10_lines);
    });
    test("handles pasting > than 32 lines", async ({ page, browserName }) => {
      if (browserName === "chromium") {
        // This test doesn't work in chromium
        // because of clipboard permissions
        test.skip();
        return;
      }
      const text_33_lines = Array(33).fill("MATCH (n) RETURN n").join("\n");
      const clearCypherBtn = page.locator(".cypher >> text=/clear/i");

      // Empty getEditor
      await clearCypherBtn.click();
      await getEditor(page).click();
      await page.evaluate(
        async (text) => await navigator.clipboard.writeText(text),
        text_33_lines
      );
      await page.keyboard.press(`${modifier}+KeyV`);

      const text = await getEditorContents(page);

      await expect(text.trim()).toEqual(text_33_lines);
    });
  });
});
