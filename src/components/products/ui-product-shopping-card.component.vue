<template>
  <section v-if="product" :class="baseClass">
    <UiImage :image="product.imageUrl" type="square" />
    <div :class="`${baseClass}__content`">
      <h1 :class="`${baseClass}__text ${baseClass}__text--title`">{{ product.name }}</h1>
      <p>
        {{
          t('asides.cart.label.size') +
          ' ' +
          (product.isUniqueSize ? t('asides.cart.label.unique') : orderProduct.size) +
          ' | ' +
          orderProduct.units +
          ' ' +
          t('asides.cart.label.units')
        }}
      </p>
      <p>
        {{ (product.priceWithDiscount ?? product.price) * parseInt(orderProduct.units) + ' €' }}
      </p>
      <div v-if="showActions" :class="`${baseClass}__wrapper ${baseClass}__wrapper--actions`">
        <UiIconButton
          @click="selectFavourite"
          :icon="isFavourite ? 'heartSelected' : 'heart'"
          :class="[
            `${baseClass}__icon ${baseClass}__icon--heart`,
            { [`${baseClass}__icon--heart-selected`]: isFavourite }
          ]"
        />
        <UiIconButton
          @click="$emit('delete', orderProduct.id || orderProduct.productId)"
          icon="delete"
          :class="`${baseClass}__icon ${baseClass}__icon--delete`"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { onMounted, PropType, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { useUsers } from '@/composables';
  import { Product, ProductOrder } from '@/interfaces';
  import { customService, productService } from '@/services';

  import UiIconButton from '@/components/shared/ui-icon-button.component.vue';
  import UiImage from '@/components/shared/ui-image.component.vue';

  const baseClass = 'ui-product-shopping-card';

  const props = defineProps({
    orderProduct: {
      type: Object as PropType<ProductOrder>,
      required: true
    },
    showActions: {
      type: Boolean,
      default: true
    },
    isPreview: Boolean,
    customColors: {
      type: Object,
      default: undefined
    }
  });

  const emit = defineEmits(['delete', 'selectFavourite']);

  const { t } = useI18n();
  const { user } = useUsers();

  const product = ref<Product | undefined>();

  const isFavourite = ref(
    product.value?.isFavouriteUsersIds?.includes(user.value?._id ?? '') || false
  );

  const customProductShoppingCard = ref();

  const findProduct = async () => {
    const products: Product[] = await productService.findProductByIds([
      props.orderProduct?.productId
    ]);
    if (products.length) {
      product.value = products[0];
    }
  };

  const selectFavourite = async () => {
    if (props.isPreview) return;
    if (product.value && user.value) {
      isFavourite.value = !isFavourite.value;

      const updateProduct: Product = {
        ...product.value,
        isFavouriteUsersIds: isFavourite.value
          ? [...(product.value.isFavouriteUsersIds ?? []), user.value._id ?? '']
          : product.value.isFavouriteUsersIds?.filter(favourite => favourite !== user.value?._id)
      };

      await productService.updateProduct(updateProduct);
    } else {
      const localFavouritesProductsIds = JSON.parse(
        localStorage.getItem('favouriteProducts') || '[]'
      ) as string[];

      const productId = product.value?._id ?? '';

      if (productId) {
        const index = localFavouritesProductsIds.indexOf(productId);
        if (index !== -1) {
          localFavouritesProductsIds.splice(index, 1);
          isFavourite.value = false;
        } else {
          localFavouritesProductsIds.push(productId);
          isFavourite.value = true;
        }

        localStorage.setItem('favouriteProducts', JSON.stringify(localFavouritesProductsIds));
      }
    }
    emit('selectFavourite');
  };

  watch(
    () => props.orderProduct,
    async () => await findProduct(),
    { immediate: true, deep: true }
  );

  onMounted(async () => {
    await findProduct();
    if (props.isPreview) {
      customProductShoppingCard.value = props.customColors
    } else {
      const customVisuals =await customService.getCustomVisuals('cart-aside')
      customProductShoppingCard.value = customVisuals.colors;
    }
    if (product.value && user.value) {
      isFavourite.value =
        product.value?.isFavouriteUsersIds?.includes(user.value._id ?? '') || false;
    } else {
      const localFavouritesProductsIds = JSON.parse(
        localStorage.getItem('favouriteProducts') || '[]'
      ) as string[];

      isFavourite.value = localFavouritesProductsIds.includes(product.value?._id ?? '');
    }
  });
</script>

<style lang="scss" scoped>
  .ui-product-shopping-card {
    display: flex;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid var(--color-soft);

    &__content {
      position: relative;
      width: 100%;
    }

    &__wrapper {
      display: flex;
      gap: 8px;

      &--actions {
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }

    &__text {
      &--title {
        font-weight: bold;
      }
    }

    &__icon {
      background-color: var(--color-soft);
      border-radius: 50%;
      padding: 8px;

      &--heart {
        &:hover {
          background-color: v-bind('customProductShoppingCard?.order.icon.favourite');
        }
      }

      &--heart-selected {
        background-color: v-bind('customProductShoppingCard?.order.icon.favourite');

        &:hover {
          background-color: v-bind('customProductShoppingCard?.order.icon.favourite');
        }
      }

      &--delete {
        &:hover {
          background-color: v-bind('customProductShoppingCard?.order.icon.delete');
        }
      }
    }
  }
</style>
