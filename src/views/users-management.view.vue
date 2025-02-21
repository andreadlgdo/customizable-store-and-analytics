<template>
  <dashboard :selected-item="menuElements[3]">
    <p>Seccion users management</p>
  </dashboard>
</template>

<script lang="ts" setup>
  import { useUserMenu } from '../composables';

  import Dashboard from './dashboard/dashboard.view.vue';

  const { menuElements } = useUserMenu();
</script>

<style lang="scss" scoped></style>
