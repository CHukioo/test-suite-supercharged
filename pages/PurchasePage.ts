import { Page, Locator } from '@playwright/test';

export class PurchasePage {
  readonly page: Page;
  readonly pageHeading: Locator;
  readonly nameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly cardTypeSelect: Locator;
  readonly creditCardNumberInput: Locator;
  readonly creditCardMonthInput: Locator;
  readonly creditCardYearInput: Locator;
  readonly nameOnCardInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly purchaseButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeading = page.locator('h2');
    this.nameInput = page.locator('input[id="inputName"]');
    this.addressInput = page.locator('input[id="address"]');
    this.cityInput = page.locator('input[id="city"]');
    this.stateInput = page.locator('input[id="state"]');
    this.zipCodeInput = page.locator('input[id="zipCode"]');
    this.cardTypeSelect = page.locator('select[id="cardType"]');
    this.creditCardNumberInput = page.locator('input[id="creditCardNumber"]');
    this.creditCardMonthInput = page.locator('input[id="creditCardMonth"]');
    this.creditCardYearInput = page.locator('input[id="creditCardYear"]');
    this.nameOnCardInput = page.locator('input[id="nameOnCard"]');
    this.rememberMeCheckbox = page.locator('input[id="rememberMe"]');
    this.purchaseButton = page.locator('input[type="submit"]');
  }

  async fillPassengerDetails(details: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    cardType?: string;
    creditCardNumber: string;
    creditCardMonth: string;
    creditCardYear: string;
    nameOnCard: string;
  }) {
    await this.nameInput.fill(details.name);
    await this.addressInput.fill(details.address);
    await this.cityInput.fill(details.city);
    await this.stateInput.fill(details.state);
    await this.zipCodeInput.fill(details.zipCode);
    if (details.cardType) {
      await this.cardTypeSelect.selectOption({ label: details.cardType });
    }
    await this.creditCardNumberInput.fill(details.creditCardNumber);
    await this.creditCardMonthInput.fill(details.creditCardMonth);
    await this.creditCardYearInput.fill(details.creditCardYear);
    await this.nameOnCardInput.fill(details.nameOnCard);
  }

  async submitPurchase() {
    await this.purchaseButton.click();
  }
}
