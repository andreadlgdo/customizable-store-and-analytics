<template>
    <div :class="`${baseClass}__header`">
        <p :class="`${baseClass}__title`">{{ title }}</p>
        <div :class="`${baseClass}__see-all`">  
          <p :class="`${baseClass}__text ${baseClass}__text--see-all`">Ver todo</p>
          <UiIconButton icon="go-to" size="small" />
        </div>
    </div>
    <div :class="`${baseClass}__carrousel`">
        <div v-for="product in products" :key="product._id" :class="`${baseClass}__product`">
            <UiImage :image="product.imageUrl" type="semi-round" size="large" />
            <p :class="`${baseClass}__text ${baseClass}__text--name`">{{ product.name }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

import { Product } from '../../../interfaces';

import UiIconButton from '../ui-icon-button.component.vue';
import UiImage from '../ui-image.component.vue';

const baseClass = 'ui-product-carrousel';

defineProps({
  title: String,
  products: {
    type: Array as PropType<Product[]>,
    required: true
  }
});
</script>

<style lang="scss" scoped>
.ui-product-carrousel {
  &__header {
    display: flex;
    justify-content: space-between;
    margin-left: 2rem;
    margin-top: 2rem;
    margin-right: 2rem;
  }

  &__title {
    font-size: 1.3rem;
    font-weight: bold;
  }


  &__see-all {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  &__carrousel {
    display: flex;
    overflow-x: scroll;
    gap: 1rem;
    padding: 2rem;
  }

  &__product {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-4px);
    }
  }

  &__text {
      align-self: center;

      &--name {
          font-weight: 600;
      }

      &--see-all {
          &:hover {
              font-weight: bold;
          }
      }
  }
}
</style>