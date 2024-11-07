<template>
  <section v-for="item in items" :key="item.id" :class="baseClass">
    <div :class="`${baseClass}__item`">
      <base-text tag="h4" :class="`${baseClass}__text ${baseClass}__text--item`">
        {{ item.label }}
      </base-text>
      <icon-button
        v-if="item.subItem"
        :icon="expansible ? 'plus' : 'arrow'"
        size="small"
        @click="expansible ? (isExpand = !isExpand) : $emit('clickSubItem', item)"
      />
    </div>
    <div v-if="item.subItem && expansible && isExpand" :class="`${baseClass}__subItem`">
      <base-text
        v-for="(subItem, index) in item.subItem"
        :key="index"
        tag="p"
        :class="`${baseClass}__text ${baseClass}__text--subItem`"
      >
        {{ subItem.label }}
      </base-text>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { PropType, ref } from 'vue';

  import BaseText from './base-text.component.vue';
  import { IconButton } from './icons';

  interface Item {
    id: number;
    label: string;
    subItem?: Item[];
    image?: string;
  }

  const baseClass = 'list-items';

  defineProps({
    items: {
      type: Array as PropType<Item[]>,
      required: true
    },
    expansible: Boolean
  });

  const isExpand = ref(false);
</script>

<style lang="scss" scoped>
  .list-items {
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 16px;
    border-bottom: 1px solid var(--color-medium);

    &__item {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__text {
      cursor: pointer;

      &--item {
        &:hover {
          color: var(--color-border-primary);
        }
      }

      &--subItem {
        &:hover {
          font-weight: bold;
        }
      }
    }

    &__subItem {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 8px;
    }
  }
</style>
