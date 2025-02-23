<template>
  <section :class="baseClass">
    <div :class="`${baseClass}__image`">
      <ui-image :image="product.imageUrl" type="square" size="large" />
      <ui-icon-button
        @click="isSelected = !isSelected"
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
  import { PropType, ref } from 'vue';

  import { Product } from '../../../interfaces';

  import UiButton from '../ui-button.component.vue';
  import UiImage from '../ui-image.component.vue';
  import UiIconButton from '../ui-icon-button.component.vue';

  const baseClass = 'ui-product-cart';

  defineProps({
    product: {
      type: Object as PropType<Product>,
      required: true
    }
  });

  const isSelected = ref(false);
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
