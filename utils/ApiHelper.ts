import { APIRequestContext } from '@playwright/test';

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from './apiUtils';

export class ApiHelper {

  constructor(private request: APIRequestContext) {}

  getUsers() {
    return getUsers(this.request);
  }

  getUserById(
    id: number,
    username: string
  ) {
    return getUserById(
      this.request,
      id,
      username
    );
  }

  createUser(userData: {
    name: string;
    username: string;
    email: string;
  }) {
    return createUser(
      this.request,
      userData
    );
  }

  updateUser(
    userId: number,
    userData: {
      name: string;
      username: string;
      email: string;
    }
  ) {
    return updateUser(
      this.request,
      userId,
      userData
    );
  }

  deleteUser(userId: number) {
    return deleteUser(
      this.request,
      userId
    );
  }
}