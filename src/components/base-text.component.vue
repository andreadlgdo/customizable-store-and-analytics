<template>
  <span
    :class="[baseClass, `${baseClass}--${tag}`]"
    :style="{ textTransform: overline ? 'uppercase' : '' }"
  >
    <slot></slot>
  </span>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';

  import { TextTagType } from '../types';

  const baseClass = 'base-text';

  defineProps({
    tag: {
      type: String as PropType<TextTagType>,
      default: 'span'
    },
    overline: Boolean
  });
</script>

<style lang="scss" scoped>
  .base-text {
    display: flex;

    &--h1 {
      font-size: 2.75rem;
      font-weight: 800;
    }

    &--h2 {
      font-size: 2.35rem;
      font-weight: 800;
    }

    &--h3 {
      font-size: 2rem;
      font-weight: 700;
    }

    &--h4 {
      font-size: 1.5rem;
      font-weight: 700;
    }

    &--span {
      font-size: 1.5rem;
      font-weight: 500;
    }

    &--p {
      font-size: 1.25rem;
      font-weight: 400;
    }

    &--default {
      font-size: 1rem;
      font-weight: 400;
    }

    &--small {
      font-size: 0.75rem;
      font-weight: 400;
    }

    &--extra-small {
      font-size: 0.625rem;
      font-weight: 400;
    }

    &--link {
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
    }
  }
</style>
