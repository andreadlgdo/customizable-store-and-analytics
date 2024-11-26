<template>
  <header-layout colored />
  <div :class="baseClass">
    <base-text tag="h3">{{ category?.toUpperCase() }}</base-text>
    <base-text v-for="product in products" :key="product.id">
      {{ product.name }}
    </base-text>
  </div>
  <Footer />
</template>

<script lang="ts" setup>
  import { computed, onMounted } from 'vue';
  import { useRoute } from 'vue-router';

  import { BaseText, Footer } from '../components';
  import { useProducts } from '../composables';

  import HeaderLayout from './header-layout.view.vue';

  const baseClass = 'products';

  const { products, loadProducts } = useProducts();

  const route = useRoute();

  const category = computed<string>(() => route.params.category as string);

  onMounted(async () => {
    await loadProducts();
  });
</script>

<style lang="scss" scoped>
  .products {
    height: 90%;
    margin: 2rem 3rem;
  }
</style>
