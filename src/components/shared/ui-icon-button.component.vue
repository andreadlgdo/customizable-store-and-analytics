<template>
  <button :class="baseClass" @click="$emit('click')">
    <ui-icon
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
      :class="`${baseClass}__icon`"
      :src="require(`../../assets/media/icons/${icon}.svg`)"
    />
    <base-tooltip v-if="isHovered && tooltipText" :text="tooltipText" />
  </button>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  import { BaseTooltip } from '../inputs';

  import UiIcon from './ui-icon.component.vue';

  const baseClass = 'ui-icon-button';

  defineProps({
    icon: {
      type: String,
      required: true
    },
    tooltipText: String
  });

  defineEmits(['click']);

  const isHovered = ref(false);
</script>

<style scoped lang="scss">
  .ui-icon-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;

    &__icon {
      display: flex;
    }
  }
</style>
