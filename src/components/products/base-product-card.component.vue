<template>
  <section :class="baseClass">
    <div :class="`${baseClass}__image`" :style="{ backgroundImage: `url(${product.imageUrl})` }" />
    <base-text :class="`${baseClass}__text`" tag="p">{{ product.name }}</base-text>
    <base-text :class="`${baseClass}__text`" tag="default">{{ product.price }} €</base-text>
  </section>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';

  import { Product } from '../../interfaces';

  import BaseText from '../base-text.component.vue';

  const baseClass = 'base-product-card';

  defineProps({
    product: {
      type: Object as PropType<Product>,
      required: true
    }
  });
</script>

<style lang="scss" scoped>
  .base-product-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;

    &__image {
      height: 16rem;
      width: 14rem;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    &__text {
      width: 14rem;
    }
  }
</style>
