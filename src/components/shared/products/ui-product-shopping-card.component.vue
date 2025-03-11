<template>
  <section v-if="product" :class="baseClass">
    <ui-image :image="product.imageUrl" type="square" />
    <div :class="`${baseClass}__content`">
      <h1 :class="`${baseClass}__text ${baseClass}__text--title`">{{ product.name }}</h1>
      <p>
        {{
          t('asides.cart.label.size') +
          ' ' +
          orderProduct.size +
          ' | ' +
          orderProduct.units +
          ' ' +
          t('asides.cart.label.units')
        }}
      </p>
      <p>{{ product.price * parseInt(orderProduct.units) + ' €' }}</p>
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--actions`">
        <ui-icon-button
          @click="$emit('delete', orderProduct.productId)"
          icon="delete"
          :class="`${baseClass}__icon ${baseClass}__icon--delete`"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { PropType, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { Product, ProductOrder } from '../../../interfaces';
  import { productService } from '../../../services';

  import UiIconButton from '../ui-icon-button.component.vue';
  import UiImage from '../ui-image.component.vue';

  const baseClass = 'ui-product-shopping-card';

  const props = defineProps({
    orderProduct: {
      type: Object as PropType<ProductOrder>,
      required: true
    }
  });

  defineEmits(['delete']);

  const { t } = useI18n();

  const product = ref<Product | undefined>();

  watch(
    () => props.orderProduct,
    async () => {
      const products: Product[] = await productService.findProductByIds([
        props.orderProduct?.productId
      ]);
      if (products.length) {
        product.value = products[0];
      }
    },
    { immediate: true, deep: true }
  );
</script>

<style lang="scss" scoped>
  .ui-product-shopping-card {
    display: flex;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid var(--color-soft);

    &__content {
      position: relative;
      width: 100%;
    }

    &__wrapper {
      display: flex;
      gap: 8px;

      &--actions {
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }

    &__text {
      &--title {
        font-weight: bold;
      }
    }

    &__icon {
      background-color: var(--color-soft);
      border-radius: 50%;
      padding: 8px;

      &--edit {
        &:hover {
          background-color: var(--color-primary);
        }
      }

      &--delete {
        &:hover {
          background-color: var(--color-red);
        }
      }
    }
  }
</style>
