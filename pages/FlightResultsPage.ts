import { Page, Locator } from '@playwright/test';

export class FlightResultsPage {
  readonly page: Page;
  readonly pageHeading: Locator;
  readonly flightRows: Locator;
  readonly chooseButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeading = page.locator('h3');
    this.flightRows = page.locator('table tbody tr');
    this.chooseButtons = page.getByRole('button', { name: 'Choose This Flight' });
  }

  async chooseFirstFlight() {
    await this.chooseButtons.first().click();
  }

  async getFlightCount(): Promise<number> {
    return await this.flightRows.count();
  }
}
