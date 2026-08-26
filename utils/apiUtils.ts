import { APIRequestContext } from '@playwright/test';

export const API_BASE_URL =
  process.env.API_BASE_URL!;


export async function getUsers(request: APIRequestContext) {
  return await request.get(`${API_BASE_URL}/users`);
}

export async function getUserById(
  request: APIRequestContext,
  id: number,
  username: string
) {
  return await request.get(`${API_BASE_URL}/users`, {
    params: {
      id,
      username,
    },
  });
}

export async function createUser(
  request: APIRequestContext,
  userData: {
    name: string;
    username: string;
    email: string;
  }
) {
  return await request.post(`${API_BASE_URL}/users`, {
    data: userData,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function updateUser(
  request: APIRequestContext,
  userId: number,
  userData: {
    name: string;
    username: string;
    email: string;
  }
) {
  return await request.put(
    `${API_BASE_URL}/users/${userId}`,
    {
      data: userData,
    }
  );
}

export async function deleteUser(
  request: APIRequestContext,
  userId: number
) {
  return await request.delete(
    `${API_BASE_URL}/users/${userId}`
  );
}