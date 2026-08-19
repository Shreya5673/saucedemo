import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Test Scenarios', () => {

  test('Positive: valid login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

     await expect(page.getByText("SWAG LAB")).toBeVisible();
      await page.context().storageState({ path: 'storage/Auth.json' });
    
  })
  test('Negative: invalid login', async ({ page }) => {
    const loginPage = new LoginPage(page);  
     await loginPage.navigate();
    await loginPage.login('invalid_user', 'invalid_password'); 
    await expect(loginPage.errorMessage).toBeVisible();
});

 test('Negative: empty login', async ({ page }) => {
    const loginPage = new LoginPage(page);  
     await loginPage.navigate();
    await loginPage.submitEmpty(); 
    await expect(loginPage.errorMessage).toBeVisible();
});

test('Negative: locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);  
     await loginPage.navigate();
    await loginPage.login('locked_out_user', 'secret_sauce'); 
    await expect(loginPage.errorMessage).toBeVisible();
});

test('Negative: empty password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('process.env.SAUCE_USERNAME!', '');
    await expect(loginPage.errorMessage).toBeVisible();
});
test('Negative: empty username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('', 'process.env.SAUCE_PASSWORD!');
    await expect(loginPage.errorMessage).toBeVisible();
});
});