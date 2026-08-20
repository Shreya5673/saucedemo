import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();

  await loginPage.login(
    process.env.SAUCE_USERNAME!,
    process.env.SAUCE_PASSWORD!
  );

  await page.waitForURL('**/inventory.html');

  await page.context().storageState({
    path: 'storage/Auth.json',
  });
});