<template>
  <dashboard :selected-item="menuElements[0]">
    <div :class="baseClass">
      <section :class="`${baseClass}__section`">
        <h1 :class="`${baseClass}__text ${baseClass}__text--title`">Datos personales</h1>
        <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--header`">
          <ui-image :image="user.imageUrl" :uploadMode="updateMode" />
          <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--user`">
            <p :class="`${baseClass}__text ${baseClass}__text--name`">
              {{ user.name + ' ' + user.surname }}
            </p>
            <p :class="`${baseClass}__text ${baseClass}__text--email`">{{ user.email }}</p>
          </div>
        </div>
        <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--form`">
          <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--header`">
            <ui-textbox label="Nombre" :value="user.name" :disabled="!updateMode" />
            <ui-textbox label="Apellido" :value="user.surname" :disabled="!updateMode" />
          </div>
          <ui-textbox label="Email" :value="user.email" :disabled="!updateMode" />
        </div>
        <div :class="`${baseClass}__button`">
          <ui-button
            @click="updateMode = !updateMode"
            :text="updateMode ? 'Cancelar' : 'Editar perfil'"
            :icon="updateMode ? 'close' : 'edit'"
            transparent
          />
          <ui-button v-if="updateMode" text="Guardar cambios" icon="edit" />
        </div>
      </section>
      <section :class="`${baseClass}__section`">
        <h1>Direcciones</h1>
        <ui-button text="Añadir direccón" icon="plus" :class="`${baseClass}__button`" />
      </section>
    </div>
  </dashboard>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  import UiImage from '../components/shared/ui-image.component.vue';
  import UiButton from '../components/shared/ui-button.component.vue';
  import UiTextbox from '../components/shared/ui-textbox.component.vue';

  import { useCurrentUser, useUserMenu } from '../composables';

  import Dashboard from './dashboard.view.vue';

  const { menuElements } = useUserMenu();

  const { user } = useCurrentUser();

  const baseClass = 'personal-data';

  const updateMode = ref(false);
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

      &--form {
        flex-direction: column;
        gap: 1rem;
        margin: 24px 0;
      }
    }

    &__text {
      &--title {
        margin: 0 0 16px 0;
      }
      &--name {
        font-weight: bold;
        font-size: 18px;
      }

      &--email {
        font-size: 16px;
      }
    }

    &__button {
      display: flex;
      gap: 1rem;
      justify-self: flex-end;
    }
  }
</style>
