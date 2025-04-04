<template>
  <section :class="baseClass">
    <div :class="`${baseClass}__image`">
      <UiImage :image="product.imageUrl" type="square" size="large" />
      <UiIconButton
        @click="$emit('selectFavourite', !isSelected, product)"
        :icon="isSelected ? 'heartSelected' : 'heart'"
        size="small"
        :class="` ${baseClass}__icon`"
      />
    </div>
    <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--column`">
      <p>{{ product.name }}</p>
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
        <p
          :class="[
            `${baseClass}__text`,
            { [`${baseClass}__text--have-discount`]: product.priceWithDiscount }
          ]"
        >
          {{ product.price + ' €' }}
        </p>
        <p
          v-if="product.priceWithDiscount"
          :class="`${baseClass}__text ${baseClass}__text--discount `"
        >
          {{ product.priceWithDiscount + ' €' }}
        </p>
        <UiButton
          v-if="haveStock"
          @click="$emit('addToCart', product)"
          icon="cart"
          size="small"
          :text="t('products.card.action')"
          transparent
        />
        <p v-else :class="`${baseClass}__text ${baseClass}__text--stock`">Out of stock</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { computed, PropType, ref, watch } from 'vue';
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

  const haveStock = computed(() =>
    props.product?.isUniqueSize
      ? props.product?.uniqueStock
      : props.product.stock?.reduce((acc, stock) => acc + stock.quantity, 0)
  );

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

    &__text {
      &--stock,
      &--discount {
        font-size: 16px;
        font-weight: bold;
        color: var(--color-red);
      }

      &--have-discount {
        text-decoration: line-through;
      }
    }
  }
</style>
