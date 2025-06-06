<template>
  <UiAside
    @click="isCollapsed = !isCollapsed"
    icon="menu"
    :is-collapsed="isCollapsed"
    :fixed="false"
    is-open
  >
    <div v-if="!isCollapsed" :class="`${baseClass}__user`">
      <p :class="`${baseClass}__text ${baseClass}__text--name`">
        {{ user?.name + ' ' + user?.surname }}
      </p>
      <p :class="`${baseClass}__text ${baseClass}__text--email`">{{ user?.email }}</p>
    </div>
    <UiList
      @click="clickItem"
      :items="menuElements"
      :is-collapsed="isCollapsed"
      :selected-item="selectedItem"
    />
  </UiAside>
</template>

<script lang="ts" setup>
  import { PropType, ref } from 'vue';
  import { useRouter } from 'vue-router';

  import UiAside from '../shared/ui-aside.component.vue';
  import UiList from '../shared/ui-list.component.vue';

  import { useUsers, useUserMenu } from '../../composables';
  import { MenuItem } from '../../interfaces';

  const baseClass = 'ui-dashboard-menu';

  const { menuElements } = useUserMenu();
  const { user } = useUsers();

  const router = useRouter();

  defineProps({
    selectedItem: {
      type: Object as PropType<MenuItem>,
      required: true
    }
  });

  const isCollapsed = ref(false);

  const clickItem = (item: MenuItem) => {
    router.push({
      name: item.route?.name
    });
  };
</script>

<style lang="scss" scoped>
  .ui-dashboard-menu {
    &__user {
      padding: 18px 32px;
      margin: 0 6px;
      border-bottom: 1px solid var(--bg-grey);
    }

    &__text {
      &--name {
        font-weight: bold;
      }
    }
  }
</style>
