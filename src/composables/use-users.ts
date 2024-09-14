import { ref } from 'vue';
import { userService } from '../services/user.service';
import { User } from '../interfaces/user';

export function useUsers() {
  const user = ref(null);
  const loading = ref(false);

  const getUsers = async () => {
    loading.value = true;
    try {
      const users = await userService.getUsers();
      return users;
    } catch (error) {
      console.error('Get users failed', error);
    } finally {
      loading.value = false;
    }
  };

  const createUser = async (user: User) => {
    loading.value = true;
    try {
      const response = await userService.createUser(user);
      return response.user;
    } catch (error) {
      console.error('Create user failed', error);
    } finally {
      loading.value = false;
    }
  };

  const login = async (username: string, password: string) => {
    loading.value = true;
    try {
      const userData = { username, password };
      const response = await userService.validUser(userData);
      user.value = response.user;
      // Aquí podrías guardar el token si lo recibes en la respuesta
      // localStorage.setItem('token', response.token);
    } catch (error) {
      console.error('Login failed', error);
      return error;
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
    // localStorage.removeItem('token');
  };

  return {
    user,
    loading,
    getUsers,
    createUser,
    login,
    logout
  };
}
