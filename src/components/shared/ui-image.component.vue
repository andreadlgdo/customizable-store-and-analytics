<template>
  <span :class="baseClass">
    <img
      :class="`${baseClass}__image`"
      :src="image ?? require('../../assets/media/images/empty-user.png')"
      :alt="alternativeText ?? 'image'"
    />
    <icon-button
      v-if="uploadMode"
      icon="close"
      tooltip-text="Upload new image"
      :class="`${baseClass}__icon`"
    />
  </span>
</template>

<script lang="ts" setup>
  import IconButton from './ui-icon-button.component.vue';

  const baseClass = 'ui-image';

  defineProps({
    image: {
      type: String,
      default: undefined
    },
    alternativeText: String,
    uploadMode: Boolean
  });
</script>

<style lang="scss" scoped>
  .ui-image {
    position: relative;

    &__image {
      height: 8rem;
      width: 8rem;
      border-radius: 50%;
    }

    &__icon {
      position: absolute;
      bottom: 0;
      right: 0;
      background-color: var(--color-vibrant-primary);
      padding: 8px;
      border-radius: 50%;
    }
  }
</style>
