<template>
  <section :class="baseClass">
    <div :class="`${baseClass}__image`">
      <ui-image :image="product.imageUrl" type="square" size="large" />
      <ui-icon-button
        @click="$emit('selectFavourite', !isSelected, product)"
        :icon="isSelected ? 'heartSelected' : 'heart'"
        size="small"
        :class="` ${baseClass}__icon`"
      />
    </div>
    <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--column`">
      <p>{{ product.name }}</p>
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
        <p>{{ product.price + ' €' }}</p>
        <ui-button
          @click="$emit('addToCart', product)"
          icon="cart"
          size="small"
          :text="t('products.card.action')"
          transparent
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { PropType, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { useUsers } from '../../../composables';
  import { Product } from '../../../interfaces';

  import UiButton from '../ui-button.component.vue';
  import UiImage from '../ui-image.component.vue';
  import UiIconButton from '../ui-icon-button.component.vue';

  const baseClass = 'ui-product-cart';

  const props = defineProps({
    product: {
      type: Object as PropType<Product>,
      required: true
    },
    isFavourite: Boolean
  });

  defineEmits(['selectFavourite', 'addToCart']);

  const { user } = useUsers();
  const { t } = useI18n();

  const isSelected = ref(props.isFavourite);

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
