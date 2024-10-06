<template>
  <Header
    @clickUser="isLogInAsideOpen = true"
    @clickShoppingCart="isShoppingCartAsideOpen = true"
    @clickMenu="isMenuOpen = true"
  />
  <theme-toggle class="changePosition theme" />
  <language-toggle class="changePosition language" />
  <log-in-aside
    @close="closeAllAsides"
    @openSignUpAsideOpen="openSignUpAsideOpen"
    :is-open="isLogInAsideOpen"
    :close-position="isMobile ? 'left' : 'right'"
  />
  <sign-up-aside
    @close="closeAllAsides"
    @openLogInAsideOpen="openLogInAsideOpen"
    :is-open="isSignUpAsideOpen"
    :close-position="isMobile ? 'left' : 'right'"
  />
  <shopping-cart-aside
    @close="closeAllAsides"
    @updateProduct="updateProduct"
    :is-open="isShoppingCartAsideOpen"
    :whist-list-products="products.filter(p => p.isFavorite)"
  />
  <Menu
    @close="closeAllAsides"
    @clickUserAsideOnMobile="openUserAsideOnMobile"
    :is-open="isMenuOpen"
  />
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';

  import LogInAside from '../components/asides/log-in-aside.component.vue';
  import ShoppingCartAside from '../components/asides/shopping-cart-aside.component.vue';
  import SignUpAside from '../components/asides/sign-up-aside.component.vue';

  import Header from '../components/header/header.component.vue';

  import Menu from '../components/mobile/menu.component.vue';

  import ThemeToggle from '../components/toggles/theme-toggle.component.vue';
  import LanguageToggle from '../components/toggles/language-toggle.component.vue';

  import { useProducts } from '../composables/use-products';

  import { Product } from '../interfaces/product';

  const { products, fetchProducts } = useProducts();

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

  const updateProduct = (product: Product) => {
    products.value.forEach((p: Product) => {
      if (p._id === product._id) {
        Object.assign(p, product);
      }
    });
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

    .language {
      right: 12rem;
    }
    .theme {
      right: 16rem;
    }
  }
</style>
