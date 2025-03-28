<template>
  <dashboard :selected-item="menuElements[5]">
    <p>Seccion analytics</p>
  </dashboard>
</template>

<script lang="ts" setup>
  import { useUserMenu } from '../../composables';

  import Dashboard from './dashboard.view.vue';

  const { menuElements } = useUserMenu();
</script>

<style lang="scss" scoped></style>
