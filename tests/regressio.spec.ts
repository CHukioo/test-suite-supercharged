import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { FlightResultsPage } from '../pages/FlightResultsPage';
import { PurchasePage } from '../pages/PurchasePage';
import { ConfirmationPage } from '../pages/ConfirmationPage';

test.describe('Purchase Flow Tests', () => {
  let homePage: HomePage;
  let flightResultsPage: FlightResultsPage;
  let purchasePage: PurchasePage;
  let confirmationPage: ConfirmationPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    flightResultsPage = new FlightResultsPage(page);
    purchasePage = new PurchasePage(page);
    confirmationPage = new ConfirmationPage(page);
  });

  test('should navigate to the purchase page after choosing a flight', async ({ page }) => {
    await homePage.navigate();
    await homePage.searchFlights('Boston', 'London');
    await flightResultsPage.chooseFirstFlight();

    await expect(page).toHaveURL(/purchase/);
    await expect(purchasePage.pageHeading).toContainText('Your flight from TLV to SFO');
  });

  test('should display the purchase form with all required fields', async ({ page }) => {
    await homePage.navigate();
    await homePage.searchFlights('Boston', 'London');
    await flightResultsPage.chooseFirstFlight();

    await expect(purchasePage.nameInput).toBeVisible();
    await expect(purchasePage.addressInput).toBeVisible();
    await expect(purchasePage.cityInput).toBeVisible();
    await expect(purchasePage.creditCardNumberInput).toBeVisible();
    await expect(purchasePage.purchaseButton).toBeVisible();
  });

  test('should complete a full purchase and show confirmation', async ({ page }) => {
    await homePage.navigate();
    await homePage.searchFlights('Boston', 'London');
    await flightResultsPage.chooseFirstFlight();

    await purchasePage.fillPassengerDetails({
      name: 'John Doe',
      address: '123 Main St',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701',
      cardType: 'Visa',
      creditCardNumber: '4111111111111111',
      creditCardMonth: '12',
      creditCardYear: '2027',
      nameOnCard: 'John Doe',
    });

    await purchasePage.submitPurchase();

    await expect(page).toHaveURL(/confirmation/);
    const heading = await confirmationPage.getHeadingText();
    expect(heading).toContain('Thank you for your purchase today!');
  });
});
