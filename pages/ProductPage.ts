import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly productImage: Locator;
  readonly addToCartButton: Locator;
  readonly openCartButton: Locator;
  readonly removeFromCartButton: Locator;
  readonly cartCount: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productTitle = page.getByTestId('inventory-item-name');
    this.productPrice = page.getByTestId('inventory-item-price');
    this.productImage = page.getByTestId('inventory-item-image');
    this.addToCartButton = page.getByTestId('add-to-cart-button');
    this.openCartButton = page.locator('[data-test="shopping-cart-link"]');
    this.removeFromCartButton = page.locator('[data-test="remove-from-cart-button"]');
    this.cartCount = page.locator('.shopping_cart_badge');
  }

  async getProductTitle(productName: string) {
    return this.page.getByText(productName);
  }

  async getProductPrice(productName: string) {
    const productElement = this.page.locator(
      `.inventory_item:has-text("${productName}")`
    );

    return productElement.locator('.inventory_item_price');
  }

  async getProductImage(productName: string) {
    const productElement = this.page.locator(
      `.inventory_item:has-text("${productName}")`
    );

    return productElement.locator('img.inventory_item_img');
  }

  async addToCart(productName: string) {
    const productElement = this.page.locator(
      `.inventory_item:has-text("${productName}")`
    );

    await productElement.locator('button').click();
  }

  async openCart() {
    await this.openCartButton.click();
  }
  
async removeFromCart(productName: string) {
  const productElement = this.page.locator(
      `.inventory_item:has-text("${productName}")`
    );
    await productElement.locator('button').click();
}}