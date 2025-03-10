<template>
  <ui-modal @close="$emit('close')" :is-open="isOpen">
    <div :class="baseClass">
      <ui-image :image="product.imageUrl" type="square" size="extra-large" />
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--content`">
        <div>
          <h1 :class="`${baseClass}__text ${baseClass}__text--title`">{{ product.name }}</h1>
          <p :class="`${baseClass}__text ${baseClass}__text--price`">
            {{ product.price + ' €' }}
          </p>
        </div>
        <p :class="`${baseClass}__text ${baseClass}__text--description`">
          {{ product.description }}
        </p>
        <p v-if="!haveStock" :class="`${baseClass}__text ${baseClass}__text--without-stock`">
          Out of stock
        </p>
        <div v-else :class="`${baseClass}__wrapper ${baseClass}__wrapper--select`">
          <ui-select
            @change="value => (size = value)"
            :value="size"
            label="Talla"
            placeholder="Select"
            :options="product.stock?.map(s => ({ title: s.size, disabled: !s.quantity }))"
            :style="{ width: '50%' }"
          />
          <ui-select
            v-if="!!size"
            @change="value => (unit = value)"
            :value="unit"
            label="Unidades"
            placeholder="Select"
            :options="
              Array.from(
                { length: product.stock?.find(s => s.size === size)?.quantity },
                (_, i) => ({
                  title: (i + 1).toString()
                })
              )
            "
            :style="{ width: '50%' }"
          />
        </div>
        <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--button`">
          <ui-button
            icon="cart"
            :text="t('products.modal.action')"
            transparent
            :class="`${baseClass}__button`"
            :disabled="!haveStock || !size || !unit"
          />
          <ui-icon-button
            @click="selectFavourite"
            :icon="isFavourite ? 'heartSelected' : 'heart'"
            :class="`${baseClass}__icon`"
          />
        </div>
      </div>
    </div>
  </ui-modal>
</template>

<script lang="ts" setup>
  import { computed, PropType, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { Product } from '../../../interfaces';

  import UiModal from '../ui-modal.component.vue';
  import UiImage from '../ui-image.component.vue';
  import UiSelect from '../ui-select.component.vue';
  import UiIconButton from '../ui-icon-button.component.vue';
  import UiButton from '../ui-button.component.vue';

  const baseClass = 'ui-product-details-modal';

  const props = defineProps({
    isOpen: Boolean,
    product: {
      type: Object as PropType<Product>,
      required: true
    },
    isFavourite: Boolean
  });

  const emit = defineEmits(['close', 'selectFavourite']);

  const { t } = useI18n();

  const size = ref('');
  const unit = ref('');

  const haveStock = computed(() =>
    props.product.stock?.reduce((acc, stock) => acc + stock.quantity, 0)
  );

  const selectFavourite = () => {
    emit('selectFavourite', !props.isFavourite, props.product);
    emit('close');
  };
</script>

<style lang="scss" scoped>
  .ui-product-details-modal {
    display: flex;
    gap: 1rem;
    padding: 4rem 3rem;

    &__wrapper {
      display: flex;

      &--content {
        position: relative;
        flex-direction: column;
        gap: 14px;
      }

      &--button {
        position: absolute;
        bottom: 0;
        gap: 8px;
        width: 100%;
      }

      &--select {
        gap: 14px;
      }
    }

    &__text {
      &--title {
        font-size: 28px;
        font-weight: bold;
      }

      &--price {
        font-size: 20px;
      }

      &--description {
        width: 18rem;
      }

      &--without-stock {
        font-size: 16px;
        font-weight: bold;
        color: var(--color-red);
      }
    }

    &__button {
      width: 100%;
    }

    &__icon {
      padding: 8px;
      border-radius: 50px;

      &:hover {
        background-color: var(--bg-red);
      }
    }
  }
</style>
