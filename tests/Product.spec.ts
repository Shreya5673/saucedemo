import {test, expect} from '@playwright/test';  
import { ProductPage } from '../pages/ProductPage';
import { CheckoutPage } from '../pages/CheckoutPage';


test.use({ storageState: 'storage/Auth.json' });


test.describe('Product Page Test Scenarios', () => {
  test('Verify product title', async ({ page }) => {
    const productPage = new ProductPage(page);
    await page.goto('/inventory.html');
    const title = await productPage.getProductTitle('Sauce Labs Backpack');
  await expect(title).toBeVisible();
  });

  test('Verify product price', async ({ page }) => {
    const productPage = new ProductPage(page);
    await page.goto('/inventory.html');
    const price = await productPage.getProductPrice('Sauce Labs Backpack');
    await expect(price).toHaveText('$29.99');
  })
  test('Verify product image', async ({ page }) => {
    const productPage = new ProductPage(page);
    await page.goto('/inventory.html');
    const image = await productPage.getProductImage('Sauce Labs Backpack');
    await expect(image).toBeVisible();
  })

  


})