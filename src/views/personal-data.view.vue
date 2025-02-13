<template>
  <dashboard :selected-item="menuElements[0]">
    <p>Seccion personal data</p>
  </dashboard>
</template>

<script lang="ts" setup>
  import Dashboard from './dashboard.view.vue';
  import { useUserMenu } from '@/composables';

  const { menuElements } = useUserMenu();
</script>

<style lang="scss" scoped></style>
