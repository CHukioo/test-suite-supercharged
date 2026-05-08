import { Page, Locator, PageScreenshotOptions, expect } from '@playwright/test';

/**
 * Options for visual comparison helpers.
 */
export interface VisualComparisonOptions {
  /** Maximum allowed pixel difference ratio (0–1). Defaults to 0.01 (1%). */
  maxDiffPixelRatio?: number;
  /** Threshold for per-pixel color difference (0–1). Defaults to 0.2. */
  threshold?: number;
  /** Locators for elements that contain dynamic content and should be masked. */
  mask?: Locator[];
  /** Clip the screenshot to a specific area. */
  clip?: PageScreenshotOptions['clip'];
  /** Wait for animations to finish before taking a screenshot. */
  animations?: 'disabled' | 'allow';
}

/**
 * Takes a full-page screenshot and compares it against the stored baseline.
 * On first run, Playwright creates the baseline automatically.
 *
 * @param page - Playwright Page instance
 * @param snapshotName - Unique name for the snapshot file (e.g. 'homepage.png')
 * @param options - Visual comparison options
 */
export async function compareFullPageSnapshot(
  page: Page,
  snapshotName: string,
  options: VisualComparisonOptions = {}
) {
  try {
    await expect(page).toHaveScreenshot(snapshotName, {
      fullPage: true,
      maxDiffPixelRatio: options.maxDiffPixelRatio ?? 0.01,
      threshold: options.threshold ?? 0.2,
      mask: options.mask,
      clip: options.clip,
      animations: options.animations ?? 'disabled',
    });
  } catch {
    throw new Error(
      `Visual regression detected for "${snapshotName}".\n` +
      `  → The page no longer matches the stored baseline.\n` +
      `  → If this change is intentional, update the baseline by running:\n` +
      `     npx playwright test --update-snapshots`
    );
  }
}

/**
 * Takes a screenshot of a specific element and compares it against the stored baseline.
 *
 * @param locator - Playwright Locator for the element to screenshot
 * @param snapshotName - Unique name for the snapshot file (e.g. 'search-form.png')
 * @param options - Visual comparison options
 */
export async function compareElementSnapshot(
  locator: Locator,
  snapshotName: string,
  options: VisualComparisonOptions = {}
) {
  try {
    await expect(locator).toHaveScreenshot(snapshotName, {
      maxDiffPixelRatio: options.maxDiffPixelRatio ?? 0.01,
      threshold: options.threshold ?? 0.2,
      mask: options.mask,
      animations: options.animations ?? 'disabled',
    });
  } catch {
    throw new Error(
      `Visual regression detected for "${snapshotName}".\n` +
      `  → The element no longer matches the stored baseline.\n` +
      `  → If this change is intentional, update the baseline by running:\n` +
      `     npx playwright test --update-snapshots`
    );
  }
}

/**
 * Hides elements that contain dynamic/unpredictable content (e.g. timestamps, ads,
 * live prices) by overlaying them with a solid colour before a screenshot is taken.
 * Call this before compareFullPageSnapshot / compareElementSnapshot.
 *
 * @param page - Playwright Page instance
 * @param selectors - CSS selectors for elements to hide
 */
export async function hideDynamicContent(page: Page, selectors: string[]) {
  await page.evaluate((selectorList: string[]) => {
    selectorList.forEach((selector) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        el.style.visibility = 'hidden';
      });
    });
  }, selectors);
}

/**
 * Waits for all images in the page to finish loading before taking a screenshot,
 * preventing flaky visual diffs caused by partially loaded images.
 *
 * @param page - Playwright Page instance
 */
export async function waitForImagesToLoad(page: Page) {
  await page.evaluate(async () => {
    const images = Array.from(document.querySelectorAll<HTMLImageElement>('img'));
    await Promise.all(
      images
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise<void>((resolve) => {
              img.addEventListener('load', () => resolve());
              img.addEventListener('error', () => resolve());
            })
        )
    );
  });
}
