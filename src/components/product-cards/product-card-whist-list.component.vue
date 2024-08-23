<template>
  <div :class="baseClass" v-if="product">
    <img
      :src="require(`../../assets/media/images/${product.image}.png`)"
      alt="Empty cart"
      :class="`${baseClass}__image`"
    />
    <icon-button
      @click="isFavorite = !isFavorite"
      :class="`${baseClass}__icon`"
      :icon="isFavorite ? 'heartSelected' : 'heart'"
      :color-attribute="isFavorite ? undefined : 'stroke'"
      size="small"
    />
    <div :class="`${baseClass}__content`">
      <p>{{ product.title }}</p>
      <p>{{ product.price }} €</p>
    </div>
    <button-input :text="t('productAsides.whistList.products.action')" size="small" />
  </div>
</template>

<script lang="ts" setup>
  import { PropType, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { Product } from '../../interfaces/product';

  import ButtonInput from '../inputs/button-input.component.vue';
  import IconButton from '../icons/icon-button.component.vue';

  const { t } = useI18n();

  const baseClass = 'product-card-whist-list';

  const props = defineProps({
    product: {
      type: Object as PropType<Product>,
      required: true
    }
  });

  const isFavorite = ref(props.product.isSelected ?? false);
</script>

<style lang="scss" scoped>
  .product-card-whist-list {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.5rem;
    margin-top: 1rem;
    width: fit-content;
    overflow: hidden;

    &__image {
      height: 10rem;
    }

    &__icon {
      position: absolute;
      right: 2px;
      top: 2px;
    }
  }
</style>
