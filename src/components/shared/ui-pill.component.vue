<template>
  <div :class="[baseClass, `${baseClass}--${size}`, `${baseClass}--${status}`]">{{ text }}</div>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';
  import { SizeType } from '@/types';

  const baseClass = 'ui-pill';

  defineProps({
    text: String,
    size: {
      type: String as PropType<SizeType>,
      default: 'normal'
    },
    status: {
      type: String as PropType<'error' | 'default' | 'success'>,
      default: 'default'
    }
  });
</script>

<style lang="scss" scoped>
  .ui-pill {
    border-radius: 25px;
    width: fit-content;
    padding: 6px 10px;
    font-size: 10px;
    background: var(--color-soft-primary);

    &--error {
      background: var(--bg-red);
    }

    &--success {
      background: var(--bg-green);
    }
  }
</style>
