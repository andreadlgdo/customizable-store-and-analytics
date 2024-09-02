<template>
  <div :class="[baseClass, `${baseClass}--${size}`]">
    <input :class="`${baseClass}__input`" type="checkbox" />
    <p :class="`${baseClass}__text`">{{ text }}</p>
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';
  import { SizeType } from '../../types/size.type';

  const baseClass = 'checkbox-input';

  defineProps({
    text: String,
    size: {
      type: String as PropType<SizeType>,
      default: 'normal'
    }
  });
</script>

<style lang="scss" scoped>
  .checkbox-input {
    $base-class: &;

    display: flex;
    align-items: center;
    gap: 0.5rem;

    &--small {
      #{$base-class}__input {
        width: 12px;
        height: 12px;
      }

      #{$base-class}__text {
        font-size: 12px;
      }
    }

    &--normal {
      #{$base-class}__input {
        width: 14px;
        height: 14px;
      }

      #{$base-class}__text {
        font-size: 16px;
      }
    }

    &--large {
      #{$base-class}__input {
        width: 14px;
        height: 14px;
      }

      #{$base-class}__text {
        font-size: 20px;
      }
    }
  }
</style>
