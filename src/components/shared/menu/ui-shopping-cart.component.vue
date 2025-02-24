<template>
  <ui-aside
    @click="$emit('close')"
    :class="baseClass"
    :is-open="isOpen"
    icon="close"
    fixed
  ></ui-aside>
</template>

<script lang="ts" setup>
  import UiAside from '../ui-aside.component.vue';

  const baseClass = 'ui-shopping-cart';

  defineProps({
    isOpen: Boolean
  });
</script>

<style lang="scss" scoped>
  .ui-shopping-cart {
    width: 360px;
  }
</style>
