<template>
  <img
    :class="baseClass"
    :src="image ?? require('../../assets/media/images/empty-user.png')"
    :alt="alternativeText ?? 'image'"
  />
</template>

<script lang="ts" setup>
  const baseClass = 'ui-image';

  defineProps({
    image: {
      type: String,
      default: undefined
    },
    alternativeText: String
  });
</script>

<style lang="scss" scoped>
  .ui-image {
    height: 8rem;
    width: 8rem;
  }
</style>
