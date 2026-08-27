import { test, expect } from '../fixtures/test-fixtures';
import { checkoutUsers } from '../test-data/userData';

test.use({ storageState: 'storage/Auth.json' });

test.describe('Checkout Test Scenarios', () => {

  test('Checkout', async ({ page, productPage, cartPage, checkoutPage }) => {

    await page.goto('/inventory.html');

    await productPage.addToCart('Sauce Labs Backpack');
    await productPage.openCart();

    await cartPage.checkout();

    await checkoutPage.fillCustomerInformation(
      checkoutUsers.validUser.firstName,
      checkoutUsers.validUser.lastName,
      checkoutUsers.validUser.postalCode
    );

    await checkoutPage.continue();
    await checkoutPage.finish();

    await expect(page).toHaveURL(/checkout-complete/);
  });


  test('Checkout with empty first name and last name', async ({
    page,
    productPage,
    cartPage,
    checkoutPage
  }) => {

    await page.goto('/inventory.html');

    await productPage.addToCart('Sauce Labs Backpack');
    await productPage.openCart();

    await cartPage.checkout();

    await checkoutPage.fillCustomerInformation(
      '',
      '',
      checkoutUsers.validUser.postalCode
    );

    await checkoutPage.continue();

    await expect(
      page.getByText('Error: First Name is required')
    ).toBeVisible();
  });


  test('Cancelling after reaching final process', async ({
    page,
    productPage,
    checkoutPage,
    cartPage
  }) => {

    await page.goto('/inventory.html');

    await productPage.addToCart('Sauce Labs Backpack');
    await productPage.openCart();

    await cartPage.checkout();

    await checkoutPage.fillCustomerInformation(
      checkoutUsers.anotherUser.firstName,
      checkoutUsers.anotherUser.lastName,
      checkoutUsers.anotherUser.postalCode
    );

    await checkoutPage.cancel();

    await expect(page).toHaveURL('/cart.html');
  });

});