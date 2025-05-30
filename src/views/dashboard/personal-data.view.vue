<template>
  <dashboard :selected-item="menuElements[0]">
    <div :class="baseClass">
      <section :class="`${baseClass}__section`">
        <h1 :class="`${baseClass}__text ${baseClass}__text--title`">
          {{ t('dashboard.personalData.user.title') }}
        </h1>
        <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--header`">
          <ui-image
            @upload="changeImage"
            :image="newUser.imageUrl"
            :upload-mode="updateMode"
            size="small"
          />
          <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--user`">
            <p :class="`${baseClass}__text ${baseClass}__text--name`">
              {{ user.name + ' ' + user.surname }}
            </p>
            <p :class="`${baseClass}__text ${baseClass}__text--email`">{{ user.email }}</p>
          </div>
        </div>
        <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--form`">
          <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--header`">
            <ui-textbox
              @input="value => (newUser.name = value)"
              :label="t('dashboard.personalData.user.label.name')"
              :value="newUser.name"
              :disabled="!updateMode"
            />
            <ui-textbox
              @input="value => (newUser.surname = value)"
              :label="t('dashboard.personalData.user.label.surname')"
              :value="newUser.surname"
              :disabled="!updateMode"
            />
          </div>
          <ui-textbox
            @input="value => (newUser.email = value)"
            :label="t('dashboard.personalData.user.label.email')"
            :value="newUser.email"
            :disabled="!updateMode"
          />
        </div>
        <div :class="`${baseClass}__button`">
          <ui-button
            v-if="updateMode"
            @click="updateData"
            :text="t('dashboard.action.save')"
            icon="edit"
            :disabled="!isValid"
          />
          <ui-button
            @click="action"
            :text="updateMode ? t('dashboard.action.cancel') : t('dashboard.action.edit')"
            :icon="updateMode ? 'close' : 'edit'"
            transparent
          />
        </div>
      </section>
      <ui-address-section :user-id="user._id ?? ''" />
    </div>
  </dashboard>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import UiAddressSection from '../../components/dashboard/personal-data/ui-address-section.component.vue';

  import UiImage from '../../components/shared/ui-image.component.vue';
  import UiButton from '../../components/shared/ui-button.component.vue';
  import UiTextbox from '../../components/shared/ui-textbox.component.vue';

  import { useUsers, useUserMenu, useValidations } from '../../composables';
  import { imageService, userService } from '../../services';

  import Dashboard from './base-dashboard.view.vue';

  const { menuElements } = useUserMenu();
  const { user } = useUsers();
  const { validEmail } = useValidations();
  const { t } = useI18n();

  const baseClass = 'personal-data';

  const updateMode = ref(false);

  const isValid = computed(() => validEmail(user.value.email));

  const newUser = ref({ ...user.value });

  const action = () => {
    if (updateMode.value) {
      newUser.value = { ...user.value };
    }
    updateMode.value = !updateMode.value;
  };

  const changeImage = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const selectedFile = target.files?.[0];

    if (!selectedFile) {
      return alert('Por favor selecciona una imagen primero');
    }

    try {
      const date = new Date();
      const formData = new FormData();
      const imageName = newUser.value._id ? newUser.value._id + date.getTime() : 'undefined';

      formData.append('image', selectedFile);
      formData.append('routeImage', `profiles/${imageName}`);

      const imageUrl = await imageService.addImage(formData);

      if (imageUrl) {
        newUser.value.imageUrl = imageUrl;
      }
    } catch (error) {
      console.error('Error al actualizar la imagen:', error);
    }
  };

  const updateData = async () => {
    const response = await userService.updateUser(newUser.value);
    localStorage.setItem('user', JSON.stringify(response.user));
    window.location.reload();
  };
</script>

<style lang="scss" scoped>
  .personal-data {
    margin: 2rem;
    width: 100%;
    overflow-y: scroll;

    &__section {
      border: 1px solid var(--color-dark-primary);
      border-radius: 16px;
      padding: 2rem;
      height: fit-content;
      margin-bottom: 1rem;
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
