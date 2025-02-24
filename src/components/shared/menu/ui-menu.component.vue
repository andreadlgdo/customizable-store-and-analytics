<template>
  <ui-aside
    @click="$emit('close')"
    :class="baseClass"
    :is-open="isOpen"
    icon="close"
    position="left"
    fixed
  ></ui-aside>
</template>

<script lang="ts" setup>
  import UiAside from '../ui-aside.component.vue';

  const baseClass = 'ui-menu';

  defineProps({
    isOpen: Boolean
  });
</script>

<style lang="scss" scoped>
  .ui-menu {
    width: 360px;
  }
</style>
