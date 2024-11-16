<template>
  <section :class="baseClass">
    <div :class="`${baseClass}__header`">
      <base-text tag="h3">{{ label.toUpperCase() }}</base-text>
      <base-text tag="p" :class="`${baseClass}__text ${baseClass}__text--see-all `">
        {{ t('landing.carousel.seeAll') }}
        <icon-button icon="go-to" size="small" />
      </base-text>
    </div>
    <div :class="`${baseClass}__content`">
      <section v-for="product in products" :key="product._id" :class="`${baseClass}__product`">
        <div
          :class="`${baseClass}__image`"
          :style="{ backgroundImage: `url(${product?.imageUrl})` }"
        ></div>
        <div :class="`${baseClass}__description`">
          <base-text tag="p" :class="`${baseClass}__text ${baseClass}__text--name `">
            {{ product.name }}
          </base-text>
          <base-text tag="default">{{ product.price + '€' }}</base-text>
        </div>
      </section>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { Product } from '../../interfaces';

  import BaseText from '../base-text.component.vue';
  import { IconButton } from '../icons';

  const baseClass = 'product-carousel';

  defineProps({
    label: {
      type: String,
      required: true
    },
    products: {
      type: Array as PropType<Product[]>,
      required: true
    }
  });

  const { t } = useI18n();
</script>

<style lang="scss" scoped>
  .product-carousel {
    &__header {
      display: flex;
      justify-content: space-between;
      padding: 2rem;
    }

    &__content {
      display: flex;
      gap: 2rem;
      padding: 0 2rem 1rem 2rem;
      overflow-x: scroll;
    }

    &__product {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    &__image {
      height: 16rem;
      width: 14rem;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      cursor: pointer;
    }

    &__description {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }

    &__text {
      &--see-all {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        cursor: pointer;

        &:hover {
          font-weight: bold;
        }
      }

      &--name {
        font-weight: bold;
      }
    }
  }
</style>
