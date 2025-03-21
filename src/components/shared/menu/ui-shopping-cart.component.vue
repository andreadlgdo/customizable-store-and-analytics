<template>
  <UiAside @click="$emit('close')" :class="baseClass" :is-open="isOpen" icon="close" fixed>
    <p :class="`${baseClass}__text ${baseClass}__text--title`">{{ t('asides.cart.title') }}</p>
    <section v-if="openOrder" :class="`${baseClass}__content`">
      <UiProductShoppingCard
        @selectFavourite="$emit('selectFavourite')"
        @delete="deleteOrderProduct"
        v-for="product in openOrder.products"
        :key="product.id"
        :order-product="product"
      />
    </section>
    <div v-if="openOrder" :class="`${baseClass}__wrapper ${baseClass}__wrapper--footer`">
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--price`">
        <p :class="`${baseClass}__text ${baseClass}__text--total`">Total</p>
        <p :class="`${baseClass}__text ${baseClass}__text--number`">{{ openOrder.total + ' €' }}</p>
      </div>
      <UiButton @click="goToOrder" :text="t('asides.cart.action')" />
    </div>
    <section v-else :class="`${baseClass}__wrapper ${baseClass}__wrapper--empty`">
      <p :class="`${baseClass}__text ${baseClass}__text--description`">
        {{ t('asides.cart.empty.description') }}
      </p>
      <UiButton @click="goToProducts" :text="t('asides.cart.empty.action')" />
    </section>
  </UiAside>
</template>

<script lang="ts" setup>
  import { watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';

  import { useCart } from '../../../composables';

  import UiProductShoppingCard from '../products/ui-product-shopping-card.component.vue';

  import UiAside from '../ui-aside.component.vue';
  import UiButton from '../ui-button.component.vue';

  const baseClass = 'ui-shopping-cart';

  const router = useRouter();
  const { t } = useI18n();
  const { openOrder, deleteProduct, loadUserOrders } = useCart();

  const props = defineProps({
    isOpen: Boolean
  });

  const emit = defineEmits(['close', 'editProduct', 'selectFavourite']);

  const goToProducts = () => {
    router.push('/products');
    emit('close');
  };

  const goToOrder = () => {
    router.push('/order');
    emit('close');
  };

  const deleteOrderProduct = async (productId: string) => {
    await deleteProduct(productId);
  };

  watch(
    () => props.isOpen,
    async () => {
      if (props.isOpen) {
        await loadUserOrders();
      }
    }
  );
</script>

<style lang="scss" scoped>
  .ui-shopping-cart {
    width: 400px;
    padding: 2rem;

    &__content {
      height: 76%;
      overflow-y: scroll;
    }

    &__wrapper {
      display: flex;

      &--footer,
      &--empty {
        flex-direction: column;
        justify-content: center;
      }

      &--footer {
        position: fixed;
        bottom: 26px;
        gap: 12px;
        width: 338px;
      }

      &--empty {
        gap: 2rem;
        height: 84%;
      }

      &--price {
        justify-content: space-between;
        align-items: center;
        padding: 0 11px;
      }
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
        padding-bottom: 2rem;
      }

      &--description {
        font-size: 16px;
        font-weight: lighter;
        text-align: center;
      }
    }
  }
</style>
