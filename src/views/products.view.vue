<template>
  <header-layout colored />
  <div :class="baseClass">
    <base-text v-if="category" tag="h3">{{ category.toUpperCase() }}</base-text>
    <div :class="`${baseClass}__content`">
      <base-product-card v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
  <Footer />
</template>

<script lang="ts" setup>
  import { computed, watch } from 'vue';
  import { useRoute } from 'vue-router';

  import { BaseProductCard, BaseText, Footer } from '../components';
  import { useProducts } from '../composables';

  import HeaderLayout from './header-layout.view.vue';

  const baseClass = 'products';

  const { products, loadProducts } = useProducts();

  const route = useRoute();

  const category = computed<string>(() => route.params.category as string);

  watch(
    category,
    async newCategory => {
      await loadProducts(newCategory ? [newCategory] : []);
    },
    { immediate: true }
  );
</script>

<style lang="scss" scoped>
  .products {
    display: flex;
    flex-direction: column;
    min-height: 90%;
    margin: 2rem 3rem;

    &__content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr));
      row-gap: 46px;
    }
  }
</style>
