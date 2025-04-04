<template>
  <dashboard :selected-item="menuElements[2]">
    <div :class="baseClass">
      <h1 :class="`${baseClass}__text ${baseClass}__text--title`">
        {{ t('dashboard.whistList.title') }}
      </h1>
      <section v-if="products.length" :class="`${baseClass}__wrapper`">
        <div v-for="product in products" :key="product._id">
          <div :class="`${baseClass}__image`">
            <UiImage :image="product.imageUrl" type="square" size="large" />
            <UiIconButton
              @click="deselectFavourite(product)"
              icon="heartSelected"
              size="small"
              :class="`${baseClass}__icon`"
            />
          </div>
          <UiButton
            @click="productDetails = product"
            :text="t('dashboard.whistList.action.add')"
            transparent
            :class="`${baseClass}__button`"
          />
        </div>
      </section>
      <section v-else>
        <p>{{ t('dashboard.whistList.empty') }}</p>
      </section>
      <ui-product-details-modal
        @addToCart="router.push({ name: 'UserCart' })"
        @selectFavourite="deselectFavourite(productDetails)"
        @close="productDetails = undefined"
        :is-open="!!productDetails"
        :product="productDetails"
        :is-favourite="productDetails?.isFavouriteUsersIds?.includes(user?._id)"
      />
    </div>
  </dashboard>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';

  import UiProductDetailsModal from '../../components/shared/products/ui-product-details-modal.component.vue';
  import UiImage from '../../components/shared/ui-image.component.vue';
  import UiIconButton from '../../components/shared/ui-icon-button.component.vue';
  import UiButton from '../../components/shared/ui-button.component.vue';

  import { useUserMenu, useUsers } from '../../composables';
  import { Product } from '../../interfaces';
  import { productService } from '../../services';

  import Dashboard from './dashboard.view.vue';
  import { useI18n } from 'vue-i18n';

  const baseClass = 'user-whist-list';

  const { menuElements } = useUserMenu();
  const { user } = useUsers();
  const router = useRouter();
  const { t } = useI18n();

  const products = ref<Product[]>([]);
  const productDetails = ref<Product | undefined>(undefined);

  const deselectFavourite = async (product: Product) => {
    if (user.value && user.value._id) {
      const updateProduct: Product = {
        ...product,
        isFavouriteUsersIds: product.isFavouriteUsersIds?.filter(
          favourite => favourite !== user.value?._id
        )
      };

      await productService.updateProduct(updateProduct);
      products.value = await productService.findProductByUserId(user.value._id);
    } else {
      const localFavouritesProductsIds = JSON.parse(
        localStorage.getItem('favouriteProducts') || '[]'
      ) as string[];

      const index = localFavouritesProductsIds.indexOf(product._id ?? '');
      if (index !== -1) {
        localFavouritesProductsIds.splice(index, 1);
      }

      localStorage.setItem('favouriteProducts', JSON.stringify(localFavouritesProductsIds));
      products.value = await productService.findProductByIds(localFavouritesProductsIds);
    }
  };

  onMounted(async () => {
    const localFavouritesProductsIds = JSON.parse(
      localStorage.getItem('favouriteProducts') || '[]'
    ) as string[];

    products.value = user.value?._id
      ? await productService.findProductByUserId(user.value._id)
      : await productService.findProductByIds(localFavouritesProductsIds);
  });
</script>

<style lang="scss" scoped>
  .user-whist-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 2rem;
    width: 100%;

    &__text {
      font-weight: bold;

      &--title {
        padding-bottom: 1rem;
      }
    }

    &__wrapper {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }

    &__image {
      position: relative;
    }

    &__icon {
      position: absolute;
      top: 8px;
      right: 8px;
      padding: 8px;
      border-radius: 50px;

      &:hover {
        background-color: var(--bg-red);
      }
    }

    &__button {
      width: 100%;
      margin-top: 0.5rem;
    }
  }
</style>
