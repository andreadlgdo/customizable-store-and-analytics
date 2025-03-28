<template>
  <dashboard :selected-item="menuElements[1]">
    <div :class="baseClass">
      <p>Carrito</p>
      <p v-if="!openOrder">El carrito esta vacio</p>
      <p v-else>{{ openOrder }}</p>
    </div>
  </dashboard>
</template>

<script lang="ts" setup>
  import { useCart, useUserMenu } from '../../composables';

  import Dashboard from './dashboard.view.vue';
  import { onMounted } from 'vue';

  const { menuElements } = useUserMenu();
  const { openOrder, loadUserOrders } = useCart();

  const baseClass = 'user-cart';

  onMounted(async () => await loadUserOrders());
</script>

<style lang="scss" scoped>
  .user-cart {
    margin: 2rem;
    width: 100%;
  }
</style>
