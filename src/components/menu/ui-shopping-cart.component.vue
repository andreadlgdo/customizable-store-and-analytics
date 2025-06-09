<template>
  <UiAside @click="$emit('close')" :class="baseClass" :is-open="isOpen" icon="close" fixed>
    <p :class="`${baseClass}__text ${baseClass}__text--title`">{{ uiShoppingCartCustom?.texts.title }}</p>
    <section v-if="openOrder" :class="`${baseClass}__content`">
      <UiProductShoppingCard
        @selectFavourite="$emit('selectFavourite')"
        @delete="deleteOrderProduct"
        v-for="product in openOrder.products"
        :key="product.id || product._id || product.productId"
        :order-product="product"
        :custom-colors="uiShoppingCartCustom?.visuals.colors"
      />
    </section>
    <div v-if="openOrder" :class="`${baseClass}__wrapper ${baseClass}__wrapper--footer`">
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--price`">
        <p :class="`${baseClass}__text ${baseClass}__text--total`">{{ uiShoppingCartCustom?.texts.order.totalPrice }}</p>
        <p :class="`${baseClass}__text ${baseClass}__text--number`">{{ openOrder.total + ' €' }}</p>
      </div>
      <UiButton @click="goToOrder" :text="uiShoppingCartCustom?.texts.order.action" :background-color="uiShoppingCartCustom?.visuals.colors.order.button" />
      <UiButton @click="goToProducts" text="Seguir comprando" transparent/>
    </div>
    <section v-else :class="`${baseClass}__wrapper ${baseClass}__wrapper--empty`">
      <p :class="`${baseClass}__text ${baseClass}__text--description`">
        {{ uiShoppingCartCustom?.texts.empty.description }}
      </p>
    
      <UiButton @click="goToProducts" :text="uiShoppingCartCustom?.texts.empty.action" :background-color="uiShoppingCartCustom?.visuals.colors.empty.button" />
    </section>
  </UiAside>
</template>

<script lang="ts" setup>
  import { onMounted, ref, watch } from 'vue';
  import { useRouter } from 'vue-router';

  import { useCart } from '@/composables';
  import { customService } from '@/services';

  import UiProductShoppingCard from '@/components/products/ui-product-shopping-card.component.vue';

  import UiAside from '@/components/shared/ui-aside.component.vue';
  import UiButton from '@/components/shared/ui-button.component.vue';

  const baseClass = 'ui-shopping-cart';

  const router = useRouter();
  const { openOrder, deleteProduct, loadUserOrders } = useCart();

  const props = defineProps({
    isOpen: Boolean
  });

  const emit = defineEmits(['close', 'editProduct', 'selectFavourite']);

  const uiShoppingCartCustom = ref();
  
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

  onMounted(async () => {
    uiShoppingCartCustom.value = await customService.getCustom('cart-aside');
  });
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
