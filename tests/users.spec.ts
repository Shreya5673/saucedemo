import { test, expect } from '@playwright/test';
import { API_BASE_URL } from '../utils/apiUtils';

test.use({ storageState: 'storage/Auth.json' });

test('GET USERS', async ({ request }) => {
  const response = await request.get(`${API_BASE_URL}/users`);

  expect(response.headers()['content-type']).toContain('application/json');
  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body).toBeInstanceOf(Array);
  expect(body.length).toBeGreaterThan(0);
  expect(body[0].id).toBe(1);
});


test('GET user by id', async ({ request }) => {
  const response = await request.get(`${API_BASE_URL}/users`, {
    params: {
      id: 5,
      username: 'Kamren',
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body[0].id).toBe(5);
  expect(body[0].username).toBe('Kamren');
});


test('POST create user', async ({ request }) => {
  const userData = {
    name: 'Shreya',
    username: 'shreya123',
    email: 'shreya11@example.com',
  };

  const response = await request.post(`${API_BASE_URL}/users`, {
    data: userData,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  expect(response.status()).toBe(201);

  const body = await response.json();

  expect(body.name).toBe(userData.name);
  expect(body.username).toBe(userData.username);
  expect(body.email).toBe(userData.email);
});


test('GET non-existent user', async ({ request }) => {
  const response = await request.get(`${API_BASE_URL}/users/9999`);

  expect(response.status()).toBe(404);
});


test('PUT update user', async ({ request }) => {
  const updatedUser = {
    name: 'Shreya Updated',
    username: 'shreya_updated',
    email: 'updated@example.com',
  };

  const response = await request.put(`${API_BASE_URL}/users/1`, {
    data: updatedUser,
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.name).toBe(updatedUser.name);
  expect(body.username).toBe(updatedUser.username);
  expect(body.email).toBe(updatedUser.email);
});


test('DELETE user', async ({ request }) => {
  const response = await request.delete(`${API_BASE_URL}/users/1`);

  expect(response.status()).toBe(200);
});


test('API and UI test', async ({ request, page }) => {
  const response = await request.get(`${API_BASE_URL}/users/1`);

  expect(response.status()).toBe(200);

  const body = await response.json();

  const userName = body.name;

  await page.goto('/inventory.html');

  await expect(page).toHaveURL(/inventory.html/);
});