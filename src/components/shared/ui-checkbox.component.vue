<template>
  <label :class="baseClass">
    <input
      @change="$emit('change')"
      :checked="value"
      type="checkbox"
      :class="`${baseClass}__checkbox`"
    />
    {{ text }}
  </label>
</template>

<script lang="ts" setup>
  const baseClass = 'ui-checkbox';

  defineProps({
    value: {
      type: Boolean,
      required: true
    },
    text: String
  });

  defineEmits(['change']);
</script>

<style lang="scss" scoped>
  .ui-checkbox {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &__checkbox {
      appearance: none;
      -webkit-appearance: none;
      width: 24px;
      height: 24px;
      border: 2px solid var(--color-dark-primary);
      border-radius: 50%;
      outline: none;
      cursor: pointer;
      position: relative;
      transition:
        background-color 0.2s,
        border-color 0.2s;

      &:checked {
        background-color: var(--color-dark-primary);
        border-color: var(--color-dark-primary);
      }

      &::after {
        content: '';
        position: absolute;
        top: 5px;
        left: 5px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }

      &:checked::after {
        background-color: white;
      }
    }
  }
</style>
