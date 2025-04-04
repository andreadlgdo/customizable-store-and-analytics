<template>
  <ui-header
    @openMenu="emit('updateMenu', true)"
    @openUserMenu="emit('updateUserMenu', true)"
    @openWhistList="emit('updateWhistList', true)"
    @openShoppingCart="emit('updateShoppingCart', true)"
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
    :error="invalidCredentials"
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
  import UiUserMenu from '../components/shared/menu/ui-user-menu.component.vue';
  import UiMenu from '../components/shared/menu/ui-menu.component.vue';
  import UiUserRegister from '../components/shared/menu/ui-user-register.component.vue';
  import UiWhistList from '../components/shared/menu/ui-whist-list.component.vue';
  import UiShoppingCart from '../components/shared/menu/ui-shopping-cart.component.vue';

  import { useUsers } from '../composables';
  import { User } from '../interfaces';

  const { user, createUser, logout, login } = useUsers();

  defineProps({
    openedMenu: Boolean,
    openedUserMenu: Boolean,
    openedWhistList: Boolean,
    openedShoppingCart: Boolean
  });

  const emit = defineEmits([
    'updateMenu',
    'updateUserMenu',
    'updateWhistList',
    'updateShoppingCart'
  ]);

  const invalidCredentials = ref('');

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
