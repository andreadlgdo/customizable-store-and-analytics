<template>
  <Header
    @clickUser="isLogInAsideOpen = true"
    @clickShoppingCart="isShoppingCartAsideOpen = true"
    @clickMenu="isMenuOpen = true"
  />
  <theme-toggle class="changePosition changePosition__theme" />
  <log-in-aside
    @close="closeAllAsides"
    @openSignUpAsideOpen="openSignUpAsideOpen"
    :is-open="isLogInAsideOpen"
  />
  <sign-up-aside
    @close="closeAllAsides"
    @openLogInAsideOpen="openLogInAsideOpen"
    :is-open="isSignUpAsideOpen"
    :close-position="isMobile ? 'left' : 'right'"
  />
  <shop-aside @close="closeAllAsides" :is-open="isShoppingCartAsideOpen" />
  <menu-aside
    @close="closeAllAsides"
    @openLogInAside="openUserAsideOnMobile"
    :is-open="isMenuOpen"
  />
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';

  import {
    Header,
    LogInAside,
    MenuAside,
    ShopAside,
    SignUpAside,
    ThemeToggle
  } from '../components';
  import { useProducts } from '../composables';

  const { fetchProducts } = useProducts();

  const isLogInAsideOpen = ref(false);
  const isSignUpAsideOpen = ref(false);
  const isShoppingCartAsideOpen = ref(false);
  const isMenuOpen = ref(false);

  const isMobile = window.innerWidth < 768;

  const openSignUpAsideOpen = () => {
    isLogInAsideOpen.value = false;
    isSignUpAsideOpen.value = true;
  };

  const openLogInAsideOpen = () => {
    isLogInAsideOpen.value = true;
    isSignUpAsideOpen.value = false;
  };

  const closeAllAsides = () => {
    isLogInAsideOpen.value = false;
    isSignUpAsideOpen.value = false;
    isShoppingCartAsideOpen.value = false;
    isMenuOpen.value = false;
  };

  const openUserAsideOnMobile = () => {
    isMenuOpen.value = false;
    isLogInAsideOpen.value = true;
  };

  onMounted(async () => {
    await fetchProducts();
  });
</script>

<style lang="scss" scoped>
  // TODO: Remove when i change the inputs
  .changePosition {
    position: absolute;
    top: 2rem;
    &__theme {
      right: 16rem;
    }
  }
</style>
