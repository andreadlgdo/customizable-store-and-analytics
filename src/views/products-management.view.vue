<template>
  <dashboard :selected-item="menuElements[1]">
    <p>Seccion products management</p>
  </dashboard>
</template>

<script lang="ts" setup>
  import { useUserMenu } from '../composables';

  import Dashboard from './dashboard.view.vue';

  const { menuElements } = useUserMenu();
</script>

<style lang="scss" scoped></style>
