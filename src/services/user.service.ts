import { User } from '../interfaces';
import { fetchData } from './httpClient';

const apiUrl = process.env.VUE_APP_API_URL;

export const userService = {
  getUsers: async function () {
    return fetchData(`${apiUrl}/api/users`, { method: 'GET' });
  },
  createUser: async function (userData: User) {
    return fetchData(`${apiUrl}/api/users`, {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },
  updateUser: async function (userData: User) {
    if (!userData._id) {
      throw new Error('User ID is required');
    }
    return fetchData(`${apiUrl}/api/users/${userData._id}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
  },
  validUser: async function (userData: { email: string; password: string }) {
    return fetchData(`${apiUrl}/api/login`, {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }
};
