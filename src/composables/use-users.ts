import { ref } from 'vue';
import { userService } from '../services/user.service';

export function useUsers() {
  const user = ref(null);
  const loading = ref(false);

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
    login,
    logout
  };
}
