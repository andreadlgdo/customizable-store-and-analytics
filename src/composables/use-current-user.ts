import { ref } from 'vue';
import { User } from '../interfaces';

export function useCurrentUser() {
  const userStore = localStorage.getItem('user');

  const user = ref<User>(userStore ? JSON.parse(userStore) : undefined);

  return {
    user
  };
}
