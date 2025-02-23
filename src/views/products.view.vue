<template>
  <div :class="baseClass">
    <section :class="`${baseClass}__header`"></section>
    <section :class="`${baseClass}__content`">
      <ui-product-card v-for="product in products" :key="product._id" :product="product" />
    </section>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';

  import { useProducts } from '../composables';

  import UiProductCard from '../components/shared/products/ui-product-cart.component.vue';

  const baseClass = 'products';

  const { products, loadProducts } = useProducts();

  onMounted(async () => await loadProducts());
</script>

<style lang="scss" scoped>
  .products {
    overflow-x: hidden;

    &__header {
      background: var(--color-soft-primary);
      height: 5rem;
      width: 100%;
    }

    &__content {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 2rem;
      margin: 4rem;
    }
  }
</style>
