<template>
  <div :class="[baseClass, { [`${baseClass}--disabled`]: disabled }]">
    <p v-if="label">{{ label }}</p>
    <input
      type="text"
      :value="value"
      :placeholder="placeholder"
      :class="`${baseClass}__input`"
      disabled
    />
  </div>
</template>

<script lang="ts" setup>
  const baseClass = 'ui-textbox';

  defineProps({
    value: {
      type: String,
      required: true
    },
    label: String,
    placeholder: String,
    disabled: Boolean
  });
</script>

<style lang="scss" scoped>
  .ui-textbox {
    width: 100%;

    &__input {
      outline: none;
      padding: 10px 16px;
      width: 100%;
      border-radius: 10px;
      border: 1px solid var(--color-dark-primary);
      background: var(--bg-transparent);

      &:focus {
        border: 2px solid var(--color-dark-primary);
      }
    }

    &--disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
</style>
