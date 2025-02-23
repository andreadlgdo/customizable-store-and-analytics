<template>
  <div :class="baseClass">
    <ui-header />
    <section :class="`${baseClass}__wrapper ${baseClass}__wrapper--content`">
      <h1 :class="`${baseClass}__text`">
        {{ category ? category.toUpperCase() : 'ALL CATEGORIES' }}
      </h1>
      <section :class="`${baseClass}__wrapper ${baseClass}__wrapper--product`">
        <ui-product-card v-for="product in products" :key="product._id" :product="product" />
      </section>
    </section>
  </div>
</template>

<script lang="ts" setup>
  import { computed, watch } from 'vue';
  import { useRoute } from 'vue-router';

  import { useProducts } from '../composables';

  import UiProductCard from '../components/shared/products/ui-product-cart.component.vue';
  import UiHeader from '../components/shared/ui-header.component.vue';

  const baseClass = 'products';

  const { products, loadProducts } = useProducts();
  const route = useRoute();

  const category = computed<string>(() => (route.params.category as string)?.toLowerCase());

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
    overflow-x: hidden;

    &__wrapper {
      display: flex;
      gap: 2rem;

      &--content {
        flex-direction: column;
        margin: 4rem;
      }

      &--product {
        flex-wrap: wrap;
        justify-content: center;
      }
    }

    &__text {
      font-size: 22px;
      font-weight: bold;
    }
  }
</style>
