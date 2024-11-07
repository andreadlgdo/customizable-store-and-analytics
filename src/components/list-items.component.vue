<template>
  <section :class="baseClass">
    <div v-for="(item, index) in items" :key="index" :class="`${baseClass}__item`">
      <base-text tag="h4">{{ item.label }}</base-text>
      <icon-button v-if="item.subMenu" icon="arrow" size="small" />
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';

  import BaseText from './base-text.component.vue';
  import { IconButton } from './icons';

  interface Item {
    label: string;
    subMenu?: string[];
    image?: string;
  }

  const baseClass = 'list-items';

  defineProps({
    items: {
      type: Array as PropType<Item[]>,
      required: true
    }
  });
</script>

<style lang="scss" scoped>
  .list-items {
    display: flex;
    width: 100%;
    flex-direction: column;

    &__item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      border-bottom: 1px solid var(--color-medium);
    }
  }
</style>
