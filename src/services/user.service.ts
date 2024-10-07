import { User } from '@/interfaces/user';

const apiUrl = process.env.VUE_APP_API_URL;

export const userService = {
  getUsers: async function () {
    try {
      const response = await fetch(`${apiUrl}/api/users`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  },
  createUser: async function (userData: User) {
    try {
      const response = await fetch(`${apiUrl}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      return await response.json();
    } catch (error) {
      console.log('Error creating user:', error);
      throw error;
    }
  },
  updateUser: async function (userData: User) {
    try {
      if (!userData._id) {
        console.log('The user do not have an id');
      }
      const response = await fetch(`${apiUrl}/api/users/${userData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Failed to updated user');
      }

      return await response.json();
    } catch (error) {
      console.log('Error updating user:', error);
      throw error;
    }
  },
  validUser: async function (userData: { username: string; password: string }) {
    try {
      const response = await fetch(`${apiUrl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      return await response.json();
    } catch (error) {
      console.log('Error creating user:', error);
      throw error;
    }
  }
};
