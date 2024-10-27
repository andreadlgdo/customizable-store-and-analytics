<template>
  <button
    :class="[baseClass, `${baseClass}--${size}`, { [`${baseClass}--border`]: haveBorder }]"
    @click="$emit('click')"
  >
    <svg-icon
      :class="`${baseClass}__icon`"
      :src="require(`../../assets/media/icons/${icon}.svg`)"
      :size="size"
      :color-attribute="colorAttribute"
      :error="error"
    />
  </button>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';

  import { SizeType, SvgIconType } from '../../types';

  import SvgIcon from './svg-icon.component.vue';

  const baseClass = 'icon-button';

  defineProps({
    size: {
      type: String as PropType<SizeType>,
      default: 'normal'
    },
    icon: {
      type: String,
      required: true
    },
    colorAttribute: {
      type: String as PropType<SvgIconType>,
      default: undefined
    },
    haveBorder: Boolean,
    error: Boolean
  });

  defineEmits(['click']);
</script>

<style scoped lang="scss">
  .icon-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;

    &--small {
      width: 1.5rem;
      height: 1.5rem;
    }

    &--normal {
      width: 2rem;
      height: 2rem;
    }

    &--large {
      width: 3rem;
      height: 3rem;
    }

    &__icon {
      display: flex;
    }

    &--border {
      border: 2px solid var(--color-main);
      border-radius: 50%;
      padding: 1rem;

      &:hover {
        border: 2px solid var(--bg-fill-button-hover);
        background: var(--bg-fill-button-hover);
      }
    }
  }
</style>
