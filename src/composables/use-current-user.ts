import { computed, ref } from 'vue';
import { User } from '../interfaces';

export function useCurrentUser() {
  const userStore = computed(() => localStorage.getItem('user'));

  const user = ref<User>(userStore.value ? JSON.parse(userStore.value) : undefined);

  return {
    user
  };
}
