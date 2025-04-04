<template>
  <dashboard :selected-item="menuElements[1]">
    <div :class="baseClass">
      <h1 :class="`${baseClass}__text ${baseClass}__text--title`">
        {{ t('dashboard.cart.title') }}
      </h1>
      <p v-if="!openOrder">{{ t('dashboard.cart.empty') }}</p>
      <div v-else :class="`${baseClass}__wrapper ${baseClass}__wrapper--column`">
        <div
          v-for="product in openOrder.products"
          :key="product.productId"
          :class="`${baseClass}__wrapper ${baseClass}__wrapper--row ${baseClass}__wrapper--content`"
        >
          <UiImage
            :image="findProduct(product.productId)?.imageUrl"
            type="semi-round"
            size="small"
          />
          <div :class="`${baseClass}__content`">
            <h3 :class="`${baseClass}__text ${baseClass}__text--name`">
              {{ findProduct(product.productId)?.name }}
            </h3>
            <p>
              {{
                (findProduct(product.productId)?.priceWithDiscount ??
                  findProduct(product.productId)?.price) + ' €'
              }}
            </p>
          </div>
          <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
            <UiSelect :placeholder="product.units" disabled :class="`${baseClass}__select`" />
            <h3 :class="`${baseClass}__text ${baseClass}__text--price`">
              {{
                product.units *
                  (findProduct(product.productId)?.priceWithDiscount ??
                    findProduct(product.productId)?.price) +
                ' €'
              }}
            </h3>
            <UiIconButton icon="heart" />
            <UiIconButton icon="delete" />
          </div>
        </div>
      </div>
      <hr />
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
        <p :class="`${baseClass}__text ${baseClass}__text--label`">
          {{ t('dashboard.cart.label') }}
        </p>
        <p :class="`${baseClass}__text ${baseClass}__text--label`">{{ openOrder?.total + ' €' }}</p>
      </div>
      <ui-button
        @click="router.push('/order')"
        :text="t('asides.cart.action')"
        :class="`${baseClass}__button`"
      />
    </div>
  </dashboard>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';

  import UiImage from '../../components/shared/ui-image.component.vue';
  import UiSelect from '../../components/shared/ui-select.component.vue';
  import UiIconButton from '../../components/shared/ui-icon-button.component.vue';
  import UiButton from '../../components/shared/ui-button.component.vue';

  import { useCart, useProducts, useUserMenu } from '../../composables';

  import Dashboard from './dashboard.view.vue';

  const { menuElements } = useUserMenu();
  const { openOrder, loadUserOrders } = useCart();
  const { loadProducts, findProduct } = useProducts();
  const router = useRouter();
  const { t } = useI18n();

  const baseClass = 'user-cart';

  onMounted(async () => {
    await loadUserOrders();
    await loadProducts();
  });
</script>

<style lang="scss" scoped>
  .user-cart {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 2rem;
    width: 100%;

    &__wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;

      &--column {
        flex-direction: column;
        overflow-y: scroll;
      }

      &--content {
        padding: 1rem;
        border: 1px solid var(--color-dark-primary);
        border-radius: 20px;
        width: 100%;
      }
    }

    &__content {
      width: 100%;
    }

    &__text {
      font-weight: bold;

      &--title {
        padding-bottom: 1rem;
      }

      &--price {
        width: 3rem;
      }

      &--label {
        font-size: 22px;
      }
    }

    &__select {
      width: 4rem;
    }

    &__button {
      width: 12rem;
      align-self: center;
    }
  }
</style>
