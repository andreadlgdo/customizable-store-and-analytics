<template>
  <dashboard :selected-item="menuElements[0]">
    <div :class="baseClass">
      <section :class="`${baseClass}__section`">
        <h1>Datos personales</h1>
        <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--header`">
          <ui-image :image="user.imageUrl" />
          <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--user`">
            <p :class="`${baseClass}__text ${baseClass}__text--name`">
              {{ user.name + ' ' + user.surname }}
            </p>
            <p :class="`${baseClass}__text ${baseClass}__text--email`">{{ user.email }}</p>
          </div>
        </div>
        <ui-button text="Editar perfil" icon="edit" :class="`${baseClass}__button`" transparent />
      </section>
      <section :class="`${baseClass}__section`">
        <h1>Direcciones</h1>
        <ui-button text="Añadir direccón" icon="plus" :class="`${baseClass}__button`" />
      </section>
    </div>
  </dashboard>
</template>

<script lang="ts" setup>
  import Dashboard from './dashboard.view.vue';
  import { useCurrentUser, useUserMenu } from '../composables';
  import UiImage from '../components/shared/ui-image.component.vue';
  import UiButton from '../components/shared/ui-button.component.vue';

  const { menuElements } = useUserMenu();

  const { user } = useCurrentUser();

  const baseClass = 'personal-data';
</script>

<style lang="scss" scoped>
  .personal-data {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin: 2rem;
    width: 100%;

    &__section {
      border: 1px solid var(--color-dark-primary);
      border-radius: 16px;
      padding: 2rem;
      height: fit-content;
    }

    &__wrapper {
      display: flex;

      &--header {
        align-items: center;
        gap: 1rem;
      }

      &--user {
        flex-direction: column;
        gap: 0.5rem;
      }
    }

    &__text {
      &--name {
        font-weight: bold;
        font-size: 18px;
      }

      &--email {
        font-size: 16px;
      }
    }

    &__button {
      justify-self: flex-end;
    }
  }
</style>
