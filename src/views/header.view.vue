<template>
  <ui-header
    @openMenu="isOpenMenu = true"
    @openUserMenu="isOpenUserAside = true"
    @openWhistList="isOpenWhistList = true"
    @openShoppingCart="isOpenShoppingCart = true"
  />
  <ui-menu @close="isOpenMenu = !isOpenMenu" :is-open="isOpenMenu" />
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
  <ui-whist-list @close="isOpenWhistList = !isOpenWhistList" :is-open="isOpenWhistList" />
  <ui-shopping-cart
    @close="isOpenShoppingCart = !isOpenShoppingCart"
    :is-open="isOpenShoppingCart"
  />
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';

  import UiHeader from '../components/shared/ui-header.component.vue';
  import UiUserMenu from '../components/shared/menu/ui-user-menu.component.vue';
  import UiMenu from '../components/shared/menu/ui-menu.component.vue';
  import UiUserRegister from '../components/shared/menu/ui-user-register.component.vue';
  import UiWhistList from '../components/shared/menu/ui-whist-list.component.vue';
  import UiShoppingCart from '../components/shared/menu/ui-shopping-cart.component.vue';

  import { useUsers } from '../composables';
  import { User } from '../interfaces';


  const { user, createUser, logout, login } = useUsers();

  const isOpenMenu = ref(false);
  const isOpenUserAside = ref(false);
  const isOpenWhistList = ref(false);
  const isOpenShoppingCart = ref(false);

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

  watch(
    () => [isOpenUserAside.value, isOpenWhistList.value, isOpenShoppingCart.value],
    ([userAside, whistList, shoppingCart]) => {
      if ([userAside, whistList, shoppingCart].some(Boolean)) {
        isOpenMenu.value = false;
      }
    }
  );

  watch(
    () => isOpenMenu.value,
    () => {
      if (isOpenMenu.value) {
        isOpenUserAside.value = false;
        isOpenWhistList.value = false;
        isOpenShoppingCart.value = false;
      }
    }
  );
</script>

<style lang="scss" scoped></style>
