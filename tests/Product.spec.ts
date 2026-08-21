import { test, expect } from '../fixtures/test-fixtures';



test.use({ storageState: 'storage/Auth.json' });


test.describe('Product Page Test Scenarios', () => {
  test('Verify product title', async ({ page, productPage }) => {
    await page.goto('/inventory.html');
    const title = await productPage.getProductTitle('Sauce Labs Backpack');
  await expect(title).toBeVisible();
  });

  test('Verify product price', async ({ page, productPage }) => {
   
    await page.goto('/inventory.html');
    const price = await productPage.getProductPrice('Sauce Labs Backpack');
    await expect(price).toHaveText('$29.99');
  })
  test('Verify product image', async ({ page, productPage }) => {
    
    await page.goto('/inventory.html');
    const image = await productPage.getProductImage('Sauce Labs Backpack');
    await expect(image).toBeVisible();
  })

  
 test('Add product to cart and removing it and then verify cart count', async ({ page, productPage}) => {
    await page.goto('/inventory.html');
    await productPage.addToCart('Sauce Labs Backpack');
    const cartCount = page.locator('.shopping_cart_badge');
    await expect(cartCount).toHaveText('1');
    await productPage.removeFromCart('Sauce Labs Backpack');
    await expect(cartCount).toHaveCount(0);
  })

  test('Adding multiple product to cart and verifying cart count', async({page, productPage}) => {
    await page.goto ('/inventory.html');
    await productPage.addToCart('Sauce Labs Backpack');
    await productPage.addToCart('Sauce Labs Bolt T-Shirt');
    await productPage.addToCart('Sauce Labs Bike Light');
    const cartCount = page.locator('.shopping_cart_badge');
    await expect(cartCount).toHaveText('3');
   



  })
});

 