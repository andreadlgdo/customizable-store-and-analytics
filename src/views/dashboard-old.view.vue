<template>
  <header-layout />
  <div :class="baseClass">
    <div :class="`${baseClass}__menu`">
      <div :class="`${baseClass}__user-image`">
        <img
          @click="fileInput.click()"
          :class="`${baseClass}__image`"
          :src="user?.imageUrl ?? require('../assets/media/images/empty.png')"
          alt="userImage"
        />
        <input
          ref="fileInput"
          @change="onFileSelected"
          type="file"
          accept="image/*"
          :class="`${baseClass}__input ${baseClass}__input--file`"
        />
      </div>
      <menu-items :menu-items="menuElements" showDescription />
    </div>
    <div :class="`${baseClass}__landing`"></div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  import { MenuItems } from '../components';
  import { useCurrentUser, useUserMenu } from '../composables';
  import { imageService, userService } from '../services';

  import HeaderLayout from './header-layout.view.vue';

  const baseClass = 'dashboard';

  const { user } = useCurrentUser();
  const { menuElements } = useUserMenu();

  const fileInput = ref();

  const onFileSelected = async (event: Event) => {
    const target = event.target as HTMLInputElement;

    const selectedFile = target.files?.[0];

    if (!selectedFile) {
      alert('Por favor selecciona una imagen primero');
      return;
    } else {
      const formData = new FormData();

      formData.append('image', selectedFile);
      formData.append('routeImage', `profile/${user.value._id}`);

      const imageUrl = await imageService.addImage(formData);
      if (imageUrl) {
        user.value.imageUrl = imageUrl;
        const newUser = await userService.updateUser(user.value);
        localStorage.setItem('user', JSON.stringify(newUser));
      }
    }
  };
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
      // TODO: Change when add the landing sections
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
      position: relative;
      width: 14rem;
      height: 14rem;
      border-radius: 50%;
      cursor: pointer;
    }

    &__input {
      &--file {
        display: none;
      }
    }
  }
</style>
