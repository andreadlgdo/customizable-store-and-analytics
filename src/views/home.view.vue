<template>
  <Header
    :opened-menu="isOpenMenu"
    :opened-user-menu="isOpenUserMenu"
    :opened-whist-list="isOpenWhistList"
    :opened-shopping-cart="isOpenShoppingCart"
    @updateMenu="value => (isOpenMenu = value)"
    @updateUserMenu="value => (isOpenUserMenu = value)"
    @updateWhistList="value => (isOpenWhistList = value)"
    @updateShoppingCart="value => (isOpenShoppingCart = value)"
  />
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  import Header from './header.view.vue';

  const isOpenMenu = ref(false);
  const isOpenUserMenu = ref(false);
  const isOpenWhistList = ref(false);
  const isOpenShoppingCart = ref(false);
</script>

<style lang="scss" scoped></style>
