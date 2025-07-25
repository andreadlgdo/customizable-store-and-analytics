<template>
  <UiAside @click="$emit('close')" :class="baseClass" :is-open="isOpen" icon="close" fixed>
    <p :class="`${baseClass}__text ${baseClass}__text--title`">{{ t('asides.whistList.title') }}</p>
    <section v-if="products.length" :class="`${baseClass}__content`">
      <div v-for="product in products" :key="product._id" :class="`${baseClass}__card`">
        <div :class="`${baseClass}__image`">
          <UiImage :image="product.imageUrl" type="square" />
          <UiIconButton
            @click="selectFavourite(product)"
            icon="heartSelected"
            size="small"
            :class="`${baseClass}__icon`"
          />
        </div>
        <div :class="`${baseClass}__info`">
          <p :class="`${baseClass}__text ${baseClass}__text--name`">{{ product.name }}</p>
          <p :class="`${baseClass}__text ${baseClass}__text--price`">
            {{ (product.priceWithDiscount ?? product.price) + ' €' }}
          </p>
        </div>
        <UiButton
          @click="emit('addToCart', product)"
          :text="t('asides.whistList.action')"
          transparent
        />
      </div>
    </section>
    <div v-if="products.length && recommendedProductsByFavourites.length">
      <UiProductCarrousel title="Productos que podrían gustarte" :products="recommendedProductsByFavourites" size="small" />
     </div>
    <section v-else-if="!products.length" :class="`${baseClass}__wrapper`">
      <p :class="`${baseClass}__text ${baseClass}__text--description`">
        {{ t('asides.whistList.empty.description') }}
      </p>
      <UiButton @click="goToProducts" :text="t('asides.whistList.empty.action')" />
    </section>
  </UiAside>
</template>

<script lang="ts" setup>
  import { watch, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';

  import { useRecommendations, useUsers } from '@/composables';
  import { Product } from '@/interfaces';
  import { productService } from '@/services';

  import UiAside from '@/components/shared/ui-aside.component.vue';
  import UiImage from '@/components/shared/ui-image.component.vue';
  import UiIconButton from '@/components/shared/ui-icon-button.component.vue';
  import UiButton from '@/components/shared/ui-button.component.vue';
  import UiProductCarrousel from '@/components/products/ui-product-carrousel.component.vue';

  const baseClass = 'ui-whist-list';

  const { t } = useI18n();
  const { getTopFavouritesCategories } = useRecommendations();
  const router = useRouter();
  const { user } = useUsers();
  
  const props = defineProps({
    isOpen: Boolean
  });

  const emit = defineEmits(['close', 'selectFavourite', 'addToCart']);

  const products = ref<Product[]>([]);
  const recommendedProductsByFavourites = ref<Product[]>([]);
  
  const goToProducts = () => {
    router.push('/products');
    emit('close');
  };

  const selectFavourite = async (product: Product) => {
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
    
    // Reload recommendations when products change
    await reloadRecommendations();
    
    emit('selectFavourite');
  };

  // Function to reload recommendations
  const reloadRecommendations = async () => {
    const topFavouritesCategories = await getTopFavouritesCategories(user.value?._id ?? '');
    recommendedProductsByFavourites.value = await productService.getCategoriesWithProductCount(topFavouritesCategories, 5);
  };

  watch(
    () => props.isOpen,
    async isOpen => {
      if (isOpen) {
        const localFavouritesProductsIds = JSON.parse(
          localStorage.getItem('favouriteProducts') || '[]'
        ) as string[];

        products.value = user.value?._id
          ? await productService.findProductByUserId(user.value._id)
          : await productService.findProductByIds(localFavouritesProductsIds);

        await reloadRecommendations();
      }
    },
    { immediate: true }
  );

  // Watch for changes in products to reload recommendations
  watch(
    () => products.value.length,
    async () => {
      if (props.isOpen) {
        await reloadRecommendations();
      }
    }
  );
</script>

<style lang="scss" scoped>
  .ui-whist-list {
    width: 400px;
    padding: 2rem;

    &__content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      max-height: 90%;
      overflow-y: scroll;
    }

    &__card {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 2rem;
      height: 84%;
    }

    &__text {
      &--title {
        font-size: 32px;
        font-weight: bold;
        padding-bottom: 2rem;
      }

      &--description {
        font-size: 16px;
        text-align: center;
      }

      &--name {
        font-size: 14px;
      }

      &--price {
        font-size: 14px;
        font-weight: bold;
      }
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

    &__info {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 8px 0;
    }
  }
</style>
