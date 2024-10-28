<template>
  <div
    :class="[
      baseClass,
      `${baseClass}--${form}`,
      `${baseClass}--${size}`,
      { [`${baseClass}--shadow`]: haveShadow }
    ]"
    :style="{
      '--background-color': type !== 'outline' ? `var(--color-${color})` : 'transparent',
      '--border-color': type !== 'solid' ? `3px var(--color-border-${color}) solid` : 'none',
      '--hover-color': `var(--color-border-${color})`
    }"
  >
    <icon-button v-if="icon" :icon="icon" :color-attribute="colorAttribute" size="small" />
    <base-text v-if="text" tag="default">
      {{ text }}
    </base-text>
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';

  import type { ColorType, InputType, InputFormType, SizeType, SvgIconType } from '../../types';

  import IconButton from '../icons/icon-button.component.vue';

  import BaseText from '../base-text.component.vue';

  const baseClass = 'base-button';

  defineProps({
    icon: String,
    text: String,
    colorAttribute: String as PropType<SvgIconType>,
    form: {
      type: String as PropType<InputFormType>,
      default: 'round'
    },
    size: {
      type: String as PropType<SizeType>,
      default: 'normal'
    },
    type: {
      type: String as PropType<InputType>,
      default: 'solid'
    },
    color: {
      type: String as PropType<ColorType>,
      default: 'default'
    },
    haveShadow: Boolean
  });
</script>

<style lang="scss" scoped>
  .base-button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    padding: 6px;
    background-color: var(--background-color);
    border: var(--border-color);
    cursor: pointer;

    &:hover {
      background-color: var(--hover-color);
    }

    &--outline {
      background-color: transparent;
      border: 1px solid;
    }

    &--outline-solid {
      border: 1px solid;
    }

    &--small {
      width: 10rem;
    }

    &--normal {
      width: 12rem;
      height: 38px;
    }

    &--large {
      width: 16rem;
      padding: 8px;
    }

    &--round {
      border-radius: 25px;
    }

    &--semi-round {
      border-radius: 8px;
    }

    &--shadow {
      box-shadow: var(--shadow-button);
    }
  }
</style>
