<template>
  <button
    :class="baseClass"
    @click="(event) => $emit('click', event)"
    :aria-label="tooltipText ?? icon ?? 'icon button'"
  >
    <UiIcon
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
      :class="`${baseClass}__icon`"
      :src="require(`../../assets/media/icons/${icon}.svg`)"
      :size="size"
    />
    <BaseTooltip
      v-if="isHovered && tooltipText"
      :text="tooltipText"
    />
  </button>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue';
import { SizeType } from '@/types';
import { BaseTooltip } from '@/components/inputs';
import UiIcon from '@/components/shared/ui-icon.component.vue';

const baseClass = 'ui-icon-button';
const isHovered = ref(false);

defineProps({
  icon: {
    type: String,
    required: true
  },
  size: {
    type: String as PropType<SizeType>,
    default: 'normal'
  },
  tooltipText: String
});

defineEmits(['click']);
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
