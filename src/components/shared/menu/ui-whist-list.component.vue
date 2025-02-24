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

  const baseClass = 'ui-whist-list';

  defineProps({
    isOpen: Boolean
  });
</script>

<style lang="scss" scoped>
  .ui-whist-list {
    width: 360px;
  }
</style>
