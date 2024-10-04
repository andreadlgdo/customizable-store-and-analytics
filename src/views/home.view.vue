<template>
  <header-layout />
  <div :class="baseClass" v-if="products.length">
    <div v-for="(product, index) in products" :key="index" :class="`${baseClass}__product`">
      <img :class="`${baseClass}__image`" :src="product.imageUrl" />
      <h3>{{ product.name }}</h3>
      <p>{{ product.price }} €</p>
    </div>
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
    flex-wrap: wrap;
    gap: 4rem;
    margin: 2rem;

    &__image {
      height: 14rem;
      width: 10rem;
    }

    &__product {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 14rem;
    }
  }
</style>
