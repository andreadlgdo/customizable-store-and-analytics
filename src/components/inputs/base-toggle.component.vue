<template>
  <div
    :class="[baseClass, { [`${baseClass}--shadow`]: haveShadow }]"
    :style="{
      '--background-color': `var(--color-${color})`,
      '--selected-color': `var(--color-border-${color})`
    }"
  >
    <div
      @click="selectFirst"
      :class="[
        `${baseClass}__wrapper`,
        { [`${baseClass}__wrapper--selected`]: toggleItem.first.selected }
      ]"
    >
      <base-text tag="default">{{ toggleItem.first.value }}</base-text>
    </div>
    <div
      @click="selectSecond"
      :class="[
        `${baseClass}__wrapper`,
        { [`${baseClass}__wrapper--selected`]: toggleItem.second.selected }
      ]"
    >
      <base-text tag="default">{{ toggleItem.second.value }}</base-text>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { PropType, ref } from 'vue';

  import { ColorType } from '../../types';

  import BaseText from '../base-text.component.vue';

  interface ToggleItem {
    first: {
      value: string;
      selected: boolean;
    };
    second: {
      value: string;
      selected: boolean;
    };
  }

  const baseClass = 'base-toggle';

  const props = defineProps({
    item: {
      type: Object as PropType<ToggleItem>,
      required: true
    },
    color: {
      type: String as PropType<ColorType>,
      default: 'default'
    },
    haveShadow: Boolean
  });

  const toggleItem = ref(props.item);

  const selectSecond = () => {
    toggleItem.value.second.selected = true;
    toggleItem.value.first.selected = false;
  };

  const selectFirst = () => {
    toggleItem.value.second.selected = false;
    toggleItem.value.first.selected = true;
  };
</script>

<style lang="scss" scoped>
  .base-toggle {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    width: 320px;
    height: 50px;
    border-radius: 30px;
    padding: 0 6px;
    background-color: var(--background-color);

    &--shadow {
      box-shadow: var(--shadow-button);
    }

    &__wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      border-radius: 30px;
      cursor: pointer;

      &--selected {
        background: var(--selected-color);
      }
    }
  }
</style>
