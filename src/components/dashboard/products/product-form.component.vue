<template>
  <div :class="baseClass">
    <base-text-input
      :label="t('dashboard.products.form.image')"
      form="semi-round"
      color="white"
      type="outline"
    />
    <base-text-input
      :label="t('dashboard.products.form.name')"
      form="semi-round"
      color="white"
      type="outline"
    />
    <base-text-input
      :label="t('dashboard.products.form.description')"
      form="semi-round"
      color="white"
      type="outline"
    />
    <base-keywords
      @add="addCategories"
      @remove="removeCategories"
      :label="t('dashboard.products.form.categories')"
      form="semi-round"
      :values="categories"
      color="white"
      type="outline"
    />
    <base-text-input
      :label="t('dashboard.products.form.price')"
      form="semi-round"
      color="white"
      type="outline"
    />
    <base-text-input
      :label="t('dashboard.products.form.quantity')"
      form="semi-round"
      color="white"
      type="outline"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { BaseKeywords, BaseTextInput } from '../../inputs';

  const { t } = useI18n();

  const baseClass = 'product-form';

  const categories = ref<string[]>([]);

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
