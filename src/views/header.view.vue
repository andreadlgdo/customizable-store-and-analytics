<template>
  <ui-header @openUserMenu="isOpenUserAside = true" />
  <ui-user-menu
    v-if="user"
    @close="isOpenUserAside = !isOpenUserAside"
    @logOut="logOut"
    :is-open="isOpenUserAside"
  />
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  import UiHeader from '../components/shared/ui-header.component.vue';
  import UiUserMenu from '../components/shared/menu/ui-user-menu.component.vue';

  import { useUsers } from '../composables';

  const { user, logout } = useUsers();

  const isOpenUserAside = ref(false);

  const logOut = () => {
    logout();
    isOpenUserAside.value = false;
  };
</script>

<style lang="scss" scoped></style>
