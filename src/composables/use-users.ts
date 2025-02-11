import { ref } from 'vue';

import { User } from '../interfaces';
import { userService } from '../services';

const getStoredUser = () => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : undefined;
};

export function useUsers() {
  const user = ref<User | undefined>(getStoredUser());

  const getUsers = async () => {
    const { users } = await userService.getUsers();
    return users;
  };

  const createUser = async (userToCreate: User) => {
    const { user } = await userService.createUser(userToCreate);
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  };

  const login = async (email: string, password: string) => {
    const userData = { email, password };
    try {
      const response = await userService.validUser(userData);
      user.value = response.user;
      localStorage.setItem('user', JSON.stringify(user.value));
    } catch (error: any) {
      return error;
    }
  };

  const logout = () => {
    user.value = undefined;
    localStorage.removeItem('user');
  };

  return {
    user,
    getUsers,
    createUser,
    login,
    logout
  };
}
