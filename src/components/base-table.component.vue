<template>
  <table v-if="data.length" :class="baseClass">
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.id" :class="`${baseClass}__column`">
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item" :class="`${baseClass}__row`">
        <td
          v-for="column in columns"
          :key="column.id"
          :class="`${baseClass}__cell`"
          :style="{ textAlign: column.textAlign ?? 'left' }"
        >
          <slot :name="column.id" :data="item[column?.id]">{{ item[column?.id] }}</slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';

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
    }
  });

  const baseClass = 'base-table';
</script>

<style lang="scss" scoped>
  .base-table {
    width: 100%;
    border-collapse: collapse;

    &__column {
      padding: 12px;
      text-align: left;
      border-bottom: 2px solid var(--color-border-primary);
    }

    &__cell {
      padding: 16px;
      border-bottom: 1px solid var(--color-border-default);
    }
  }
</style>
