<template>
  <span
    :class="[baseClass, `${baseClass}--${tag}`]"
    :style="{ textTransform: overline ? 'uppercase' : '', justifyContent: textAlign }"
  >
    <slot></slot>
  </span>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';

  import { AlignType, TextTagType } from '../types';

  const baseClass = 'base-text';

  defineProps({
    tag: {
      type: String as PropType<TextTagType>,
      default: 'span'
    },
    textAlign: {
      type: String as PropType<AlignType>,
      default: 'center'
    },
    overline: Boolean
  });
</script>

<style lang="scss" scoped>
  .base-text {
    display: flex;
    width: 100%;

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
  }
</style>
