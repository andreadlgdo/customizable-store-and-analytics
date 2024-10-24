<template>
  <base-aside @close="$emit('close')" :is-open="openAside">
    <div :class="baseClass">
      <div>
        <div :class="`${baseClass}__title`">
          <p :class="`${baseClass}__text ${baseClass}__text--title`">
            {{ t('userAsides.userMenu.title') }}
          </p>
          <p :class="`${baseClass}__text ${baseClass}__text--subtitle`">
            {{ user.username.toUpperCase() ?? '' }}
          </p>
        </div>
        <hr />
        <menu-items :menu-items="menuElements" />
      </div>
      <div :class="`${baseClass}__footer`">
        <button-input @click="goToProfile" :text="t('userAsides.userMenu.goProfile')" type="fill" />
        <button @click="logOut" :class="`${baseClass}__button ${baseClass}__button--log-out`">
          {{ t('userAsides.userMenu.logOut') }}
        </button>
      </div>
    </div>
  </base-aside>
</template>

<script lang="ts" setup>
  import { PropType, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';

  import { useUserMenu } from '../../composables/use-user-menu';
  import { User } from '../../interfaces/user';

  import BaseAside from './base-aside.component.vue';
  import MenuItems from '../menu/menu-items.component.vue';
  import ButtonInput from '../inputs/button-input.component.vue';

  const baseClass = 'menu-user-aside';

  const router = useRouter();
  const { t } = useI18n();

  const props = defineProps({
    isOpen: Boolean,
    user: {
      type: Object as PropType<User>,
      required: true
    }
  });

  const emit = defineEmits(['logout']);

  const openAside = ref(props.isOpen);

  const { menuElements } = useUserMenu();

  const goToProfile = () => {
    router.push('/dashboard');
    openAside.value = false;
  };

  const logOut = () => {
    router.push('/');
    emit('logout');
  };
</script>

<style lang="scss" scoped>
  .menu-user-aside {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 46px;
    height: 87%;

    &__title {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
    }

    &__button {
      border: none;
      background: none;
      font-size: 16px;

      &:hover {
        font-weight: 700;
      }
    }

    &__text {
      &--title {
        font-size: 56px;
        font-weight: 400;
      }

      &--subtitle {
        line-height: 52px;
        font-size: 70px;
        font-weight: 700;
      }
    }

    &__footer {
      display: flex;
      flex-direction: column;
      align-self: center;
      text-align: center;
      gap: 8px;
      margin-bottom: 8px;
    }
  }
</style>
