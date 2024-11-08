import { ref } from 'vue';

import { User } from '../interfaces';
import { userService } from '../services';

export function useUsers() {
  const user = ref<User | undefined>(undefined);

  const getUsers = async () => {
    return await userService.getUsers();
  };

  const createUser = async (user: User) => {
    const response = await userService.createUser(user);
    localStorage.setItem('user', JSON.stringify(response.user));
    return response.user;
  };

  const login = async (username: string, password: string) => {
    const userData = { username, password };
    const response = await userService.validUser(userData);
    user.value = response.user;
    localStorage.setItem('user', JSON.stringify(user.value));
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
