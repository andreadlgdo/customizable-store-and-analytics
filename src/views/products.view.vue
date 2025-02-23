<template>
  <div :class="baseClass">
    <Header />
    <section :class="`${baseClass}__wrapper ${baseClass}__wrapper--content`">
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--title`">
        <h1 :class="`${baseClass}__text`">
          {{ (category ? category : t('products.allProducts')).toUpperCase() }}
        </h1>
        <p>{{ products.length }} {{ t('products.results') }}</p>
      </div>
      <section :class="`${baseClass}__wrapper ${baseClass}__wrapper--product`">
        <ui-product-card v-for="product in products" :key="product._id" :product="product" />
      </section>
    </section>
  </div>
</template>

<script lang="ts" setup>
  import { computed, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { useI18n } from 'vue-i18n';

  import { useProducts } from '../composables';

  import UiProductCard from '../components/shared/products/ui-product-cart.component.vue';

  import Header from './header.view.vue';

  const baseClass = 'products';

  const { products, loadProducts } = useProducts();
  const route = useRoute();
  const { t } = useI18n();

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

      &--content {
        flex-direction: column;
        margin: 4rem;
        gap: 2rem;
      }

      &--title {
        flex-direction: column;
        gap: 0.5rem;
      }

      &--product {
        flex-wrap: wrap;
        justify-content: center;
        gap: 2rem;
      }
    }

    &__text {
      font-size: 22px;
      font-weight: bold;
    }
  }
</style>
