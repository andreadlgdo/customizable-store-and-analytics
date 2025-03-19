<template>
  <div :class="baseClass">
    <div :class="`${baseClass}__content`">
      <div :class="`${baseClass}__header`">
        <ui-icon-button @click="goBack" icon="go-to" :class="`${baseClass}__icon`" />
        <h1 @click="router.push('/')" :class="`${baseClass}__name`">KASTO</h1>
      </div>
      <div :class="`${baseClass}__wrapper`">
        <ui-label-legend
          :options="[
            { label: t('order.options.personalData'), selected: firstStep },
            { label: t('order.options.shipping'), selected: secondStep },
            { label: t('order.options.payment'), selected: thirdStep },
            { label: t('order.options.summary'), selected: fourStep }
          ]"
        />
        <order-personal-data v-if="firstStep" @continue="goToSecondStep" />
        <order-shipping v-else-if="secondStep" @back="goToFirstStep" @continue="goToThirdStep" />
        <order-payment v-else-if="thirdStep" @back="goToSecondStep" @continue="goToFourStep" />
      </div>
    </div>
    <ui-aside :fixed="false" is-open :class="`${baseClass}__aside`">
      <p :class="`${baseClass}__text ${baseClass}__text--title`">Resumen de la compra</p>
      <section v-if="openOrder" :class="`${baseClass}__products`">
        <ui-product-shopping-card
          v-for="product in openOrder.products"
          :key="product.id"
          :order-product="product"
          :showActions="false"
        />
      </section>
      <div :class="`${baseClass}__footer`">
        <p :class="`${baseClass}__text ${baseClass}__text--price`">Total</p>
        <p :class="`${baseClass}__text ${baseClass}__text--number`">
          {{ openOrder?.total + ' €' }}
        </p>
      </div>
    </ui-aside>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';

  import UiIconButton from '../components/shared/ui-icon-button.component.vue';
  import UiAside from '../components/shared/ui-aside.component.vue';
  import UiProductShoppingCard from '../components/shared/products/ui-product-shopping-card.component.vue';
  import UiLabelLegend from '../components/shared/order/ui-label-legend.component.vue';
  import OrderPersonalData from '../components/shared/order/order-personal-data.component.vue';
  import OrderShipping from '../components/shared/order/order-shipping.component.vue';
  import OrderPayment from '../components/shared/order/order-payment.component.vue';

  import { useCart } from '../composables';

  const baseClass = 'order-checkout';
  const router = useRouter();
  const { t } = useI18n();
  const { openOrder, loadUserOrders } = useCart();

  const firstStep = ref(true);
  const secondStep = ref(false);
  const thirdStep = ref(false);
  const fourStep = ref(false);

  const goBack = () => router.go(-1);

  const goToFirstStep = () => {
    firstStep.value = true;
    secondStep.value = false;
    thirdStep.value = false;
    fourStep.value = false;
  };

  const goToSecondStep = () => {
    firstStep.value = false;
    secondStep.value = true;
    thirdStep.value = false;
    fourStep.value = false;
  };
  const goToThirdStep = () => {
    firstStep.value = false;
    secondStep.value = false;
    thirdStep.value = true;
    fourStep.value = false;
  };

  const goToFourStep = () => {
    firstStep.value = false;
    secondStep.value = false;
    thirdStep.value = false;
    fourStep.value = true;
  };

  onMounted(async () => await loadUserOrders());
</script>

<style lang="scss" scoped>
  .order-checkout {
    display: flex;

    &__content {
      position: relative;
      width: 100%;
      max-height: 100%;
    }

    &__wrapper {
      display: flex;
      gap: 16px;
      flex-direction: column;
      padding: 2rem;
    }

    &__header {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      height: 5rem;
      padding-left: 2rem;
    }

    &__name {
      text-align: center;
      font-size: 32px;
      font-weight: bold;
      cursor: pointer;
    }

    &__icon {
      transform: rotate(180deg);
      border-radius: 50%;
      padding: 8px;

      &:hover {
        background-color: var(--color-soft);
      }
    }

    &__aside {
      width: 600px;
      background-color: var(--color-soft-primary);
    }

    &__text {
      font-weight: bold;

      &--title {
        font-size: 32px;
        padding: 2rem 2rem 1rem 2rem;
      }

      &--price,
      &--number {
        font-size: 22px;
      }
    }

    &__products {
      height: 73%;
      padding: 0 2rem;
      overflow-y: scroll;
    }

    &__footer {
      position: absolute;
      bottom: 0;
      display: flex;
      justify-content: space-between;
      padding: 2rem 1.5rem;
      width: 100%;
      background-color: var(--color-medium-primary);
    }
  }
</style>
