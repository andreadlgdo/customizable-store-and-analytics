<template>
  <div :class="baseClass">
    <div 
      :class="`${baseClass}__header`" 
      @click="toggleExpanded"
    >
      <h3 :class="`${baseClass}__title`">{{ title }}</h3>
      <div :class="`${baseClass}__icon ${expanded ? 'expanded' : ''}`">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M7 10l5 5 5-5z" />
        </svg>
      </div>
    </div>
    <div 
      v-if="expanded" 
      :class="`${baseClass}__content`"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
  title: string;
  initialExpanded?: boolean;
}>();

const baseClass = 'ui-expand-section';
const expanded = ref(props.initialExpanded || false);

const toggleExpanded = () => {
  expanded.value = !expanded.value;
};
</script>

<style lang="scss" scoped>
.ui-expand-section {
  border-radius: 6px;
  margin-bottom: 12px;
  border: 2px solid var(--color-dark-primary);
  overflow: hidden;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background-color: transparent;
    cursor: pointer;
    user-select: none;
  }

  &__title {
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
  }

  &__icon {
    transition: transform 0.2s ease;

    &.expanded {
      transform: rotate(180deg);
    }
  }

  &__content {
    padding: 16px;
    background-color: transparent;
  }
}
</style>