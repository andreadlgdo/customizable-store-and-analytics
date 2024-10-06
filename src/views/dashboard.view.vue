<template>
  <header-layout />
  <div :class="baseClass">
    <div :class="`${baseClass}__menu`">
      <div :class="`${baseClass}__user-image`">
        <img
          :class="`${baseClass}__image`"
          :src="user?.imageUrl ?? require('../assets/media/images/empty.png')"
          alt="userImage"
        />
      </div>
      <menu-items :menu-items="menuElements" showDescription />
    </div>
    <div :class="`${baseClass}__landing`"></div>
  </div>
</template>

<script lang="ts" setup>
  import { useUsers } from '../composables/use-users';
  import { useUserMenu } from '../composables/use-user-menu';

  import HeaderLayout from './header-layout.view.vue';
  import MenuItems from '../components/menu/menu-items.component.vue';

  const baseClass = 'dashboard';

  const { user } = useUsers();

  const { menuElements } = useUserMenu();
</script>

<style lang="scss" scoped>
  .dashboard {
    display: flex;
    height: calc(100vh - 80px);

    &__menu {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 30%;
      overflow-y: auto;
    }

    &__landing {
      width: 70%;
      background: green;
      overflow-y: auto;
    }

    &__user-image {
      display: flex;
      justify-content: center;
      padding: 6rem 0 1rem;
      border-bottom: 1px solid var(--color-medium);
    }

    &__image {
      width: 14rem;
      height: 14rem;
      border-radius: 50%;
    }
  }
</style>
