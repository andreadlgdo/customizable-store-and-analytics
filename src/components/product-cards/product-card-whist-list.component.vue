<template>
  <div :class="baseClass" v-if="product">
    <img
      :src="require(`../../assets/media/images/${product.image}.png`)"
      alt="Empty cart"
      :class="`${baseClass}__image`"
    />
    <icon-button
      @click="updateProduct"
      :class="`${baseClass}__icon`"
      :icon="isFavorite ? 'heartSelected' : 'heart'"
      :color-attribute="isFavorite ? undefined : 'stroke'"
      size="small"
    />
    <div :class="`${baseClass}__content`">
      <p>{{ product.title }}</p>
      <p>{{ product.price }} €</p>
    </div>
    <button-input :text="t('productAsides.whistList.products.action')" size="mini" />
  </div>
</template>

<script lang="ts" setup>
  import { computed, PropType } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { Product } from '../../interfaces';

  import { IconButton } from '../icons';
  import { ButtonInput } from '../inputs';

  const { t } = useI18n();

  const baseClass = 'product-card-whist-list';

  const props = defineProps({
    product: {
      type: Object as PropType<Product>,
      required: true
    }
  });

  const emit = defineEmits(['updateProduct']);

  const isFavorite = computed(() => props.product?.isFavorite ?? false);

  const product = computed(() => props.product);
  const updateProduct = () => {
    product.value.isFavorite = !product.value.isFavorite;
    emit('updateProduct', product.value);
  };
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
