<template>
  <div
    :class="[
      baseClass,
      { [`${baseClass}--disabled`]: disabled },
      { [`${baseClass}--error`]: !!error }
    ]"
  >
    <p v-if="label">{{ label }}</p>
    <input :type="type" v-model="query" :placeholder="placeholder" :class="`${baseClass}__input`" />
    <p v-if="error" :class="`${baseClass}__text`">{{ error }}</p>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';

  const baseClass = 'ui-textbox';

  const props = defineProps({
    value: {
      type: String,
      required: true
    },
    label: String,
    placeholder: String,
    type: {
      type: String,
      default: 'text'
    },
    disabled: Boolean,
    error: String
  });

  const emit = defineEmits(['input']);

  const query = ref(props.value);

  watch(
    () => query.value,
    () => {
      emit('input', query.value);
    }
  );

  watch(
    () => props.value,
    newValue => {
      query.value = newValue;
    },
    { immediate: true }
  );
</script>

<style lang="scss" scoped>
  .ui-textbox {
    $baseClass: &;

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

    &--error {
      #{$baseClass}__input {
        border: 1px solid var(--color-red);
        &:focus {
          border: 2px solid var(--color-red);
        }
      }
    }

    &--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    &__text {
      font-size: 12px;
      color: var(--color-red);
    }
  }
</style>
