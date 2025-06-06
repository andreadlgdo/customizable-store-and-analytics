<template>
  <table v-if="data.length" :class="baseClass">
    <thead>
      <tr>
        <th
          v-for="column in columns"
          :key="column.id"
          :class="`${baseClass}__column`"
          :style="getThStyle(column)"
          @click="column.sortable && sort(column.id)"
        >
          {{ column.label }}
          <span v-if="column.sortable" :class="`${baseClass}__arrows`">
            <span v-if="sortBy === column.id">
              <span v-if="sortDirection === 'asc'" class="`${baseClass}__arrow`">▲</span>
              <span v-else-if="sortDirection === 'desc'" class="`${baseClass}__arrow`">▼</span>
            </span>
            <span v-else class="`${baseClass}__arrow ${baseClass}__arrow--inactive`">▲▼</span>
          </span>
        </th>
        <th v-if="editable" :class="`${baseClass}__column`" />
        <th v-if="removable" :class="`${baseClass}__column`" />
        <th v-if="details" :class="`${baseClass}__column`" />
      </tr>
    </thead>
    <tbody>
      <tr 
        v-for="(item, rowIndex) in sortedData" 
        :key="(item as any).id ?? rowIndex" 
        :class="`${baseClass}__row`"
      >
        <td
          v-for="column in columns"
          :key="column.id"
          :class="`${baseClass}__cell ${baseClass}__cell--custom`"
          :style="{ textAlign: column.textAlign ?? 'left' }"
        >
          <slot :name="column.id" :data="(item as any)[column?.id]">{{ (item as any)[column?.id] ?? '-' }}</slot>
        </td>
        <td
          v-if="editable"
          :style="{ textAlign: 'center' }"
          :class="`${baseClass}__cell ${baseClass}__cell--icon`"
        >
          <UiIconButton @click="$emit('edit', item)" icon="edit" size="small" tooltip-text="Edit" />
        </td>
        <td
          v-if="removable"
          :style="{ textAlign: 'center' }"
          :class="`${baseClass}__cell ${baseClass}__cell--icon`"
        >
          <UiIconButton
            @click="$emit('delete', item)"
            icon="delete"
            size="small"
            tooltip-text="Delete"
          />
        </td>
        <td
          v-if="details"
          :style="{ textAlign: 'center' }"
          :class="`${baseClass}__cell ${baseClass}__cell--icon`"
        >
          <UiIconButton
            @click="$emit('seeDetails', item)"
            icon="eye"
            size="small"
            tooltip-text="See details"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
  import { PropType, ref, computed } from 'vue';

  import UiIconButton from '@/components/shared/ui-icon-button.component.vue';

  interface Column {
    id: string;
    label: string;
    textAlign?: string;
    sortable?: boolean;
  }

  const props = defineProps({
    columns: {
      type: Array as PropType<Column[]>,
      required: true
    },
    data: {
      type: Array as PropType<unknown[]>,
      default: () => []
    },
    editable: Boolean,
    removable: Boolean,
    details: Boolean
  });

  defineEmits(['edit', 'delete','seeDetails']);

  const baseClass = 'ui-table';

  const sortBy = ref<string | null>(null);
  const sortDirection = ref<'asc' | 'desc'>('asc');

  function sort(columnId: string) {
    if (sortBy.value === columnId) {
      if (sortDirection.value === 'asc') {
        sortDirection.value = 'desc';
      } else if (sortDirection.value === 'desc') {
        sortBy.value = null;
        sortDirection.value = 'asc';
      }
    } else {
      sortBy.value = columnId;
      sortDirection.value = 'asc';
    }
  }

  const sortedData = computed(() => {
    if (!sortBy.value) return props.data;
 
    return [...props.data].sort((a: any, b: any) => {
      const aValue = a?.[sortBy.value!];
      const bValue = b?.[sortBy.value!];
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection.value === 'asc' ? aValue - bValue : bValue - aValue;
      }
      return sortDirection.value === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  });

  function getThStyle(column: Column) {
    let style = `text-align: ${column.textAlign ?? 'left'};`;
    if (column.sortable) style += 'cursor: pointer;';
    return style;
  }
</script>

<style lang="scss" scoped>
  .ui-table {
    width: 100%;
    border-collapse: collapse;

    &__column {
      padding: 12px;
      text-align: left;
      border-bottom: 2px solid var(--color-border-primary);
    }

    &__cell {
      border-bottom: 1px solid var(--color-border-default);

      &--custom {
        padding: 16px;
      }

      &--icon {
        padding: 8px;
      }
    }

    &__arrows {
      margin-left: 4px;
      font-size: 0.85em;
      color: var(--color-border-default);
      user-select: none;
    }

    &__arrow {
      color: #b0b0b0;
      font-size: 0.85em;
      vertical-align: middle;
      transition: color 0.2s;

      &--inactive {
        color: #e0e0e0;
      }
    }
  }
</style>
