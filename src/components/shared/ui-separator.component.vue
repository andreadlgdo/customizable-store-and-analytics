<template>
  <div :class="baseClass">
    <span :class="`${baseClass}__text`">
      {{ label }}
    </span>
  </div>
</template>

<script lang="ts" setup>
  const baseClass = 'ui-separator';

  defineProps({
    label: {
      type: String,
      required: true
    }
  });
</script>

<style lang="scss" scoped>
  .ui-separator {
    border-bottom: 1px solid var(--color-medium);
    text-align: center;
    align-items: center;

    &__text {
      background-color: white;
      padding: 0 10px;
      position: relative;
      top: 8px;
    }
  }
</style>
