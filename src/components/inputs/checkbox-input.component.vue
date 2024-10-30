<template>
  <div :class="[baseClass, `${baseClass}--${size}`]">
    <input
      v-model="isChecked"
      @change="$emit('selectCheckbox', isChecked)"
      :class="`${baseClass}__input`"
      type="checkbox"
    />
    <p v-if="$slots.default" :class="`${baseClass}__text`">{{ text }}</p>
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { PropType, ref } from 'vue';

  import { SizeType } from '../../types';

  const baseClass = 'checkbox-input';

  defineProps({
    text: String,
    size: {
      type: String as PropType<SizeType>,
      default: 'normal'
    }
  });

  defineEmits(['selectCheckbox']);

  const isChecked = ref(false);
</script>

<style lang="scss" scoped>
  .checkbox-input {
    $baseClass: &;

    display: flex;
    align-items: center;
    gap: 0.2rem;

    &--small {
      #{$baseClass}__input {
        width: 12px;
        height: 12px;
      }

      #{$baseClass}__text {
        font-size: 12px;
      }
    }

    &--normal {
      #{$baseClass}__input {
        width: 14px;
        height: 14px;
      }

      #{$baseClass}__text {
        font-size: 16px;
      }
    }

    &--large {
      #{$baseClass}__input {
        width: 14px;
        height: 14px;
      }

      #{$baseClass}__text {
        font-size: 20px;
      }
    }
  }
</style>
