<template>
  <ui-header @openUserMenu="isOpenUserAside = true" />
  <ui-user-menu
    v-if="user"
    @close="isOpenUserAside = !isOpenUserAside"
    @logOut="logOut"
    :is-open="isOpenUserAside"
  />
  <ui-user-register
    v-else
    @logIn="logIn"
    @close="isOpenUserAside = !isOpenUserAside"
    :is-open="isOpenUserAside"
    :error="invalidCredentials"
  />
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  import UiHeader from '../components/shared/ui-header.component.vue';
  import UiUserMenu from '../components/shared/menu/ui-user-menu.component.vue';
  import UiUserRegister from '../components/shared/menu/ui-user-register.component.vue';

  import { useUsers } from '../composables';
  import { User } from '../interfaces';

  const { user, logout, login } = useUsers();

  const isOpenUserAside = ref(false);
  const invalidCredentials = ref('');

  const logOut = () => {
    logout();
    isOpenUserAside.value = false;
  };

  const logIn = async (newUser: User) => {
    const error = await login(newUser.email, newUser.password);
    if (error) {
      invalidCredentials.value = 'Incorrect credentials';
    } else {
      isOpenUserAside.value = false;
    }
  };
</script>

<style lang="scss" scoped></style>
