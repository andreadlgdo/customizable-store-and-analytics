<template>
  <div :style="{ position: 'relative' }">
    <base-text :class="baseClass" tag="small" color="main">{{ text }}</base-text>
  </div>
</template>

<script lang="ts" setup>
  import BaseText from '@/components/base-text.component.vue';

  const baseClass = 'base-tooltip';

  defineProps({
    text: {
      type: String,
      required: true
    }
  });
</script>

<style lang="scss" scoped>
  .base-tooltip {
    position: absolute;
    top: 12px;
    left: -52px;
    background-color: var(--color-main);
    padding: 4px 8px;
    z-index: 999;
    pointer-events: none;
  }
</style>
