<template>
  <table v-if="data.length" :class="baseClass">
    <thead>
      <tr>
        <th
          v-for="column in columns"
          :key="column.id"
          :class="`${baseClass}__column`"
          :style="{ textAlign: column.textAlign ?? 'left' }"
        >
          {{ column.label }}
        </th>
        <th v-if="editable" :class="`${baseClass}__column`" />
        <th v-if="removable" :class="`${baseClass}__column`" />
        <th v-if="details" :class="`${baseClass}__column`" />
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item" :class="`${baseClass}__row`">
        <td
          v-for="column in columns"
          :key="column.id"
          :class="`${baseClass}__cell ${baseClass}__cell--custom`"
          :style="{ textAlign: column.textAlign ?? 'left' }"
        >
          <slot :name="column.id" :data="item[column?.id]">{{ item[column?.id] ?? '-' }}</slot>
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
  import { PropType } from 'vue';

  import UiIconButton from '../shared/ui-icon-button.component.vue';

  interface Column {
    id: string;
    label: string;
    textAlign?: string;
  }

  defineProps({
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
  }
</style>
