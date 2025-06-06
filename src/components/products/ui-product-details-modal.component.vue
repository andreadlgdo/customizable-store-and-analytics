<template>
  <UiModal @close="$emit('close')" :is-open="isOpen">
    <div :class="baseClass">
      <UiImage :image="product.imageUrl" type="square" size="extra-large" />
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--content`">
        <div>
          <h1 :class="`${baseClass}__text ${baseClass}__text--title`">{{ product.name }}</h1>
          <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--price`">
            <p
              :class="[
                `${baseClass}__text ${baseClass}__text--price`,
                {
                  [`${baseClass}__text ${baseClass}__text--price-discount`]:
                    product.priceWithDiscount
                }
              ]"
            >
              {{ product.price + ' €' }}
            </p>
            <p
              v-if="product.priceWithDiscount"
              :class="`${baseClass}__text ${baseClass}__text--discount`"
            >
              {{ product.priceWithDiscount + ' €' }}
            </p>
          </div>
        </div>
        <p :class="`${baseClass}__text ${baseClass}__text--description`">
          {{ product.description }}
        </p>
        <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--select`">
          <UiSelect
            v-if="!product.isUniqueSize"
            @change="value => (size = value)"
            :value="size"
            label="Talla"
            placeholder="Select"
            :options="product.stock?.map(s => ({ title: s.size, disabled: !s.quantity }))"
            :style="{ width: '50%' }"
          />
          <UiSelect
            v-if="!!size || product.isUniqueSize"
            @change="value => (unit = value)"
            :value="unit"
            label="Unidades"
            placeholder="Select"
            :options="
              Array.from(
                {
                  length: product.isUniqueSize
                    ? product.uniqueStock
                    : product.stock?.find(s => s.size === size)?.quantity
                },
                (_, i) => ({
                  title: (i + 1).toString()
                })
              )
            "
            :style="{ width: '50%' }"
          />
        </div>
        <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--button`">
          <UiButton
            @click="addProductCard"
            icon="cart"
            :text="t('products.modal.action')"
            :class="`${baseClass}__button`"
            :disabled="(!product.isUniqueSize || !unit) && (!size || !unit)"
            transparent
          />
          <UiIconButton
            @click="selectFavourite"
            :icon="isFavourite ? 'heartSelected' : 'heart'"
            :class="`${baseClass}__icon`"
          />
        </div>
      </div>
    </div>
  </UiModal>
</template>

<script lang="ts" setup>
  import { PropType, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { useCart } from '../../composables';
  import { Product } from '../../interfaces';

  import UiModal from '../shared/ui-modal.component.vue';
  import UiImage from '../shared/ui-image.component.vue';
  import UiSelect from '../shared/ui-select.component.vue';
  import UiIconButton from '../shared/ui-icon-button.component.vue';
  import UiButton from '../shared/ui-button.component.vue';

  const baseClass = 'ui-product-details-modal';

  const props = defineProps({
    isOpen: Boolean,
    product: {
      type: Object as PropType<Product>,
      required: true
    },
    isFavourite: Boolean
  });

  const emit = defineEmits(['close', 'selectFavourite', 'addToCart']);

  const { t } = useI18n();
  const { addProduct } = useCart();

  const size = ref('');
  const unit = ref('');

  const addProductCard = async () => {
    await addProduct(props.product, size.value, unit.value);
    emit('close');
    emit('addToCart');
  };

  const selectFavourite = () => {
    emit('selectFavourite', !props.isFavourite, props.product);
    emit('close');
  };

  watch(
    () => props.product,
    () => {
      size.value = '';
      unit.value = '';
    }
  );
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

      &--select,
      &--price {
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

      &--price-discount {
        text-decoration: line-through;
      }

      &--discount {
        font-size: 20px;
        font-weight: bold;
        color: var(--color-red);
      }

      &--description {
        width: 18rem;
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
