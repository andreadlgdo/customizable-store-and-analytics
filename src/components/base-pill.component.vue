<template>
  <div
    :class="[baseClass, { [`${baseClass}--right`]: iconPosition === 'right' }]"
    :style="{
      '--color-background': `var(--color-${color})`,
      '--color-hover-icon': `var(--color-border-${color})`
    }"
  >
    <svg-icon
      v-if="icon"
      :src="require(`../assets/media/icons/${icon}.svg`)"
      :class="`${baseClass}__icon ${baseClass}__icon--info`"
      size="mini"
    />
    <base-text :tag="textSize" :class="`${baseClass}__text`">
      {{ capitalizeSentence(text) }}
    </base-text>
    <icon-button
      v-if="isRemovable"
      @click="$emit('remove', text)"
      :class="`${baseClass}__icon ${baseClass}__icon--close`"
      icon="close"
      size="mini"
    />
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';

  import { useTextTransform } from '../composables';
  import { ColorType, PositionType, TextTagType } from '../types';

  import BaseText from './base-text.component.vue';
  import { IconButton, SvgIcon } from './icons';

  const baseClass = 'base-pìll';

  const { capitalizeSentence } = useTextTransform();

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
    icon: String,
    iconPosition: {
      type: String as PropType<PositionType>,
      default: 'left'
    },
    isRemovable: Boolean
  });

  defineEmits(['remove']);
</script>

<style lang="scss" scoped>
  .base-pìll {
    $baseClass: &;

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

    &--right {
      #{$baseClass}__icon--info {
        order: 2;
      }

      #{$baseClass}__text {
        order: 1;
      }
    }

    &__icon--close {
      padding: 4px;
      border-radius: 50%;

      &:hover {
        background-color: var(--color-hover-icon);
      }
    }
  }
</style>
