<template>
  <div :class="baseClass">
    <base-text-input
      :label="t('dashboard.products.form.image')"
      :value="item?.imageUrl"
      form="semi-round"
      color="white"
      type="outline"
    />
    <base-text-input
      :label="t('dashboard.products.form.name')"
      :value="item?.name"
      form="semi-round"
      color="white"
      type="outline"
    />
    <base-text-input
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
      :label="t('dashboard.products.form.price')"
      :value="item?.price"
      form="semi-round"
      color="white"
      type="outline"
    />
    <base-text-input
      :label="t('dashboard.products.form.quantity')"
      :value="item?.quantity"
      form="semi-round"
      color="white"
      type="outline"
    />
  </div>
</template>

<script lang="ts" setup>
  import { PropType, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { Product } from '../../../interfaces';

  import { BaseKeywords, BaseTextInput } from '../../inputs';

  const { t } = useI18n();

  const baseClass = 'product-form';

  const props = defineProps({
    itemToEdit: {
      type: Object as PropType<Product>,
      default: undefined
    }
  });

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
</script>

<style lang="scss" scoped>
  .product-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
