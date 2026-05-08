import { Page, Locator } from '@playwright/test';

export class ConfirmationPage {
  readonly page: Page;
  readonly pageHeading: Locator;
  readonly confirmationId: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeading = page.locator('h1');
    this.confirmationId = page.locator('table td').first();
  }

  async getHeadingText(): Promise<string> {
    return (await this.pageHeading.textContent()) ?? '';
  }
}
