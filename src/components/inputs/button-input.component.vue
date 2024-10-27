<template>
  <button
    :class="[baseClass, `${baseClass}--${type}`, `${baseClass}--${size}`]"
    @click="$emit('click')"
  >
    {{ text }}
  </button>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';

  import { ButtonType, SizeType } from '../../types';

  const baseClass = 'button';

  defineProps({
    text: {
      type: String,
      required: true
    },
    type: {
      type: String as PropType<ButtonType>,
      default: 'stroke'
    },
    size: {
      type: String as PropType<SizeType>,
      default: 'normal'
    }
  });

  defineEmits(['click']);
</script>

<style lang="scss" scoped>
  .button {
    height: 42px;
    border-radius: 20px;
    font-size: 18px;
    cursor: pointer;

    &--stroke {
      border: 2px solid var(--color-main);
      color: var(--color-main);
      background: var(--bg-main);

      &:hover {
        border: 3px solid var(--color-main);
      }
    }

    &--fill {
      border: none;
      color: var(--color-main);
      background: var(--bg-fill-button);

      &:hover {
        background: var(--bg-fill-button-hover);
      }
    }

    &--mini {
      width: 120px;
      height: 30px;
      font-size: 14px;
    }

    &--small {
      width: 180px;
      font-size: 16px;
    }

    &--normal {
      width: 224px;
    }

    &--large {
      width: 324px;
    }
  }
</style>
