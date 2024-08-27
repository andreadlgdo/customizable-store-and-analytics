<template>
  <Aside @close="$emit('close')" :is-open="isOpen">
    <div :class="baseClass"></div>
  </Aside>
</template>

<script lang="ts" setup>
  import Aside from '../asides/aside.component.vue';

  const baseClass = 'menu';

  defineProps({
    isOpen: Boolean
  });

  defineEmits(['close']);
</script>

<style lang="scss" scoped>
  .menu {
  }
</style>
