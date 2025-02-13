<template>
  <button
    @click="$emit('click')"
    :class="[baseClass, { [`${baseClass}--transparent`]: transparent }]"
  >
    <ui-icon
      v-if="icon"
      :src="require(`../../assets/media/icons/${icon}.svg`)"
      :class="`${baseClass}__icon`"
    />
    <p v-if="text">{{ text }}</p>
  </button>
</template>

<script lang="ts" setup>
  import UiIcon from './ui-icon.component.vue';

  const baseClass = 'ui-button';

  defineProps({
    text: String,
    icon: String,
    transparent: Boolean
  });

  defineEmits(['click']);
</script>

<style lang="scss" scoped>
  .ui-button {
    $baseClass: &;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    border-radius: 12px;
    border: none;
    background-color: var(--color-vibrant-primary);
    cursor: pointer;

    &:hover {
      background-color: var(--color-dark-primary);
    }

    &--transparent {
      background-color: var(--bg-transparent);
      border: 1px solid var(--color-dark-primary);

      &:hover {
        background-color: var(--color-primary);
      }
    }

    &__icon {
      height: 20px;
      width: 20px;
    }
  }
</style>
