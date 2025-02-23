<template>
  <div :class="baseClass">
    <base-table
      @edit="item => $emit('edit', item)"
      @delete="item => $emit('delete', item)"
      :columns="columns"
      :data="users"
      editable
      removable
    >
      <template v-slot:type="{ data }">
        <base-pill
          :text="data"
          text-size="small"
          :color="data === 'admin' ? 'warning' : 'success'"
        />
      </template>
    </base-table>
  </div>
</template>

<script lang="ts" setup>
  import { computed, PropType } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { User } from '../../../interfaces';

  import BasePill from '../../base-pill.component.vue';
  import BaseTable from '../../base-table.component.vue';

  const { t } = useI18n();

  const baseClass = 'users-table';

  defineProps({
    users: {
      type: Array as PropType<User[]>,
      required: true
    }
  });

  defineEmits(['edit', 'delete']);

  const columns = computed(() => [
    { id: '_id', label: t('dashboard.users.table.id') },
    { id: 'email', label: t('dashboard.users.table.email') },
    { id: 'type', label: t('dashboard.users.table.type') }
  ]);
</script>

<style lang="scss" scoped>
  .users-table {
    height: 72vh;
    overflow-y: scroll;
  }
</style>
