<template>
  <div :class="baseClass">
    <base-text-input
      @input="value => (item.imageUrl = value)"
      :label="t('dashboard.products.form.image')"
      :value="item?.imageUrl"
      form="semi-round"
      color="white"
      type="outline"
    />
    <base-text-input
      @input="value => (item.name = value)"
      :label="t('dashboard.products.form.name')"
      :value="item?.name"
      form="semi-round"
      color="white"
      type="outline"
    />
    <base-text-input
      @input="value => (item.description = value)"
      :label="t('dashboard.products.form.description')"
      :value="item?.description"
      form="semi-round"
      color="white"
      type="outline"
    />
    <base-keywords
      @add="addCategories"
      @remove="removeCategories"
      :values="categories"
      :label="t('dashboard.products.form.categories')"
      form="semi-round"
      color="white"
      type="outline"
    />
    <base-text-input
      @input="value => (item.price = Number.parseInt(value))"
      :label="t('dashboard.products.form.price')"
      :value="item?.price.toString()"
      form="semi-round"
      color="white"
      type="outline"
    />
    <base-text-input
      @input="value => (item.quantity = Number.parseInt(value))"
      :label="t('dashboard.products.form.quantity')"
      :value="item?.quantity.toString()"
      form="semi-round"
      color="white"
      type="outline"
    />
  </div>
  <base-button
    @click="save"
    :text="itemToEdit ? 'Edit' : t('dashboard.products.form.action.save')"
    color="primary"
    :class="`${baseClass}__button ${baseClass}__button--save`"
    :disabled="!(item.name && item.price && item.price !== 0)"
  />
  <base-button
    @click="$emit('action')"
    :text="t('dashboard.products.form.action.cancel')"
    color="default"
    :class="`${baseClass}__button ${baseClass}__button--cancel`"
  />
</template>

<script lang="ts" setup>
  import { PropType, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { Product } from '../../../interfaces';
  import { productService } from '../../../services';

  import { BaseButton, BaseKeywords, BaseTextInput } from '../../inputs';

  const { t } = useI18n();

  const baseClass = 'product-form';

  const props = defineProps({
    itemToEdit: {
      type: Object as PropType<Product>,
      default: undefined
    }
  });

  const emit = defineEmits(['action']);

  const item = ref<Product>(
    props.itemToEdit ?? {
      name: '',
      description: '',
      imageUrl: '',
      categories: [],
      price: 0,
      quantity: 0
    }
  );

  const categories = ref<string[]>(item.value?.categories ?? []);

  const addCategories = (query: string) => {
    categories.value.push(query);
  };

  const removeCategories = (query: string) => {
    categories.value = categories.value.filter(category => category !== query);
  };

  const save = async () => {
    if (props.itemToEdit) {
      await productService.updateProduct(item.value);
    } else {
      await productService.createProduct(item.value);
    }
    emit('action');
  };
</script>

<style lang="scss" scoped>
  .product-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &__button {
      position: absolute;
      bottom: 0;
      width: 6rem;
      margin-bottom: 1rem;

      &--cancel {
        left: 7rem;
      }
    }
  }
</style>
