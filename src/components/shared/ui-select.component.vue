<template>
  <div :class="[baseClass, { [`${baseClass}--disabled`]: disabled }]">
    <p v-if="label">{{ label }}</p>
    <select
      @change="$emit('change', $event.target.value)"
      :id="1"
      :value="value ?? placeholder"
      :class="`${baseClass}__select`"
    >
      <option>{{ placeholder }}</option>
      <option v-for="(option, index) in options" :key="index" :value="option.title">
        {{ capitalizeSentence(option.title) }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';

  import { useTextTransform } from '../../composables';

  const baseClass = 'ui-select';

  const { capitalizeSentence } = useTextTransform();

  defineProps({
    value: {
      type: String,
      required: true
    },
    options: {
      type: Array as PropType<{ title: string }[]>,
      default: () => []
    },
    label: String,
    placeholder: String,
    disabled: Boolean
  });

  defineEmits(['change']);
</script>

<style lang="scss" scoped>
  .ui-select {
    width: 100%;

    &__select {
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
