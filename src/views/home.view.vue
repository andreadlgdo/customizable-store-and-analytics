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
  />
  <div :class="baseClass" v-if="products.length && products[0]">
    <img :class="`${baseClass}__image`" :src="products[0].imageUrl" />
    <h2>{{ products[0].name }}</h2>
    <p>{{ products[0].description }}</p>
    <p>{{ products[0].price }} €</p>
  </div>
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

  import { Product } from '../interfaces/product';
  import { useProducts } from '@/composables/use-products';

  const baseClass = 'home';

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
  .home {
    display: flex;
    flex-direction: column;
    margin: 2rem;

    &__image {
      height: 14rem;
      width: 10rem;
    }
  }
</style>
