<template>
  <ui-header @openMenu="isOpenMenu = true" @openUserMenu="isOpenUserAside = true" />
  <ui-user-menu
    v-if="user"
    @close="isOpenUserAside = !isOpenUserAside"
    @logOut="logOut"
    :is-open="isOpenUserAside"
  />
  <ui-user-register
    v-else
    @logIn="logIn"
    @signUp="signUp"
    @close="isOpenUserAside = !isOpenUserAside"
    :is-open="isOpenUserAside"
    :error="invalidCredentials"
  />
  <ui-menu @close="isOpenMenu = !isOpenMenu" :is-open="isOpenMenu" />
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  import UiHeader from '../components/shared/ui-header.component.vue';
  import UiUserMenu from '../components/shared/menu/ui-user-menu.component.vue';
  import UiMenu from '../components/shared/menu/ui-menu.component.vue';
  import UiUserRegister from '../components/shared/menu/ui-user-register.component.vue';

  import { useUsers } from '../composables';
  import { User } from '../interfaces';

  const { user, createUser, logout, login } = useUsers();

  const isOpenUserAside = ref(false);
  const invalidCredentials = ref('');
  const isOpenMenu = ref(false);

  const logOut = () => {
    logout();
  };

  const logIn = async (newUser: User) => {
    const error = await login(newUser.email, newUser.password);
    if (error) {
      invalidCredentials.value = 'Incorrect credentials';
    }
  };

  const signUp = async (newUser: User) => {
    user.value = await createUser({
      name: newUser.name,
      surname: newUser.surname,
      email: newUser.email,
      password: newUser.password
    });
  };
</script>

<style lang="scss" scoped></style>
