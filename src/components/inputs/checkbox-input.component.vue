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
  import { SizeType } from '../../types/size.type';

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
    $base-class: &;

    display: flex;
    align-items: center;
    gap: 0.2rem;

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
