<template>
  <div>
    <label :class="[baseClass, {[`${baseClass}--disabled`]: disabled }]">
      <input
        @change="$emit('change')"
        :checked="value"
        type="checkbox"
        :class="`${baseClass}__checkbox`"
        :disabled="disabled"
      />
      <span>
        {{ text }}
      </span>
    </label>
    <p v-if="!!error" :class="`${baseClass}__text`">{{ error }}</p>
  </div>
</template>

<script lang="ts" setup>
  const baseClass = 'ui-checkbox';

  defineProps({
    value: {
      type: Boolean,
      required: true
    },
    text: String,
    error: String,
    disabled: Boolean
  });

  defineEmits(['change']);
</script>

<style lang="scss" scoped>
  .ui-checkbox {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &--disabled {
      opacity: 0.5;
      cursor: none;
    }

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

      &:disabled {
        cursor: default;
      }
    }

    &__text {
      font-size: 12px;
      padding-left: 32px;
      color: var(--color-red);
    }
  }
</style>
