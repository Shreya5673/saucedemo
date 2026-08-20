import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';

test.use({ storageState: 'storage/Auth.json' });

test.describe('Cart Test Scenarios', () => {

  test('Add product to cart', async ({ page }) => {
    const productPage = new ProductPage(page);

    await page.goto('/inventory.html');

    await productPage.addToCart('Sauce Labs Backpack');

    const cartCount = page.locator('.shopping_cart_badge');

    await expect(cartCount).toHaveText('1');
  });

  test('Open cart', async ({ page }) => {
    const productPage = new ProductPage(page);

    await page.goto('/inventory.html');

    await productPage.openCart();

    await expect(page).toHaveURL(/cart.html/);
  });


});