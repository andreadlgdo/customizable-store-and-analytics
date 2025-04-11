<template>
  <div :class="baseClass">
    <Header
      :opened-menu="isOpenMenu"
      :opened-user-menu="isOpenUserMenu"
      :opened-whist-list="isOpenWhistList"
      :opened-shopping-cart="isOpenShoppingCart"
      @updateMenu="value => (isOpenMenu = value)"
      @updateUserMenu="value => (isOpenUserMenu = value)"
      @selectFavourite="loadProducts(category ? [category] : [])"
      @updateWhistList="value => (isOpenWhistList = value)"
      @updateShoppingCart="value => (isOpenShoppingCart = value)"
      @addToCart="addToCartWhistList"
    />
    <ui-loading v-if="isLoading" />
    <section v-else :class="`${baseClass}__wrapper ${baseClass}__wrapper--content`">
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--title`">
        <h1 :class="`${baseClass}__text`">
          {{ (category ? category : t('products.allProducts')).toUpperCase() }}
        </h1>
        <p>{{ products.length }} {{ t('products.results') }}</p>
      </div>
      <section :class="`${baseClass}__wrapper ${baseClass}__wrapper--product`">
        <ui-product-card
          @selectFavourite="selectFavourite"
          @addToCart="p => (productDetails = p)"
          v-for="product in products"
          :key="product._id"
          :product="product"
          :is-favourite="product.isFavouriteUsersIds?.includes(user?._id)"
        />
        <ui-product-details-modal
          @addToCart="isOpenShoppingCart = true"
          @selectFavourite="selectFavourite"
          @close="productDetails = undefined"
          :is-open="!!productDetails"
          :product="productDetails"
          :is-favourite="productDetails?.isFavouriteUsersIds?.includes(user?._id)"
        />
      </section>
    </section>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { useI18n } from 'vue-i18n';

  import { useProducts, useUsers } from '../composables';

  import UiProductCard from '../components/shared/products/ui-product-card.component.vue';
  import UiProductDetailsModal from '../components/shared/products/ui-product-details-modal.component.vue';
  import UiLoading from '../components/ui-loading.vue';

  import Header from './header.view.vue';
  import { Product } from '@/interfaces';
  import { productService } from '@/services';

  const baseClass = 'products';

  const { products, loadProducts } = useProducts();
  const route = useRoute();
  const { t } = useI18n();
  const { user } = useUsers();

  const isOpenMenu = ref(false);
  const isOpenUserMenu = ref(false);
  const isOpenWhistList = ref(false);
  const isOpenShoppingCart = ref(false);
  const isLoading = ref(false);

  const productDetails = ref<Product | undefined>(undefined);

  const category = computed<string>(() => (route.params.category as string)?.toLowerCase());

  const selectFavourite = async (favourite: boolean, product: Product) => {
    if (user.value && user.value._id && product._id) {
      const updateProduct: Product = {
        ...product,
        isFavouriteUsersIds: favourite
          ? [...(product.isFavouriteUsersIds ?? []), user.value._id]
          : product.isFavouriteUsersIds?.filter(f => f !== user.value?._id)
      };
      if (productDetails.value) {
        productDetails.value = updateProduct;
      }
      await productService.updateProduct(updateProduct);
    } else if (product._id) {
      const localFavouritesProductsIds = JSON.parse(
        localStorage.getItem('favouriteProducts') || '[]'
      ) as string[];
      if (favourite) {
        if (!localFavouritesProductsIds.includes(product._id)) {
          localFavouritesProductsIds.push(product._id);
        }
      } else {
        const index = localFavouritesProductsIds.indexOf(product._id);
        if (index !== -1) {
          localFavouritesProductsIds.splice(index, 1);
        }
      }
      localStorage.setItem('favouriteProducts', JSON.stringify(localFavouritesProductsIds));
    }
    await loadProducts(category.value ? [category.value] : []);
    isOpenWhistList.value = true;
  };

  const addToCartWhistList = (product: Product) => {
    productDetails.value = product;
    isOpenWhistList.value = false;
  };

  watch(
    category,
    async newCategory => {
      isLoading.value = true;
      try {
        await loadProducts(newCategory ? [newCategory] : []);
      } finally {
        isLoading.value = false;
      }
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
