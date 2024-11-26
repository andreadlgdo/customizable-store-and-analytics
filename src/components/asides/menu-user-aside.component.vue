<template>
  <base-aside @close="$emit('close')" :is-open="openAside" type="round">
    <div :class="baseClass">
      <svg-icon
        :src="require('../../assets/media/forms/menu-user.svg')"
        :class="`${baseClass}__svg`"
        size="custom"
      />
      <img
        :src="user?.imageUrl ?? require('../../assets/media/images/empty-user.png')"
        alt="empty-user"
        :class="`${baseClass}__image`"
      />
      <div :class="`${baseClass}__content`">
        <div :class="`${baseClass}__header`">
          <base-text tag="h4">{{ user.username }}</base-text>
          <base-text tag="default">{{ user.email }}</base-text>
        </div>
        <div :class="`${baseClass}__items`"><list-items :items="menuElements" /></div>
      </div>
      <div :class="`${baseClass}__footer`">
        <base-button
          @click="goToProfile"
          color="primary"
          type="outline-solid"
          :text="t('asides.user.menu.goProfile')"
          have-shadow
        />
        <base-text @click="logOut" tag="default" :class="`${baseClass}__text`">
          {{ t('asides.user.menu.logOut') }}
        </base-text>
      </div>
    </div>
  </base-aside>
</template>

<script lang="ts" setup>
  import { PropType, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';

  import { useUserMenu } from '../../composables';
  import { User } from '../../interfaces';

  import BaseAside from './base-aside.component.vue';
  import BaseText from '../base-text.component.vue';
  import { SvgIcon } from '../icons';
  import { BaseButton } from '../inputs';
  import ListItems from '../list-items.component.vue';

  const baseClass = 'menu-user-aside';

  const { t } = useI18n();
  const router = useRouter();

  const { menuElements } = useUserMenu();

  const props = defineProps({
    isOpen: Boolean,
    user: {
      type: Object as PropType<User>,
      required: true
    }
  });

  const emit = defineEmits(['logout']);

  const openAside = ref(props.isOpen);

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
    align-items: center;
    padding: 0 2rem;
    height: 100vh;

    &__svg {
      position: absolute;
      right: -6px;
      top: -86px;
    }

    &__image {
      position: absolute;
      top: 100px;
      height: 8rem;
      border-radius: 50%;
    }

    &__header {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }

    &__content {
      width: 100%;
      margin-top: 14rem;
    }

    &__items {
      width: 100%;
      max-height: 40vh;
      overflow: scroll;
    }

    &__footer {
      position: fixed;
      bottom: 38px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }

    &__text {
      &:hover {
        font-weight: bold;
        cursor: pointer;
      }
    }
  }
</style>
