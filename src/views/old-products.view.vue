<template>
  <header-layout colored />
  <div :class="baseClass">
    <div>
      <base-text tag="h3">
        {{ category ? category.toUpperCase() : t('products.allProducts').toUpperCase() }}
      </base-text>
      <base-text tag="default">{{ products.length }} {{ t('products.results') }}</base-text>
    </div>
    <div :class="`${baseClass}__content`">
      <base-product-card v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
  <Footer />
</template>

<script lang="ts" setup>
  import { computed, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRoute } from 'vue-router';

  import { BaseProductCard, BaseText, Footer } from '../components';
  import { useProducts } from '../composables';

  import HeaderLayout from './header-layout.view.vue';

  const baseClass = 'products';

  const { t } = useI18n();

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
    gap: 12px;
    min-height: 90%;
    margin: 2rem 3rem;

    &__content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr));
      row-gap: 46px;
    }
  }
</style>
