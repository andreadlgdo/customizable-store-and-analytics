import { ref } from 'vue';

export function useMobile() {
  const isMobileAndTable = ref(window.innerWidth < 768);

  const isMobile = ref(window.innerWidth < 500);

  return {
    isMobileAndTable,
    isMobile
  };
}
