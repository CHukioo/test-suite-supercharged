import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly fromCitySelect: Locator;
  readonly toCitySelect: Locator;
  readonly findFlightsButton: Locator;
  readonly pageTitle: Locator;
  readonly registerLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fromCitySelect = page.locator('select[name="fromPort"]');
    this.toCitySelect = page.locator('select[name="toPort"]');
    this.findFlightsButton = page.locator('input[type="submit"]');
    this.pageTitle = page.locator('h1');
    this.registerLink = page.getByRole('link', { name: 'register' });
  }

  async navigate() {
    await this.page.goto('/');
  }

  async selectFromCity(city: string) {
    await this.fromCitySelect.selectOption({ label: city });
  }

  async selectToCity(city: string) {
    await this.toCitySelect.selectOption({ label: city });
  }

  async searchFlights(fromCity: string, toCity: string) {
    await this.selectFromCity(fromCity);
    await this.selectToCity(toCity);
    await this.findFlightsButton.click();
  }
}
