<template>
  <div :class="baseClass">
    <Header
      :opened-menu="isOpenMenu"
      :opened-user-menu="isOpenUserMenu"
      :opened-whist-list="isOpenWhistList"
      :opened-shopping-cart="isOpenShoppingCart"
      @updateMenu="value => (isOpenMenu = value)"
      @updateUserMenu="value => (isOpenUserMenu = value)"
      @selectFavourite="loadProducts()"
      @updateWhistList="value => (isOpenWhistList = value)"
      @updateShoppingCart="value => (isOpenShoppingCart = value)"
    />
    <section :class="`${baseClass}__wrapper ${baseClass}__wrapper--content`">
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--title`">
        <h1 :class="`${baseClass}__text`">
          {{ (category ? category : t('products.allProducts')).toUpperCase() }}
        </h1>
        <p>{{ products.length }} {{ t('products.results') }}</p>
      </div>
      <section :class="`${baseClass}__wrapper ${baseClass}__wrapper--product`">
        <ui-product-card
          @selectFavourite="isOpenWhistList = true"
          v-for="product in products"
          :key="product._id"
          :product="product"
        />
      </section>
    </section>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { useI18n } from 'vue-i18n';

  import { useProducts } from '../composables';

  import UiProductCard from '../components/shared/products/ui-product-cart.component.vue';

  import Header from './header.view.vue';

  const baseClass = 'products';

  const { products, loadProducts } = useProducts();
  const route = useRoute();
  const { t } = useI18n();

  const isOpenMenu = ref(false);
  const isOpenUserMenu = ref(false);
  const isOpenWhistList = ref(false);
  const isOpenShoppingCart = ref(false);

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
