<template>
  <Header
    @clickUser="isLogInAsideOpen = true"
    @clickShoppingCart="isShoppingCartAsideOpen = true"
    @clickMenu="isMenuOpen = true"
  />
  <theme-toggle />
  <language-toggle />
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
    :menu-items="menuItems"
  />
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  import LogInAside from '../components/asides/log-in-aside.component.vue';
  import ShoppingCartAside from '../components/asides/shopping-cart-aside.component.vue';
  import SignUpAside from '../components/asides/sign-up-aside.component.vue';

  import Header from '../components/header/header.component.vue';

  import Menu from '../components/mobile/menu.component.vue';

  import ThemeToggle from '../components/toggles/theme-toggle.component.vue';
  import LanguageToggle from '../components/toggles/language-toggle.component.vue';

  import productsData from '../json/products.json';

  import { Product } from '../interfaces/product';

  const isLogInAsideOpen = ref(false);
  const isSignUpAsideOpen = ref(false);
  const isShoppingCartAsideOpen = ref(false);
  const isMenuOpen = ref(false);

  const isMobile = window.innerWidth < 768;

  const products = ref<Product[]>(productsData);

  // TO DO: Remove when we have menu items from the backend
  const menuItems = [
    { label: 'Home', subMenu: [] },
    { label: 'Shop', subMenu: ['Vestidos', 'Cazadoras', 'Camisetas', 'Zapatos'] },
    { label: 'About', subMenu: [] },
    { label: 'Contact', subMenu: [] }
  ];

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
    products.value.forEach(p => {
      if (p.id === product.id) {
        Object.assign(p, product);
      }
    });
  };

  fetch('http://localhost:3000/')
      .then(response => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return response.json();
        } else {
          return response.text();
        }
      })
      .then(data => {
        console.log(data);
        // If it's text, data will be a string
        // If it's JSON, data will be an object
      })
      .catch(error => console.error('Error:', error));

</script>

<style lang="scss" scoped></style>
