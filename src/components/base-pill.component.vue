<template>
  <div
    :class="baseClass"
    :style="{
      '--color-background': `var(--color-${color})`
    }"
  >
    <svg-icon v-if="icon" :src="require(`../assets/media/icons/${icon}.svg`)" size="mini" />
    <base-text :tag="textSize" :class="`${baseClass}__text`">{{ text }}</base-text>
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';

  import { ColorType, TextTagType } from '../types';

  import BaseText from './base-text.component.vue';
  import { SvgIcon } from './icons';

  const baseClass = 'base-pìll';

  defineProps({
    text: {
      type: String,
      required: true
    },
    textSize: {
      type: String as PropType<TextTagType>,
      default: 'extra-small'
    },
    color: {
      type: String as PropType<ColorType>,
      default: 'default'
    },
    icon: String
  });
</script>

<style lang="scss" scoped>
  .base-pìll {
    display: flex;
    align-items: center;
    width: fit-content;
    padding: 12px;
    margin: 4px;
    height: 16px;
    border-radius: 16px;
    gap: 4px;
    background: var(--color-background);

    &__text {
      white-space: nowrap;
    }
  }
</style>
