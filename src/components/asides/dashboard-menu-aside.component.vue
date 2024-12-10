<template>
  <base-aside :is-closeable="false" type="round" aside-position="left" is-open :class="baseClass">
    <section :class="`${baseClass}__user`">
      <div :class="`${baseClass}__image`" :style="{ backgroundImage: `url(${user.imageUrl})` }" />
      <div>
        <base-text tag="h3">{{ user.username }}</base-text>
        <base-text tag="p">{{ user.email }}</base-text>
      </div>
    </section>
    <div :class="`${baseClass}__items`">
      <list-items :items="menuElements" background />
    </div>
    <div :class="`${baseClass}__footer`">
      <base-button
        @click="goToHome"
        text="Volver al inicio"
        type="outline-solid"
        color="primary"
        have-shadow
      />
      <base-text @click="closeSession" :class="`${baseClass}__text`" tag="default">
        Cerrar sesión
      </base-text>
    </div>
  </base-aside>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';

  import { useCurrentUser, useUserMenu, useUsers } from '../../composables';

  import BaseText from '../base-text.component.vue';
  import { BaseButton } from '../inputs';
  import ListItems from '../list-items.component.vue';

  import BaseAside from './base-aside.component.vue';

  const baseClass = 'dashboard-menu-aside';

  const { user } = useCurrentUser();
  const router = useRouter();
  const { menuElements } = useUserMenu();
  const { logout } = useUsers();

  const goToHome = () => router.push('/');

  const closeSession = () => {
    goToHome();
    logout();
  };
</script>

<style lang="scss" scoped>
  .dashboard-menu-aside {
    margin: 18px !important;
    height: 95vh;
    padding: 2rem;

    &__user {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    &__image {
      border-radius: 50%;
      height: 5rem;
      width: 5rem;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    &__items {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 2rem 0.5rem;
    }

    &__footer {
      position: fixed;
      bottom: 68px;
      left: 112px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    &__text {
      cursor: pointer;

      &:hover {
        font-weight: bold;
      }
    }
  }
</style>
