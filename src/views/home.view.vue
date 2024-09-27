<template>
  <header-layout />
  <div :class="baseClass" v-if="products.length && products[0]">
    <img :class="`${baseClass}__image`" :src="products[0].imageUrl" />
    <h2>{{ products[0].name }}</h2>
    <p>{{ products[0].description }}</p>
    <p>{{ products[0].price }} €</p>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';

  import { useProducts } from '../composables/use-products';

  import HeaderLayout from './header-layout.view.vue';

  const baseClass = 'home';

  const { products, fetchProducts } = useProducts();

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
