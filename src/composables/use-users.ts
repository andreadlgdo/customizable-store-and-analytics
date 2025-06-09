import { ref } from 'vue';

import { User } from '../interfaces';
import { userService } from '../services';

const getStoredUser = (): User | undefined => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : undefined;
};

const sharedUser = ref<User | undefined>(getStoredUser());

export function useUsers() {
  const user = sharedUser;

  const getUsers = async (): Promise<User[]> => {
    return await userService.getUsers();
  };

  const createUser = async (userToCreate: User): Promise<User> => {
    const createdUser = await userService.createUser(userToCreate);
    localStorage.setItem('user', JSON.stringify(createdUser));
    user.value = createdUser;
    return createdUser;
  };

  const login = async (email: string, password: string): Promise<Error | void> => {
    try {
      const response = await userService.validUser({ email, password });
      user.value = response.user;
      localStorage.setItem('user', JSON.stringify(user.value));
    } catch (error) {
      return error as Error;
    }
  };

  const logout = (): void => {
    user.value = undefined;
    localStorage.removeItem('user');
    window.location.reload();
  };

  return {
    user,
    getUsers,
    createUser,
    login,
    logout
  };
}
