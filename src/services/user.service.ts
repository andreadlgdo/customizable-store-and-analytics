import { User } from '../interfaces';
import { fetchData } from './httpClient';

const apiUrl = process.env.VUE_APP_API_URL || '';
const BASE_PATH = `${apiUrl}/api`;
const USERS_PATH = `${BASE_PATH}/users`;
const LOGIN_PATH = `${BASE_PATH}/login`;

interface LoginCredentials {
  email: string;
  password: string;
}

export const userService = {
  getUsers: async (): Promise<User[]> => {
    const { users } = await fetchData(USERS_PATH, { method: 'GET' });
    return users;
  },
  
  createUser: async (userData: User): Promise<User> => {
    const { user } = await fetchData(USERS_PATH, {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    return user;
  },
  
  updateUser: async (userData: User): Promise<User> => {
    if (!userData._id) {
      throw new Error('User ID is required');
    }
    return fetchData(`${USERS_PATH}/${userData._id}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
  },
  
  validUser: async (credentials: LoginCredentials): Promise<{ token: string; user: User }> => {
    return fetchData(LOGIN_PATH, {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },
  
  deleteUser: async (id: string): Promise<void> => {
    if (!id) {
      throw new Error('User ID is required');
    }
    
    return fetchData(`${USERS_PATH}/${id}`, { method: 'DELETE' });
  }
};
