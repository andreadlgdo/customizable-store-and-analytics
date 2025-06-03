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
      @addToCart="addToCartWhistList"
    />
    <UiProductDetailsModal
      v-if="productDetails"
      @addToCart="isOpenShoppingCart = true"
      @selectFavourite="selectFavourite"
      @close="productDetails = undefined"
      :is-open="true"
      :product="productDetails"
      :is-favourite="!!productDetails.isFavouriteUsersIds?.includes(user?._id || '')"
    />
    <div :class="`${baseClass}__content`">
      <h1 :class="`${baseClass}__title`">
        {{ title }}
      </h1>
      <UiContactForm />
      <UiContactMethods />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';

  import UiProductDetailsModal from '../components/shared/products/ui-product-details-modal.component.vue';
  import UiContactForm from '../components/contact-us/ui-contact-form.component.vue';
  import UiContactMethods from '../components/contact-us/ui-contact-methods.component.vue';

  import { useProducts, useUsers } from '../composables';
  import { Product } from '../interfaces';
  import { customService, productService } from '../services';

  import Header from './app-header.view.vue';

  const baseClass = 'contact-us';

  const { loadProducts } = useProducts();
  const { user } = useUsers();
  
  const isOpenMenu = ref(false);  
  const isOpenUserMenu = ref(false);
  const isOpenWhistList = ref(false);
  const isOpenShoppingCart = ref(false);
  const productDetails = ref<Product | undefined>(undefined);
  const title = ref('');

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
    await loadProducts();
    isOpenWhistList.value = true;
  };

  const addToCartWhistList = (product: Product) => {
    productDetails.value = product;
    isOpenWhistList.value = false;
  };

  onMounted(async () => {
    const customTexts = await customService.getCustomTexts("contactUs");
    title.value = customTexts.title;
  });
</script>

<style lang="scss" scoped>
.contact-us {
  --color-dark-primary-rgb: 0, 0, 0;
  
  &__content {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
  }
  
  &__title {
    margin-bottom: 1.5rem;
    text-align: center;
  }
}
</style>