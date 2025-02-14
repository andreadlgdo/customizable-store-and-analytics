<template>
  <dashboard :selected-item="menuElements[1]">
    <div :class="baseClass">
      <h1>Gestión de productos</h1>
      <ui-button text="Add product" icon="plus" :class="`${baseClass}__button`" />
      <products-list :products="products" :class="`${baseClass}__table`" />
    </div>
  </dashboard>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';

  import ProductsList from '../components/dashboard-menu/ui-products-list.component.vue';
  import UiButton from '../components/shared/ui-button.component.vue';

  import { useProducts, useUserMenu } from '../composables';

  import Dashboard from './dashboard.view.vue';

  const { menuElements } = useUserMenu();
  const { loadProducts, products } = useProducts();

  const baseClass = 'products-management';

  onMounted(async () => await loadProducts());
</script>

<style lang="scss" scoped>
  .products-management {
    display: flex;
    flex-direction: column;
    margin: 2rem;
    width: 100%;

    &__button {
      align-self: flex-end;
      width: fit-content;
      margin: 1rem 0;
    }

    &__pagination {
      align-self: center;
    }
  }
</style>
