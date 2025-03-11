<template>
  <div :class="baseClass">
    <p
      :class="[`${baseClass}__label`, { [`${baseClass}__label--selected`]: option.selected }]"
      v-for="(option, index) in options"
      :key="index"
    >
      {{ index + 1 + '. ' + option.label }}
    </p>
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';

  const baseClass = 'ui-label-legend';

  interface Legend {
    label: string;
    selected: boolean;
  }

  defineProps({
    options: {
      type: Array as PropType<Legend[]>,
      required: true
    }
  });
</script>

<style lang="scss" scoped>
  .ui-label-legend {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;

    &__label {
      font-size: 18px;

      &--selected {
        font-weight: bold;
      }
    }
  }
</style>
