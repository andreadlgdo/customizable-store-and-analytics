<template>
  <section :class="[baseClass, { [`${baseClass}--collapsed`]: isCollapsed }]">
    <div
      @click="$emit('click', item)"
      v-for="item in items"
      :key="item.id"
      :class="[
        `${baseClass}__item`,
        { [`${baseClass}__item--selected`]: selectedItem?.id === item.id }
      ]"
    >
      <UiIcon
        :src="require(`../../assets/media/icons/${item.icon}.svg`)"
        :class="`${baseClass}__icon`"
      />
      <p v-if="!isCollapsed">{{ item.label }}</p>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';

  import UiIcon from '@/components/shared/ui-icon.component.vue';

  interface Item {
    id: number;
    label: string;
    description?: string;
    children?: Item[];
    image?: string;
    icon?: string;
  }

  const baseClass = 'list-items';

  defineProps({
    items: {
      type: Array as PropType<Item[]>,
      required: true
    },
    selectedItem: {
      type: Object as PropType<Item>,
      required: true
    },
    isCollapsed: Boolean
  });

  defineEmits(['click']);
</script>

<style lang="scss" scoped>
  .list-items {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 1rem 2rem;

    &--collapsed {
      align-items: center;
      padding: 5rem 0;
    }

    &__item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 18px;
      cursor: pointer;

      &--selected {
        background: var(--color-primary);
        border-radius: 10px;
      }

      &:hover {
        background: var(--color-soft-primary);
        border-radius: 10px;
      }
    }

    &__icon {
      height: 24px;
      width: 24px;
    }
  }
</style>
