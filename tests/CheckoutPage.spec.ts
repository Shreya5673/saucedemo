import { test, expect } from '../fixtures/test-fixtures';


test.use({ storageState: 'storage/Auth.json' });

test.describe('Checkout Test Scenarios', () => {

  test('Checkout', async ({ page, productPage, cartPage, checkoutPage}) => {

    

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

 test('Checkout with empty first name and last name', async({page, productPage, cartPage, checkoutPage})=>{
  

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
  test ('Cancelling after reaching out to final process', async({page, productPage, checkoutPage, cartPage}) =>{


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
