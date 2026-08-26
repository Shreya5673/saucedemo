import { test, expect } from '../fixtures/test-fixtures';

test.use({
  storageState: 'storage/Auth.json'
});


test('GET USERS', async ({ api }) => {

  const response = await api.getUsers();

  expect(
    response.headers()['content-type']
  ).toContain('application/json');

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body).toBeInstanceOf(Array);
  expect(body.length).toBeGreaterThan(0);
  expect(body[0].id).toBe(1);

});


test('GET user by id', async ({ api }) => {

  const response = await api.getUserById(
    5,
    'Kamren'
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body[0].id).toBe(5);
  expect(body[0].username).toBe('Kamren');

});


test('POST create user', async ({ api }) => {

  const userData = {
    name: 'Shreya',
    username: 'shreya123',
    email: 'shreya11@example.com',
  };

  const response = await api.createUser(
    userData
  );

  expect(response.status()).toBe(201);

  const body = await response.json();

  expect(body.name).toBe(userData.name);
  expect(body.username).toBe(userData.username);
  expect(body.email).toBe(userData.email);

});


test('GET non-existent user', async ({ api }) => {

  const response = await api.getUserById(
    9999,
    'NonExistentUser'
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body).toHaveLength(0);

});


test('PUT update user', async ({ api }) => {

  const updatedUser = {
    name: 'Shreya Updated',
    username: 'shreya_updated',
    email: 'updated@example.com',
  };

  const response = await api.updateUser(
    1,
    updatedUser
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.name).toBe(updatedUser.name);
  expect(body.username).toBe(updatedUser.username);
  expect(body.email).toBe(updatedUser.email);

});


test('DELETE user', async ({ api }) => {

  const response = await api.deleteUser(1);

  expect(response.status()).toBe(200);

});


test('API and UI test', async ({ api, page }) => {

  const response = await api.getUserById(
    1,
    'Bret'
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  const userName = body[0].name;

  expect(userName).toBe('Leanne Graham');

  await page.goto('/inventory.html');

  await expect(page).toHaveURL(
    /inventory.html/
  );

});