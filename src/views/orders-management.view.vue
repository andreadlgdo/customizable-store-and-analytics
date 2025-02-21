<template>
  <dashboard :selected-item="menuElements[2]">
    <p>Seccion orders management</p>
  </dashboard>
</template>

<script lang="ts" setup>
  import { useUserMenu } from '../composables';

  import Dashboard from './dashboard/dashboard.view.vue';

  const { menuElements } = useUserMenu();
</script>

<style lang="scss" scoped></style>
