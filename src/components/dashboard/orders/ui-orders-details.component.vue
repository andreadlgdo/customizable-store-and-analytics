<template>
  <div :class="baseClass">
    <div v-if="item" :class="`${baseClass}__wrapper ${baseClass}__wrapper--column`">
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
        <ui-textbox :value="item._id" :label="t('dashboard.orders.form.id')" disabled />
        <ui-textbox :value="item.status" :label="t('dashboard.orders.form.status')" disabled />
        <ui-textbox :value="item.total + ' €'" :label="t('dashboard.orders.form.total')" disabled />
      </div>
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
        <ui-textbox :value="item.userId" :label="t('dashboard.orders.form.user.idUser')" disabled />
        <ui-textbox
          v-if="item.user"
          :value="item.user?.name + ' ' + item.user?.surname"
          :label="t('dashboard.orders.form.user.name')"
          disabled
        />
        <ui-textbox
          v-if="item.user"
          :value="item.user?.email"
          :label="t('dashboard.orders.form.user.email')"
          disabled
        />
      </div>
      <ui-textbox
        v-if="item.address"
        :value="address"
        :label="t('dashboard.orders.form.address')"
        disabled
      />
      <p :class="`${baseClass}__text`">{{ t('dashboard.orders.form.products.title') }}</p>
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--column-products`">
        <div
          v-for="product in item.products"
          :key="product.productId"
          :class="`${baseClass}__wrapper ${baseClass}__wrapper--product`"
        >
          <ui-image
            :image="findProduct(product.productId)?.imageUrl ?? ''"
            size="mini"
            :class="`${baseClass}__image`"
            type="semi-round"
          />
          <ui-textbox
            :value="product.productId"
            :label="t('dashboard.orders.form.products.id')"
            disabled
          />
          <ui-textbox
            :value="findProduct(product.productId)?.name"
            :label="t('dashboard.orders.form.products.name')"
            disabled
          />
          <ui-textbox
            :value="
              findProduct(product.productId)?.priceWithDiscount ??
              findProduct(product.productId)?.price
            "
            :label="t('dashboard.orders.form.products.price')"
            disabled
          />
          <ui-textbox
            :value="product.units"
            :label="t('dashboard.orders.form.products.units')"
            disabled
            :class="`${baseClass}__textbox`"
          />
          <ui-textbox
            :value="product.size"
            :label="t('dashboard.orders.form.products.size')"
            disabled
            :class="`${baseClass}__textbox`"
          />
        </div>
      </div>
    </div>
    <UiButton
      @click="$emit('cancel')"
      text="Close"
      icon="close"
      :class="`${baseClass}__wrapper ${baseClass}__wrapper--button`"
    />
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, PropType } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { useProducts } from '../../../composables';
  import { Order } from '../../../interfaces';

  import UiButton from '../../shared/ui-button.component.vue';
  import UiTextbox from '../../shared/ui-textbox.component.vue';
  import UiImage from '../../shared/ui-image.component.vue';

  const baseClass = 'ui-order-details';

  const props = defineProps({
    item: {
      type: Object as PropType<Order>,
      required: true
    }
  });

  defineEmits(['cancel']);

  const { loadProducts, findProduct } = useProducts();
  const { t } = useI18n();

  const address = computed(() =>
    props.item.address
      ? props.item.address.street +
        ', ' +
        props.item.address.number +
        'º' +
        props.item.address.letter +
        ', ' +
        props.item.address.zipCode +
        ', ' +
        props.item.address.city +
        ', ' +
        props.item.address.country
      : ''
  );

  onMounted(async () => await loadProducts());
</script>

<style lang="scss" scoped>
  .ui-order-details {
    position: relative;
    margin: 2rem;
    height: 100%;

    &__wrapper {
      display: flex;
      gap: 1rem;
      overflow: visible !important;

      &--column,
      &--column-products {
        flex-direction: column;
      }

      &--column-products {
        overflow-y: scroll;
        height: 22rem;
      }

      &--product {
        align-items: center;
      }

      &--button {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
      }
    }

    &__text {
      font-weight: bold;
      font-size: 22px;
    }

    &__image {
      width: 22rem;
    }

    &__textbox {
      width: 18rem;
    }
  }
</style>
