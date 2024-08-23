<template>
  <Aside @close="$emit('close')" :is-open="isOpen" type="round">
    <template v-slot:header>
      <div :class="`${baseClass}__toggle`">
        <button
          @click="selectedShoppingCart = true"
          :class="[
            `${baseClass}__button ${baseClass}__button--cart`,
            { [`${baseClass}__button--selected`]: selectedShoppingCart }
          ]"
        >
          {{ t('productAsides.cart.title') }}
        </button>
        <button
          @click="selectedShoppingCart = false"
          :class="[
            `${baseClass}__button ${baseClass}__button--whistlist`,
            { [`${baseClass}__button--selected`]: !selectedShoppingCart }
          ]"
        >
          {{ t('productAsides.whistList.title') }}
        </button>
      </div>
    </template>
    <template v-slot:default>
      <div v-if="!products.length" :class="`${baseClass}__content`">
        <img
          :class="`${baseClass}__image`"
          src="../../assets/media/images/empty.png"
          alt="Empty cart"
        />
        <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--text`">
          <h2>
            {{
              selectedShoppingCart
                ? t('productAsides.cart.empty.title')
                : t('productAsides.whistList.empty.title')
            }}
          </h2>
          <p>
            {{
              selectedShoppingCart
                ? t('productAsides.cart.empty.description')
                : t('productAsides.whistList.empty.description')
            }}
          </p>
        </div>
        <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--button`">
          <button-input
            @click="selectedShoppingCart = !selectedShoppingCart"
            :text="
              selectedShoppingCart
                ? t('productAsides.cart.button')
                : t('productAsides.whistList.button')
            "
            size="large"
          />
          <button-input
            @click="$emit('close')"
            :text="t('productAsides.action')"
            type="fill"
            size="large"
          />
        </div>
      </div>
      <div v-else-if="!selectedShoppingCart">
        <div :class="`${baseClass}__products`">
          <product-card-whist-list
            v-for="(product, index) in products"
            :key="index"
            :product="product"
          />
        </div>
      </div>
    </template>
  </Aside>
</template>

<script lang="ts" setup>
  import { PropType, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { Product } from '../../interfaces/product';

  import ButtonInput from '../inputs/button-input.component.vue';
  import ProductCardWhistList from '../product-cards/product-card-whist-list.component.vue';

  import Aside from './aside.component.vue';

  const baseClass = 'shopping-cart-aside';

  const { t } = useI18n();

  const selectedShoppingCart = ref(true);

  defineProps({
    isOpen: Boolean,
    products: {
      type: Array as PropType<Array<Product>>,
      default: () => []
    }
  });

  defineEmits(['close']);
</script>

<style lang="scss" scoped>
  .shopping-cart-aside {
    &__toggle {
      display: flex;
      justify-content: center;
      height: 5rem;
      width: 100%;
    }

    &__button {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      width: 100%;
      height: 100%;
      padding-top: 4px;
      border: none;
      background: var(--bg-transparent);
      color: var(--color-main);
      cursor: pointer;

      &--cart {
        border-top-left-radius: 50px;
      }

      &--selected {
        background: var(--bg-fill-button);
      }

      &:hover {
        background: var(--bg-fill-button-hover);
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 3rem;
      padding: 4rem;
      margin-top: 4rem;
    }

    &__image {
      border-radius: 20px;
      height: 12rem;
      width: 10rem;
    }

    &__wrapper {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      text-align: center;

      &--button {
        margin-top: 2rem;
      }
    }

    &__products {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.5rem;
    }
  }

  @media only screen and (max-width: 768px) {
    .shopping-cart-aside {
      &__button {
        &--cart {
          border-top-left-radius: 0;
        }
      }
    }
  }
</style>
