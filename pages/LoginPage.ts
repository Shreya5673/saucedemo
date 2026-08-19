import { Page, Locator} from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly  username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;


  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"] ');
    this.errorMessage = page.locator('[data-test="error"]');
   
  
  }

async navigate() {
  await this.page.goto('/');

  }
  
  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async submitEmpty() {
    await this.loginButton.click();
  }

  async getErrorMessage() {
    return this.errorMessage;
  }
}