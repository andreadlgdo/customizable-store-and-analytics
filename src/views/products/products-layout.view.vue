<template>
  <div :class="baseClass">
    <Header
      :opened-menu="isOpenMenu"
      :opened-user-menu="isOpenUserMenu"
      :opened-whist-list="isOpenWhistList"
      :opened-shopping-cart="isOpenShoppingCart"
      @updateMenu="value => (isOpenMenu = value)"
      @updateUserMenu="value => (isOpenUserMenu = value)"
      @selectFavourite="handleFavouriteSelection"
      @updateWhistList="value => (isOpenWhistList = value)"
      @updateShoppingCart="value => (isOpenShoppingCart = value)"
      @addToCart="addToCartWhistList"
    />
    <ui-loading v-if="isLoading" />
    <section 
      v-else 
      :class="[
        `${baseClass}__wrapper`, 
        `${baseClass}__wrapper--content`, 
        { [`${baseClass}__wrapper--aside`]: isOpenFilters }
      ]"
    >
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--title`">
        <div>
          <h1 :class="`${baseClass}__text`">
            {{ (category ? category : t('products.allProducts')).toUpperCase() }}
          </h1>
          <p>{{ products.length }} {{ t('products.results') }}</p>
        </div>
        <div>
          <UiButton 
            v-if="!isOpenFilters" 
            @click="isOpenFilters = true" 
            icon="filter" 
            text="Filtros" 
            transparent
          />
          <UiFiltersAside 
            @applyFilters="filterProducts" 
            @close="isOpenFilters = false"
            @cleanFilters="cleanFilters" 
            :is-open="isOpenFilters" 
            :categoryFilter="category"
          />
        </div>
      </div>
      <section :class="`${baseClass}__wrapper ${baseClass}__wrapper--product`">
        <template v-if="products.length > 0">
          <ui-product-card
            v-for="product in products"
            :key="product._id"
            :product="product"
            :is-favourite="isProductFavourite(product)"
            @selectProduct="p =>router.push(category ? `/products/${category}/${p._id}` : `/products/${p._id}`)"
            @selectFavourite="selectFavourite"
            @addToCart="p => (productDetails = p)"
          />
        </template>
        <div v-else :class="`${baseClass}__no-products`">
          <p :class="`${baseClass}__text`">No se encontraron productos</p>
          <p>Intenta otra combinación de filtros.</p>
        </div>
        <ui-product-details-modal
          v-if="productDetails"
          :is-open="!!productDetails"
          :product="productDetails"
          :is-favourite="isProductFavourite(productDetails)"
          @addToCart="isOpenShoppingCart = true"
          @selectFavourite="selectFavourite"
          @close="productDetails = undefined"
        />
      </section>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { useProducts, useUsers } from '@/composables';
import { Product } from '@/interfaces';
import { productService } from '@/services';

import UiButton from '@/components/shared/ui-button.component.vue';
import UiFiltersAside from '@/components/products/ui-filters-aside.component.vue';
import UiProductCard from '@/components/products/ui-product-card.component.vue';
import UiProductDetailsModal from '@/components/products/ui-product-details-modal.component.vue';
import UiLoading from '@/components/shared/ui-loading.component.vue';
import Header from '@/views/app-header.view.vue';

const baseClass = 'products';

const { products, loadProducts } = useProducts();
const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { user } = useUsers();


const isOpenMenu = ref(false);
const isOpenUserMenu = ref(false);
const isOpenWhistList = ref(false);
const isOpenShoppingCart = ref(false);
const isLoading = ref(false);
const isOpenFilters = ref(false);
const productDetails = ref<Product | undefined>(undefined);

const category = computed<string>(() => (route.params.category as string)?.toLowerCase());

const isProductFavourite = (product: Product): boolean => {
  if (!product.isFavouriteUsersIds || !user.value?._id) return false;
  return product.isFavouriteUsersIds.includes(user.value._id);
};

const handleFavouriteSelection = () => {
  loadProducts({ categories: category.value ? [category.value] : [] });
};

const selectFavourite = async (favourite: boolean, product: Product) => {
  if (!product._id) return;

  if (user.value?._id) {
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
  } else {
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

  await loadProducts({ categories: category.value ? [category.value] : [] });
  isOpenWhistList.value = true;
};

const addToCartWhistList = (product: Product) => {
  productDetails.value = product;
  isOpenWhistList.value = false;
};

const filterProducts = async (
  category: string, 
  order: string, 
  discounted: boolean, 
  available: boolean, 
  minPrice: number, 
  maxPrice: number
) => {
  await loadProducts({ 
    categories: category ? [category] : [], 
    order: order ?? undefined, 
    discounted, 
    hasStock: available ? 'true' : undefined, 
    minPrice, 
    maxPrice
  });
};

const cleanFilters = async () => {
  isOpenFilters.value = false;
  await loadProducts({ categories: category.value ? [category.value] : [] });
};

watch(
  category,
  async newCategory => {
    isLoading.value = true;
    try {
      await loadProducts({ categories: newCategory ? [newCategory] : [] });
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
    transition: margin-right 0.8s cubic-bezier(0.4, 0, 0.2, 1);

    &--content {
      flex-direction: column;
      margin: 4rem;
      gap: 2rem;
    }

    &--aside {
      margin-right: calc(320px + 4rem);
    }

    &--title {
      align-items: center;
      justify-content: space-between;
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

  &__no-products {
    text-align: center;
    padding: 4rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    gap: 8px;
  }
}
</style>
