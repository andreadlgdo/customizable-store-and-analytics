<template>
  <div :class="baseClass">
    <Header 
      :opened-menu="isOpenMenu"
      :opened-user-menu="isOpenUserMenu"
      :opened-whist-list="isOpenWhistList"
      :opened-shopping-cart="isOpenShoppingCart"
      @updateMenu="value => (isOpenMenu = value)"
      @updateUserMenu="value => (isOpenUserMenu = value)"
      @selectFavourite="loadProducts([])"
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
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import Header from './header.view.vue';
  import { Product } from '@/interfaces';
  import { productService } from '@/services';
  import { useProducts, useUsers, useCart } from '@/composables';
  import UiProductDetailsModal from '@/components/shared/products/ui-product-details-modal.component.vue';

  const baseClass = 'contact-us';

  const { loadProducts } = useProducts();
  const { user } = useUsers();
  const { addProduct } = useCart();

  const isOpenMenu = ref(false);  
  const isOpenUserMenu = ref(false);
  const isOpenWhistList = ref(false);
  const isOpenShoppingCart = ref(false);
  const productDetails = ref<Product | undefined>(undefined);


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
    await loadProducts([]);
    isOpenWhistList.value = true;
  };

  const addToCartWhistList = (product: Product) => {
    // Show product details modal first
    productDetails.value = product;
    isOpenWhistList.value = false;
    
    // If the product has a unique size, we can add it directly to the cart
    if (product.isUniqueSize && product.uniqueStock && product.uniqueStock > 0) {
      addProduct(product, 'unique', '1')
        .then(() => {
          isOpenShoppingCart.value = true;
          productDetails.value = undefined;
        })
        .catch(error => {
          console.error('Error adding product to cart:', error);
        });
    }
    // Otherwise, leave the modal open for the user to select size and quantity
  };

</script>

<style lang="scss" scoped></style>