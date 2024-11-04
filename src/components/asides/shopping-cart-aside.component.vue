<template>
  <base-aside @close="$emit('close')" :is-open="isOpen" type="round">
    <template v-slot:default>
      <div
        v-if="
          (selectedShoppingCart && !cartProducts.length) ||
          (!selectedShoppingCart && !whistListProducts.length)
        "
        :class="`${baseClass}__content`"
      ></div>
      <div
        v-else-if="!selectedShoppingCart"
        :class="`${baseClass}__products ${baseClass}__products--whistList`"
      >
        <product-card-whistlist
          @updateProduct="$emit('updateProduct', $event)"
          v-for="(product, index) in whistListProducts"
          :key="index"
          :product="product"
        />
      </div>
      <div v-else :class="`${baseClass}__products ${baseClass}__products--cart`">
        <product-card-shopping-cart
          @updateProduct="$emit('updateProduct', $event)"
          v-for="(product, index) in cartProducts"
          :key="index"
          :product="product"
        />
        <div :class="`${baseClass}__discount`">
          <div :class="`${baseClass}__label`">
            <svg-icon
              :src="require('../../assets/media/icons/discount.svg')"
              color-attribute="fill"
            />
            <input
              :class="`${baseClass}__input`"
              type="text"
              :placeholder="t('productAsides.cart.products.discount')"
            />
          </div>
          <!-- TO DO: Check if is valid the promo code -->
          <icon-button icon="arrow" color-attribute="fill" />
        </div>
        <hr />
        <div :class="`${baseClass}__footer`">
          <button-input
            @click="$emit('close')"
            :text="t('productAsides.cart.products.buttons.buy')"
            size="small"
          />
          <button-input
            :text="t('productAsides.cart.products.buttons.pay')"
            type="fill"
            size="small"
          />
        </div>
      </div>
    </template>
  </base-aside>
</template>

<script lang="ts" setup>
  import { PropType, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { Product } from '../../interfaces';

  import { IconButton, SvgIcon } from '../icons';
  import { ButtonInput } from '../inputs';
  import { ProductCardShoppingCart, ProductCardWhistlist } from '../product-cards';

  import BaseAside from './base-aside.component.vue';

  const baseClass = 'shopping-cart-aside';

  const { t } = useI18n();

  const selectedShoppingCart = ref(true);

  defineProps({
    isOpen: Boolean,
    whistListProducts: {
      type: Array as PropType<Array<Product>>,
      default: () => []
    },
    cartProducts: {
      type: Array as PropType<Array<Product>>,
      default: () => []
    }
  });

  defineEmits(['close', 'updateProduct']);
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
      &--whistList {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.5rem;
        margin-bottom: 2rem;
      }
    }

    &__discount {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 1rem;
    }

    &__input {
      height: 2rem;
      width: 18rem;
      border: none;
      outline: none;
      background: var(--bg-main);
    }

    &__label {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    &__footer {
      position: sticky;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      height: 6rem;
      margin-top: 2rem;
      background: var(--bg-main);
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
