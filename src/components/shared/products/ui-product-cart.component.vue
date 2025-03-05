<template>
  <section :class="baseClass">
    <div :class="`${baseClass}__image`">
      <ui-image :image="product.imageUrl" type="square" size="large" />
      <ui-icon-button
        @click="selectFavourite"
        :icon="isSelected ? 'heartSelected' : 'heart'"
        size="small"
        :class="` ${baseClass}__icon`"
      />
    </div>
    <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--column`">
      <p>{{ product.name }}</p>
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
        <p>{{ product.price + ' €' }}</p>
        <ui-button icon="cart" size="small" text="Add" transparent />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { PropType, ref, watch } from 'vue';

  import { useUsers } from '../../../composables';
  import { Product } from '../../../interfaces';
  import { productService } from '../../../services';

  import UiButton from '../ui-button.component.vue';
  import UiImage from '../ui-image.component.vue';
  import UiIconButton from '../ui-icon-button.component.vue';

  const baseClass = 'ui-product-cart';

  const { user } = useUsers();

  const props = defineProps({
    product: {
      type: Object as PropType<Product>,
      required: true
    }
  });

  const emit = defineEmits(['selectFavourite']);

  const isSelected = ref(false);

  const selectFavourite = async () => {
    isSelected.value = !isSelected.value;

    if (user.value && user.value._id && props.product?._id) {
      const updateProduct: Product = {
        ...props.product,
        isFavouriteUsersIds: isSelected.value
          ? [...(props.product.isFavouriteUsersIds ?? []), user.value._id]
          : props.product.isFavouriteUsersIds?.filter(favourite => favourite !== user.value?._id)
      };

      await productService.updateProduct(updateProduct);
    } else if (props.product?._id) {
      const localFavouritesProductsIds = JSON.parse(
        localStorage.getItem('favouriteProducts') || '[]'
      ) as string[];
      if (isSelected.value) {
        if (!localFavouritesProductsIds.includes(props.product._id)) {
          localFavouritesProductsIds.push(props.product._id);
        }
      } else {
        const index = localFavouritesProductsIds.indexOf(props.product._id);
        if (index !== -1) {
          localFavouritesProductsIds.splice(index, 1);
        }
      }

      localStorage.setItem('favouriteProducts', JSON.stringify(localFavouritesProductsIds));
    }

    emit('selectFavourite');
  };

  watch(
    () => props.product,
    () => {
      if (user.value?._id) {
        isSelected.value = !!props.product?.isFavouriteUsersIds?.find(
          userId => userId === user.value?._id
        );
      } else {
        const localFavouritesProductsIds = JSON.parse(
          localStorage.getItem('favouriteProducts') || '[]'
        ) as string[];

        isSelected.value = !!localFavouritesProductsIds.find(id => id === props.product?._id);
      }
    },
    { immediate: true }
  );
</script>

<style lang="scss" scoped>
  .ui-product-cart {
    box-shadow: var(--shadow-section);

    &__image {
      position: relative;
    }

    &__wrapper {
      display: flex;

      &--column {
        flex-direction: column;
        padding: 1rem;
        gap: 12px;
      }

      &--row {
        justify-content: space-between;
        align-items: center;
      }
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
  }
</style>
