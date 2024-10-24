import { ref } from 'vue';

export function useMobile() {
  const isMobile = ref(window.innerWidth < 768);

  return {
    isMobile
  };
}
