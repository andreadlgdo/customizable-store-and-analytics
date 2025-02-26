<template>
  <ui-aside @click="$emit('close')" :class="baseClass" :is-open="isOpen" icon="close" fixed>
    <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
      <ui-image :image="user.imageUrl" size="mini" />
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--column`">
        <p :class="`${baseClass}__text ${baseClass}__text--name`">
          {{ user.name + ' ' + user.surname }}
        </p>
        <p :class="`${baseClass}__text ${baseClass}__text--email`">{{ user.email }}</p>
      </div>
    </div>
    <ui-list @click="clickItem" :items="menuElements" :class="`${baseClass}__list`" />
    <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--button`">
      <ui-button
        @click="clickItem(menuElements[0])"
        :text="t('menus.user.goProfile')"
        :class="`${baseClass}__button`"
        color-soft
      />
      <p @click="$emit('logOut')" :class="`${baseClass}__text ${baseClass}__text--link`">
        {{ t('menus.user.logOut') }}
      </p>
    </div>
  </ui-aside>
</template>

<script lang="ts" setup>
  import { useUserMenu, useUsers } from '../../../composables';
  import { MenuItem } from '../../../interfaces';

  import UiAside from '../ui-aside.component.vue';
  import UiButton from '../ui-button.component.vue';
  import UiImage from '../ui-image.component.vue';
  import UiList from '../ui-list.component.vue';

  import { useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';

  const { user } = useUsers();
  const { menuElements } = useUserMenu();
  const router = useRouter();
  const { t } = useI18n();

  const baseClass = 'ui-user-menu';

  defineProps({
    isOpen: Boolean
  });

  defineEmits(['close', 'logOut']);

  const clickItem = (item: MenuItem) => {
    const dahsboardRoute = router.resolve({
      name: item.route?.name
    });
    window.open(dahsboardRoute.href, '_blank');
  };
</script>

<style lang="scss" scoped>
  .ui-user-menu {
    width: 360px;

    &__wrapper {
      display: flex;

      &--row {
        justify-content: flex-start;
        gap: 12px;
        padding: 4rem 0 2rem 2.5rem;
      }

      &--column {
        flex-direction: column;
        justify-content: center;
        gap: 4px;
      }

      &--button {
        position: absolute;
        bottom: 40px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 8px;
        width: 100%;
      }
    }

    &__text {
      &--name {
        font-weight: bold;
      }

      &--link {
        font-size: 14px;
        cursor: pointer;

        &:hover {
          font-weight: bold;
        }
      }
    }

    &__list {
      padding: 0 3rem;
    }

    &__button {
      width: 10rem;
    }
  }
</style>
