<template>
  <div :class="baseClass">
    <p v-if="hasRecommendations" :class="`${baseClass}__title`">- RECOMENDACIONES -</p>
    <div v-if="recommendedProductsByOrders?.length">
      <UiProductCarrousel title="Basado en tus últimas compras" :products="recommendedProductsByOrders" />
    </div>
    <div v-if="recommendedProductsByFavourites?.length">
      <UiProductCarrousel title="Inspirado en tus favoritos" :products="recommendedProductsByFavourites" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { Product } from '../../interfaces';

import UiProductCarrousel from '../shared/products/ui-product-carrousel.component.vue';

const baseClass = 'home-recommendations';

const props = defineProps<{
    recommendedProductsByOrders?: Product[];
    recommendedProductsByFavourites?: Product[];
}>();

const hasRecommendations = computed(() =>
  props.recommendedProductsByOrders?.length || props.recommendedProductsByFavourites?.length
);
</script>

<style lang="scss" scoped>
.home-recommendations {
  &__title {
    text-align: center;
    font-size: 2.3rem;
    font-weight: bold;
    margin-top: 2rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
}
</style> 