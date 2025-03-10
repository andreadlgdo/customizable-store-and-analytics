<template>
  <ui-aside @click="$emit('close')" :class="baseClass" :is-open="isOpen" icon="close" fixed>
    <p :class="`${baseClass}__text ${baseClass}__text--title`">{{ t('asides.cart.title') }}</p>
    <section v-if="openOrder" :class="`${baseClass}__content`">
      <ui-product-shopping-card
        @delete="deleteOrderProduct"
        v-for="product in openOrder.products"
        :key="product.id"
        :order-product="product"
      />
    </section>
    <section v-else :class="`${baseClass}__wrapper`">
      <p :class="`${baseClass}__text ${baseClass}__text--description`">
        {{ t('asides.cart.empty.description') }}
      </p>
      <ui-button @click="goToProducts" :text="t('asides.cart.empty.action')" />
    </section>
  </ui-aside>
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

  const emit = defineEmits(['close', 'editProduct']);

  const goToProducts = () => {
    router.push('/products');
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

    &__wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 2rem;
      height: 84%;
    }

    &__text {
      &--title {
        font-size: 32px;
        font-weight: bold;
        padding-bottom: 2rem;
      }

      &--description {
        font-size: 16px;
        text-align: center;
      }
    }
  }
</style>
