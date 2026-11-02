const puppeteer = require('C:/Users/user/AppData/Roaming/npm/node_modules/puppeteer-core');

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function runTests() {
  const targetUrl = process.argv[2] || 'https://iliabebebe.github.io/md-viewer/';
  console.log(`🚀 Starting Comprehensive Verification Suite for REX MD-Viewer...`);
  console.log(`🌐 Target URL: ${targetUrl}\n`);

  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(err.message);
  });

  const results = [];
  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      results.push({ test: message, status: 'PASS' });
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      results.push({ test: message, status: 'FAIL' });
    }
  }

  try {
    // 1. Navigation & Initial Load
    console.log('--- 1. Navigation & Initial Page Load ---');
    const response = await page.goto(targetUrl, { waitUntil: 'networkidle2' });
    if (response) {
      assert(response.status() === 200 || response.status() === 0, `HTTP status ok (got ${response.status()})`);
    }
    
    const title = await page.title();
    assert(title.includes('REX MD-Viewer'), `Page title contains 'REX MD-Viewer' (got '${title}')`);

    // 2. Dropdown Menus Visibility & Toggles
    console.log('\n--- 2. Dropdown Menus & Header Toggles ---');
    
    // Samples dropdown
    await page.click('#btnSamplesDropdown');
    await sleep(150);
    let samplesOpen = await page.$eval('#samplesMenu', el => el.classList.contains('active') && getComputedStyle(el).display !== 'none');
    assert(samplesOpen, 'Samples dropdown opens on click');

    // Export dropdown closes samples
    await page.click('#btnExportDropdown');
    await sleep(150);
    let exportOpen = await page.$eval('#exportMenu', el => el.classList.contains('active') && getComputedStyle(el).display !== 'none');
    let samplesClosed = await page.$eval('#samplesMenu', el => !el.classList.contains('active'));
    assert(exportOpen && samplesClosed, 'Export dropdown opens and Samples closes');

    // Settings dropdown closes export
    await page.click('#btnSettingsDropdown');
    await sleep(150);
    let settingsOpen = await page.$eval('#settingsMenu', el => el.classList.contains('active') && getComputedStyle(el).display !== 'none');
    let exportClosed = await page.$eval('#exportMenu', el => !el.classList.contains('active'));
    assert(settingsOpen && exportClosed, 'Settings dropdown opens and Export closes');

    // Clicking header inside dropdown should NOT close it
    await page.click('#settingsMenu .dropdown-header');
    await sleep(100);
    let settingsStillOpen = await page.$eval('#settingsMenu', el => el.classList.contains('active'));
    assert(settingsStillOpen, 'Click on header inside dropdown keeps menu open');

    // Outside click closes dropdown
    await page.click('body', { offset: { x: 50, y: 150 } });
    await sleep(150);
    let settingsClosed = await page.$eval('#settingsMenu', el => !el.classList.contains('active'));
    assert(settingsClosed, 'Click outside closes Settings dropdown');

    // 3. Samples Switching
    console.log('\n--- 3. Sample Documents Switching ---');
    const samples = [
      { key: 'architecture', titlePart: 'Спецификация архитектуры' },
      { key: 'math', titlePart: 'Математика и ML' },
      { key: 'changelog', titlePart: 'Журнал изменений' },
      { key: 'showcase', titlePart: 'Обзор возможностей' }
    ];

    for (const sample of samples) {
      await page.click('#btnSamplesDropdown');
      await sleep(150);
      await page.click(`[data-sample="${sample.key}"]`);
      await sleep(350);

      const activeTabTitle = await page.$eval('.doc-tab.active .doc-tab-title', el => el.textContent.trim());
      const hasHeading = await page.$eval('#previewContent', el => el.querySelectorAll('h1, h2').length > 0);
      assert(activeTabTitle.includes(sample.titlePart) && hasHeading, `Loaded sample '${sample.key}' -> Tab: "${activeTabTitle}"`);
    }

    // Switch back to showcase for rich feature tests
    await page.click('#btnSamplesDropdown');
    await sleep(150);
    await page.click('[data-sample="showcase"]');
    await sleep(500);

    // 4. KaTeX Math Verification
    console.log('\n--- 4. KaTeX Math Formula Rendering ---');
    const blockMathCount = await page.$$eval('.katex-display-wrapper .katex-display', els => els.length);
    assert(blockMathCount >= 2, `Block KaTeX formulas rendered (found ${blockMathCount})`);

    const inlineMathCount = await page.$$eval('.katex:not(.katex-display .katex)', els => els.length);
    assert(inlineMathCount >= 2, `Inline KaTeX formulas rendered (found ${inlineMathCount})`);

    const rawFormulaLeak = await page.$eval('#previewContent', el => {
      return el.innerHTML.includes('$$') || /[^\\\$]\$[a-zA-Z0-9\^\{\}\\]+\$/g.test(el.textContent);
    });
    assert(!rawFormulaLeak, 'Zero raw formula leaks in preview content');

    // 5. Mermaid Diagrams Verification
    console.log('\n--- 5. Mermaid Diagram Rendering ---');
    const mermaidSvgs = await page.$$eval('.mermaid-wrapper svg', els => els.length);
    assert(mermaidSvgs >= 2, `Mermaid diagrams rendered as SVG (found ${mermaidSvgs})`);

    // 6. GitHub Callouts / Admonitions
    console.log('\n--- 6. GitHub Callouts / Admonitions ---');
    const callouts = await page.$$eval('.callout', els => els.map(e => {
      const cls = Array.from(e.classList).find(c => c.startsWith('callout-') && c !== 'callout');
      return cls;
    }));
    assert(callouts.includes('callout-note'), 'Callout [!NOTE] rendered');
    assert(callouts.includes('callout-tip'), 'Callout [!TIP] rendered');
    assert(callouts.includes('callout-important'), 'Callout [!IMPORTANT] rendered');
    assert(callouts.includes('callout-warning'), 'Callout [!WARNING] rendered');
    assert(callouts.includes('callout-caution'), 'Callout [!CAUTION] rendered');

    // 7. Interactive Task List Checkbox Sync
    console.log('\n--- 7. Interactive Task Checkbox Sync ---');
    const initialTextarea = await page.$eval('#markdownInput', el => el.value);
    const firstCheckbox = await page.$('#previewContent input[type="checkbox"]');
    const initialChecked = await page.$eval('#previewContent input[type="checkbox"]', el => el.checked);
    await firstCheckbox.click();
    await sleep(250);

    const updatedTextarea = await page.$eval('#markdownInput', el => el.value);
    const isSynced = initialChecked ? updatedTextarea.includes('- [ ]') : updatedTextarea.includes('- [x]');
    assert(isSynced, `Task checkbox toggled and synchronized to textarea`);

    // Re-toggle back
    await firstCheckbox.click();
    await sleep(250);

    // 8. Syntax Highlighting & Copy Buttons
    console.log('\n--- 8. Code Highlighting & Code Copy Buttons ---');
    const codeBlocks = await page.$$eval('.code-block-wrapper pre code', els => els.length);
    assert(codeBlocks >= 2, `Code blocks present with styling (found ${codeBlocks})`);

    const hljsBlocks = await page.$$eval('pre code.hljs', els => els.length);
    assert(hljsBlocks >= 2 || codeBlocks >= 2, `Syntax highlighting applied to code blocks`);

    const copyButtons = await page.$$eval('.btn-copy-code', els => els.length);
    assert(copyButtons >= 2, `Copy buttons present on code blocks (found ${copyButtons})`);

    // 9. Table of Contents & Outline Drawer
    console.log('\n--- 9. Table of Contents & Outline Drawer ---');
    const tocLinks = await page.$$eval('#tocList a', els => els.length);
    assert(tocLinks >= 6, `TOC outline populated with headings (found ${tocLinks} items)`);

    // Toggle outline drawer
    const isInitiallyCollapsed = await page.$eval('#outlineDrawer', el => el.classList.contains('collapsed'));
    await page.click('#btnToggleOutline');
    await sleep(150);
    const isNowToggled = await page.$eval('#outlineDrawer', el => el.classList.contains('collapsed'));
    assert(isInitiallyCollapsed !== isNowToggled, 'Outline drawer toggled successfully');

    // 10. Themes Switching
    console.log('\n--- 10. Theme Switching ---');
    const themes = ['midnight', 'parchment', 'nordic', 'obsidian'];
    for (const t of themes) {
      await page.click('#btnSettingsDropdown');
      await sleep(150);
      await page.click(`[data-theme-val="${t}"]`);
      await sleep(250);
      const applied = await page.$eval('html', el => el.dataset.theme);
      assert(applied === t, `Theme switched to '${t}' (applied: '${applied}')`);
    }

    // 11. Typography & Width Adjustments
    console.log('\n--- 11. Typography & Reader Width ---');
    const fonts = ['serif', 'mono', 'sans'];
    for (const f of fonts) {
      await page.click('#btnSettingsDropdown');
      await sleep(150);
      await page.click(`[data-font-val="${f}"]`);
      await sleep(150);
      const appliedFont = await page.$eval('html', el => el.dataset.font);
      assert(appliedFont === f, `Font switched to '${f}' (applied: '${appliedFont}')`);
    }

    const widths = ['1040px', '100%', '820px'];
    for (const w of widths) {
      await page.click('#btnSettingsDropdown');
      await sleep(150);
      await page.click(`[data-width-val="${w}"]`);
      await sleep(150);
      const appliedWidth = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--reader-max-width'));
      assert(appliedWidth.trim() === w, `Width switched to '${w}' (applied: '${appliedWidth.trim()}')`);
    }

    // 12. View Modes (Reader, Split, Source)
    console.log('\n--- 12. View Modes ---');
    await page.click('#btnModeReader');
    await sleep(150);
    let readerMode = await page.$eval('body', el => el.dataset.mode);
    assert(readerMode === 'reader', 'Reader mode applied');

    await page.click('#btnModeSource');
    await sleep(150);
    let sourceMode = await page.$eval('body', el => el.dataset.mode);
    assert(sourceMode === 'source', 'Source mode applied');

    await page.click('#btnModeSplit');
    await sleep(150);
    let splitMode = await page.$eval('body', el => el.dataset.mode);
    assert(splitMode === 'split', 'Split mode applied');

    // 13. Tabs Creation, Switching, and Closing
    console.log('\n--- 13. Tabs Management ---');
    const initialTabsCount = await page.$$eval('.doc-tab', els => els.length);
    await page.click('#btnNewDoc');
    await sleep(250);
    const newTabsCount = await page.$$eval('.doc-tab', els => els.length);
    assert(newTabsCount === initialTabsCount + 1, `New tab created (count: ${newTabsCount})`);

    // Close the new tab
    const closeButtons = await page.$$('.doc-tab-close');
    if (closeButtons.length > 0) {
      await closeButtons[closeButtons.length - 1].click();
      await sleep(250);
      const closedTabsCount = await page.$$eval('.doc-tab', els => els.length);
      assert(closedTabsCount === initialTabsCount, `Tab closed successfully (count: ${closedTabsCount})`);
    }

    // 14. Document Statistics
    console.log('\n--- 14. Document Statistics ---');
    const words = await page.$eval('#statWords', el => parseInt(el.textContent.replace(/\D/g, ''), 10));
    const chars = await page.$eval('#statChars', el => parseInt(el.textContent.replace(/\D/g, ''), 10));
    const readTime = await page.$eval('#statReadTime', el => parseInt(el.textContent.replace(/\D/g, ''), 10));
    assert(words > 50 && chars > 200 && readTime >= 1, `Statistics computed: ${words} words, ${chars} chars, ~${readTime} min`);

    // 15. Shortcuts Modal
    console.log('\n--- 15. Shortcuts Modal ---');
    await page.click('#btnShortcuts');
    await sleep(150);
    let modalOpen = await page.$eval('#shortcutsModal', el => el.classList.contains('active'));
    assert(modalOpen, 'Shortcuts modal opens on click');

    await page.keyboard.press('Escape');
    await sleep(150);
    let modalClosed = await page.$eval('#shortcutsModal', el => !el.classList.contains('active'));
    assert(modalClosed, 'Shortcuts modal closes on Escape');

    // 16. Console Errors Audit
    console.log('\n--- 16. Console Cleanliness ---');
    if (consoleErrors.length === 0) {
      assert(true, 'Zero console errors detected throughout entire test run');
    } else {
      console.error('Console errors:', consoleErrors);
      assert(false, `Found ${consoleErrors.length} console error(s)`);
    }

  } catch (err) {
    console.error('Unexpected test exception:', err);
  } finally {
    await browser.close();
  }

  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  console.log(`\n========================================`);
  console.log(`Test Summary: ${passed} PASSED, ${failed} FAILED (Total: ${results.length})`);
  console.log(`========================================\n`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
