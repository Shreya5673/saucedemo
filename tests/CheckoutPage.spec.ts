import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.use({ storageState: 'storage/Auth.json' });

test.describe('Checkout Test Scenarios', () => {

  test('Checkout', async ({ page }) => {

    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await page.goto('/inventory.html');

    await productPage.addToCart('Sauce Labs Backpack');
    await productPage.openCart();

    await cartPage.checkout();

    await checkoutPage.fillCustomerInformation(
      'John',
      'Doe',
      '12345'
    );

    await checkoutPage.continue();
    await checkoutPage.finish();

    await expect(page).toHaveURL(/checkout-complete/);
  });

 test('Checkout with empty first name and last name', async({page})=>{
  const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await page.goto('/inventory.html');

    await productPage.addToCart('Sauce Labs Backpack');
    await productPage.openCart();

    await cartPage.checkout();
    await checkoutPage.fillCustomerInformation(
      '',
      '',
      '12345'
    );

    await checkoutPage.continue();
    await expect(page.getByText('Error: First Name is required')).toBeVisible();
  });
  test ('Cancelling after reaching out to final process', async({page}) =>{
     const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await page.goto('/inventory.html');

    await productPage.addToCart('Sauce Labs Backpack');
    await productPage.openCart();
    await cartPage.checkout();
    await checkoutPage.fillCustomerInformation(
      'John',
      'Doe',
      '12345'
    );
    await checkoutPage.cancel();
    
    await expect(page).toHaveURL('/cart.html');
    
  })
 })
