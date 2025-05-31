<template>
  <div :class="baseClass">
    <UiTextbox :label="label" @input="(value: string) => $emit('update:modelValue', value)" :value="modelValue" :info="info" />
    <input 
      type="color" 
      :value="modelValue" 
      @input="updateColor"
      :class="`${baseClass}__input`"
      :style="{ alignSelf: !label ? 'flex-start' : 'flex-end' }"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

import UiTextbox from './ui-textbox.component.vue';

const baseClass = 'ui-color-picker';

defineProps({
  modelValue: {
    type: String,
    default: '#000000'
  },
  label: String,
  info: String
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const updateColor = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<style lang="scss" scoped>
.ui-color-picker {
    display: flex;
    align-items: center;
    gap: 10px;

    &__input {
        width: 35px;
        height: 35px;
        padding: 0;
        border: none;
        cursor: pointer;
        
        &::-webkit-color-swatch-wrapper {
            padding: 0;
        }
        
        &::-webkit-color-swatch {
            border: none;
            border-radius: 4px;
        }
    }
}
</style>