<template>
  <div :class="[baseClass, { [`${baseClass}--border`]: border }]">
    <section
      v-for="(option, index) in options"
      :key="index"
      @click="$emit('click', option)"
      :class="[`${baseClass}__section`, { [`${baseClass}__section--selected`]: option.selected }]"
    >
      {{ option.label }}
    </section>
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';

  export interface ToggleOption {
    label: string;
    selected: boolean;
  }
  
  const baseClass = 'ui-toggle';

  defineProps({
    options: {
      type: Array as PropType<
        {
          label: string;
          selected: boolean;
        }[]
      >,
      required: true
    },
    border: Boolean,
    background: {
      type: String,
      default: 'var(--color-soft-primary)'
    },
    selectedColor: {
      type: String,
      default: 'var(--color-medium-primary)'
    }
  });

  defineEmits(['click']);
</script>

<style lang="scss" scoped>
  .ui-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
    height: 3rem;
    width: 100%;
    background: v-bind(background);
   
    &--border {
      border: 1px solid var(--color-vibrant-primary);
    }

    &__section {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 4px;
      height: 2.5rem;
      width: 50%;
      border-radius: 25px;
      cursor: pointer;

      &--selected {
        background: v-bind(selectedColor);
      }
    }
  }
</style>
