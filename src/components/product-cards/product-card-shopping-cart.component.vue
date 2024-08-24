<template>
  <div :class="baseClass" v-if="product">
    <img
      :src="require(`../../assets/media/images/${product.image}.png`)"
      alt="Empty cart"
      :class="`${baseClass}__image`"
    />
    <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--content`">
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--text`">
        <p>{{ product.title }}</p>
        <p>{{ product.price }} €</p>
        <!-- TO DO: Los atributos tendran que cambiarse -->
        <p>{{ product.quantity }} ud | Atributo 1 | Atributo 2</p>
      </div>
      <div :class="[baseClass, `${baseClass}__button`]">
        <icon-button
          @click="isFavorite = !isFavorite"
          :class="{ [`${baseClass}__icon--selected`]: isFavorite }"
          :icon="isFavorite ? 'heartSelected' : 'heart'"
          :color-attribute="isFavorite ? undefined : 'stroke'"
          have-border
        />
        <icon-button icon="edit" color-attribute="fill" have-border />
        <icon-button icon="delete" color-attribute="stroke" have-border />
      </div>
    </div>
  </div>
  <hr />
</template>

<script lang="ts" setup>
  import { PropType, ref } from 'vue';

  import { Product } from '../../interfaces/product';

  import IconButton from '../icons/icon-button.component.vue';

  const baseClass = 'product-card-shopping-cart';

  const props = defineProps({
    product: {
      type: Object as PropType<Product>,
      required: true
    }
  });

  const isFavorite = ref(props.product?.isSelected ?? false);
</script>

<style lang="scss" scoped>
  .product-card-shopping-cart {
    display: flex;
    gap: 0.5rem;
    margin: 1rem 1rem;

    &__button {
      align-self: flex-end;
    }

    &__wrapper {
      display: flex;
      flex-direction: column;

      &--content {
        justify-content: space-between;
        width: 100%;
      }

      &--text {
        gap: 0.5rem;
        margin-top: 6px;
      }
    }

    &__image {
      height: 10rem;
    }

    &__icon {
      &--selected {
        border-color: red;

        &:hover {
          border-color: red;
          background-color: #ffbebe;
        }
      }
    }
  }
</style>
