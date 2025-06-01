<template>
    <div :class="baseClass">
        <div :class="`${baseClass}__left-section`">
            <p>Carrito vacío</p>
            <div :class="`${baseClass}__wrapper`">
                <p :class="`${baseClass}__text ${baseClass}__text--title`">
                    {{ custom.texts.title }}
                </p>
                <div :class="`${baseClass}__content`">
                    <p :class="`${baseClass}__text ${baseClass}__text--description`">
                        {{ custom.texts.empty.description }}
                    </p>
                    <UiButton :text="custom.texts.empty.action" :class="`${baseClass}__button`" :background-color="custom.visuals.colors.empty.button"/>
                </div>
            </div>
        </div>
        <div :class="`${baseClass}__right-section`">
            <p>Carrito con productos</p>
            <div :class="`${baseClass}__wrapper`">
                <p :class="`${baseClass}__text ${baseClass}__text--title`">
                    {{ custom.texts.title }}
                </p>
                <div :class="`${baseClass}__products`">
                    <UiProductShoppingCard :order-product="product" isPreview :custom-colors="custom.visuals.colors"></UiProductShoppingCard>
                </div>
                <div :class="`${baseClass}__footer`">
                    <div :class="`${baseClass}__price`">
                        <p :class="`${baseClass}__text ${baseClass}__text--total`">{{ custom.texts.order.totalPrice }}</p>
                        <p :class="`${baseClass}__text ${baseClass}__text--number`">{{ '10€' }}</p>
                    </div>
                    <UiButton :text="custom.texts.order.action" :class="`${baseClass}__button`" :background-color="custom.visuals.colors.order.button"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CartAsideCustom } from '../../../../types/cart.type';
import { ProductOrder } from '../../../../interfaces';

import UiProductShoppingCard from '../../../shared/products/ui-product-shopping-card.component.vue';

import UiButton from '../../../shared/ui-button.component.vue';

const baseClass = 'ui-cart-aside-preview';

const product: ProductOrder = {
    "productId": "67b8ab6fb4cd3f0af235f251",
    "units": "1",
    "size": "M"
}

defineProps<{
    custom: CartAsideCustom;
}>();
</script>

<style lang="scss" scoped>
.ui-cart-aside-preview {
    display: flex;
    gap: 2rem;
    width: 100%;
    height: 100%;

    @media (max-width: 1440px) {
        flex-direction: column;
        overflow-y: scroll;
    }

    &__left-section,
    &__right-section {
        flex: 1;
        min-width: 0;
    }

    &__wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        min-height: 92%;
        width: 400px;
        padding: 2rem;
        margin-top: 1rem;
        border: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        border-radius: 8px;

        @media (max-width: 1440px) {
            min-height: 34rem;
        }
    }

    &__content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        width: 100%;
        flex: 1;
    }

    &__products {
        width: 100%;
        height: calc(100% - 200px);
        overflow-y: auto;
        margin-top: 1rem;
    }

    &__footer {
        position: absolute;
        bottom: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 12px;
        width: calc(100% - 4rem);
    }

    &__price {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 11px;
    }

    &__text {
        font-weight: bold;

        &--total {
            font-size: 18px;
        }

        &--number {
            font-size: 22px;
        }

        &--title {
            font-size: 32px;
            align-self: flex-start;
            width: 100%;
        }

        &--description {
            font-size: 16px;
            font-weight: lighter;
            text-align: center;
        }
    }

    &__button {
        pointer-events: none;
    }
}
</style>