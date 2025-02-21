<template>
  <div :class="baseClass">
    <ui-table
      @edit="item => $emit('edit', item)"
      @delete="item => $emit('delete', item)"
      :columns="columns"
      :data="users"
      editable
      removable
    ></ui-table>
  </div>
</template>

<script lang="ts" setup>
  import { computed, PropType } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { User } from '../../interfaces';

  import UiTable from '../shared/ui-table.component.vue';

  const { t } = useI18n();

  const baseClass = 'ui-users-list';

  defineProps({
    users: {
      type: Array as PropType<User[]>,
      required: true
    }
  });

  defineEmits(['edit', 'delete']);

  const columns = computed(() => [
    { id: '_id', label: t('dashboard.users.table.id') },
    { id: 'name', label: t('dashboard.users.table.name') },
    { id: 'email', label: t('dashboard.users.table.email') },
    { id: 'type', label: t('dashboard.users.table.type'), textAlign: 'center' }
  ]);
</script>

<style lang="scss" scoped>
  .ui-users-list {
    height: 72vh;
    overflow-y: scroll;
  }
</style>
