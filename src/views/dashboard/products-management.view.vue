<template>
  <base-text tag="h3">Gestión de productos</base-text>
  <div :class="baseClass">
    <base-button
      icon="plus"
      :text="t('dashboard.products.action.add')"
      color="primary"
      :class="`${baseClass}__button`"
    />
    <products-table />
  </div>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';

  import { BaseButton, BaseText, ProductsTable } from '../../components';

  const { t } = useI18n();

  const baseClass = 'products-management';
</script>

<style lang="scss" scoped>
  .products-management {
    display: flex;
    flex-direction: column;

    &__button {
      align-self: flex-end;
      margin-bottom: 1rem;
    }
  }
</style>
