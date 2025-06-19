<template>
  <ui-header
    @openMenu="emit('updateMenu', true)"
    @openUserMenu="emit('updateUserMenu', true)"
    @openWhistList="emit('updateWhistList', true)"
    @openShoppingCart="emit('updateShoppingCart', true)"
    :transparent="transparent"
    :fixed="fixed"
  />
  <ui-menu @close="emit('updateMenu', !openedMenu)" :is-open="openedMenu" />
  <ui-user-menu
    v-if="user"
    @close="emit('updateUserMenu', !openedUserMenu)"
    @logOut="logOut"
    :is-open="openedUserMenu"
  />
  <ui-user-register
    v-else
    @logIn="logIn"
    @signUp="signUp"
    @close="emit('updateUserMenu', !openedUserMenu)"
    :is-open="openedUserMenu"
    :errorLogIn="invalidCredentialsLogin"
    :errorSignUp="repeatedCredentialsEmail"
  />
  <ui-whist-list
    @addToCart="p => emit('addToCart', p)"
    @selectFavourite="emit('selectFavourite')"
    @close="emit('updateWhistList', !openedWhistList)"
    :is-open="openedWhistList"
  />
  <ui-shopping-cart
    @selectFavourite="emit('selectFavourite')"
    @close="emit('updateShoppingCart', !openedShoppingCart)"
    :is-open="openedShoppingCart"
  />
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  import UiHeader from '../components/shared/ui-header.component.vue';
  import UiUserMenu from '../components/menu/ui-user-menu.component.vue';
  import UiMenu from '../components/menu/ui-menu.component.vue';
  import UiUserRegister from '../components/menu/ui-user-register.component.vue';
  import UiWhistList from '../components/menu/ui-whist-list.component.vue';
  import UiShoppingCart from '../components/menu/ui-shopping-cart.component.vue';

  import { useUsers } from '../composables';
  import { User } from '../interfaces';

  const { user, getUsers, createUser, logout, login } = useUsers();

  defineProps({
    openedMenu: Boolean,
    openedUserMenu: Boolean,
    openedWhistList: Boolean,
    openedShoppingCart: Boolean,
    transparent: Boolean,
    fixed: Boolean
  });

  const emit = defineEmits([
    'updateMenu',
    'updateUserMenu',
    'updateWhistList',
    'updateShoppingCart',
    'addToCart',
    'selectFavourite'
  ]);

  const invalidCredentialsLogin = ref('');
  const repeatedCredentialsEmail = ref('');

  const logOut = () => {
    logout();
    emit('updateUserMenu', false)
  };

  const logIn = async (newUser: User) => {
    const error = await login(newUser.email, newUser.password);
    if (error) {
      invalidCredentialsLogin.value = 'Credenciales incorrectas';
    }
  };

  const signUp = async (newUser: User) => {
    const users = await getUsers();
    const userExists = users.find(user => user.email === newUser.email);
    if (userExists) {
      repeatedCredentialsEmail.value = 'El usuario ya existe';
      return;
    }
    user.value = await createUser({
      name: newUser.name,
      surname: newUser.surname,
      email: newUser.email,
      password: newUser.password
    });
  };
</script>

<style lang="scss" scoped></style>
