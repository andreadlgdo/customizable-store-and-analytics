<template>
    <div :class="`${baseClass}__header ${baseClass}__header--${size}`">
      <h2 :class="`${baseClass}__title`">{{ title }}</h2>
    </div>
    <div :class="`${baseClass}__carrousel ${baseClass}__carrousel--${size}`">
        <div @click="clickProduct(product)" v-for="product in shuffledProducts" :key="product._id" :class="`${baseClass}__product`">
            <UiImage :image="product.imageUrl" type="semi-round" :size="size" />
            <p :class="`${baseClass}__text ${baseClass}__text--name`">{{ product.name }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { PropType, computed } from 'vue';
import { useRouter } from 'vue-router';

import { Product } from '@/interfaces';

import UiImage from '@/components/shared/ui-image.component.vue';
import { useProductViews } from '@/composables/use-product-views';
import { useUsers } from '@/composables';

const baseClass = 'ui-product-carrousel';

const props = defineProps({
  title: String,
  products: {
    type: Array as PropType<Product[]>,
    required: true
  },
  size: {
    type: String as PropType<'small' | 'normal' | 'large'>,
    default: 'large'
  }
});

const router = useRouter();
const { user } = useUsers();
const { createProductView } = useProductViews();

const shuffledProducts = computed(() => {
  const shuffled = [...props.products];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
});

const clickProduct = async (product: Product) => {
  const userId = user.value && user.value._id ? user.value._id : 'no user'; 
  await createProductView({
    userId,
    productId: product._id ?? '',
    timestamp: new Date()
  });

  router.push(`/products/${product._id}`);
};
</script>

<style lang="scss" scoped>
.ui-product-carrousel {
  &__header {
    display: flex;
    justify-content: space-between;
    margin-left: 2rem;
    margin-top: 2rem;
    margin-right: 2rem;
    width: 100%;

    &--small {
      margin-left: 0;
    }
  }

  &__title {
    font-size: 1.3rem;
    font-weight: bold;
  }

  &__carrousel {
    display: flex;
    overflow-x: scroll;
    gap: 1rem;
    padding: 1rem 2rem 2rem 2rem;
    width: 100%;

    &--small {
      padding-left: 0;
      padding-right: 0;
    }
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