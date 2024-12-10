<template>
  <div :class="baseClass" v-if="user">
    <base-aside
      :is-closeable="false"
      aside-position="left"
      is-open="true"
      type="round"
      :class="`${baseClass}__menu`"
    >
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
        <base-text @click="closeSession" :class="`${baseClass}__link`" tag="link">
          Cerrar sesión
        </base-text>
      </div>
    </base-aside>
  </div>
</template>

<script lang="ts" setup>
  import { BaseAside, BaseButton, BaseText, ListItems } from '../components';
  import { useCurrentUser, useUserMenu, useUsers } from '../composables';
  import { useRouter } from 'vue-router';

  const baseClass = 'dashboard';

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
  .dashboard {
    background-color: var(--color-border-primary);
    height: 100vh;

    &__menu {
      margin: 18px !important;
      height: 95vh;
      padding: 2rem;
    }

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

    &__link {
      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
