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
test ('Open cart with no product', async({page}) =>{

  const productPage = new ProductPage(page);

  await page. goto('/inventory.html ');

  await productPage.openCart();

  await expect(page.locator('.cart_item')).toHaveCount(0);

})
test('Remove a product that is not in the cart', async ({ page }) => {
  const productPage = new ProductPage(page);
  await page.goto('/inventory.html');

  await productPage.openCart();

  await expect(page.locator('.cart_item')).toHaveCount(0);

  await expect(
    page.getByTestId('remove-sauce-labs-backpack')
  ).not.toBeVisible();
});
});