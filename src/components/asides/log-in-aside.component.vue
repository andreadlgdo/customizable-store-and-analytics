<template>
  <base-aside
    @close="$emit('close')"
    :is-open="isOpenAside"
    :close-position="position"
    :aside-position="position"
    type="round"
  >
    <div v-if="!isUserRegister" :class="baseClass">
      <svg-icon
        :src="require('../../assets/media/forms/form-up.svg')"
        :class="`${baseClass}__svg ${baseClass}__svg--up`"
        size="custom"
      />
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--inputs`">
        <base-text tag="h2" overline>
          {{ t('menus.register.logIn.title') }}
        </base-text>
        <base-text
          v-if="invalidCredentials"
          tag="default"
          color="error"
          :class="`${baseClass}__text`"
        >
          {{ invalidCredentials }}
        </base-text>
        <base-text-input
          @input="query => (userForm.username = query)"
          :label="t('menus.register.logIn.inputsPlaceholders.username.title')"
          icon="user"
          :error="errorUsername"
        />
        <password-input
          @input="query => (userForm.password = query)"
          :label="t('menus.register.logIn.inputsPlaceholders.password.title')"
          :error="errorPassword"
          isNewPassword
        />
      </div>
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--footer`">
        <base-button
          @click="logInUser"
          :text="t('menus.register.logIn.action')"
          color="primary"
          have-shadow
        />
        <div :class="`${baseClass}__wrapper-text`">
          <base-text tag="small">
            {{ t('menus.register.logIn.signUp.description') }}
          </base-text>
          <base-text @click="$emit('openSignUpAsideOpen')" tag="link">
            {{ t('menus.register.logIn.signUp.action') }}
          </base-text>
        </div>
      </div>
      <svg-icon
        :src="require('../../assets/media/forms/form-down.svg')"
        :class="`${baseClass}__svg ${baseClass}__svg--down`"
        size="custom"
      />
    </div>
    <div v-else :class="baseClass">
      <menu-user-aside
        v-if="user"
        @close="closeAside"
        @logout="logOut"
        :is-open="isOpenAside"
        :user="user"
      />
    </div>
  </base-aside>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { useCurrentUser, useMobile, useUsers } from '../../composables';

  import BaseText from '../base-text.component.vue';
  import { SvgIcon } from '../icons';
  import { BaseButton, BaseTextInput, PasswordInput } from '../inputs';

  import BaseAside from './base-aside.component.vue';
  import MenuUserAside from './menu-user-aside.component.vue';

  const baseClass = 'log-in-aside';

  const { t } = useI18n();

  const { isMobileAndTable } = useMobile();

  const { user, login, logout } = useUsers();

  const props = defineProps({
    isOpen: Boolean
  });

  const emits = defineEmits(['close', 'openSignUpAsideOpen']);

  const userForm = ref({
    username: '',
    password: ''
  });

  const isUserRegister = ref(false);
  const isOpenAside = ref(props.isOpen);

  const errorUsername = ref('');
  const errorPassword = ref('');
  const invalidCredentials = ref('');

  const position = computed(() => (isMobileAndTable.value ? 'left' : 'right'));

  const logInUser = async (): Promise<void> => {
    errorPassword.value = '';
    invalidCredentials.value = '';
    errorUsername.value = '';
    if (!userForm.value.username && !userForm.value.password) {
      errorUsername.value = t('menus.register.logIn.inputsPlaceholders.username.error');
      errorPassword.value = t('menus.register.logIn.inputsPlaceholders.password.error');
    } else if (!userForm.value.username) {
      errorUsername.value = t('menus.register.logIn.inputsPlaceholders.username.error');
    } else if (!userForm.value.password) {
      errorPassword.value = t('menus.register.logIn.inputsPlaceholders.password.error');
    } else {
      const error = await login(userForm.value.username, userForm.value.password);
      if (error) {
        invalidCredentials.value = t('menus.register.logIn.inputsPlaceholders.generalError');
      } else {
        isUserRegister.value = !!user.value;
        isOpenAside.value = isUserRegister.value;
      }
    }
  };

  const closeAside = () => {
    isOpenAside.value = false;
    emits('close');
  };

  const logOut = () => {
    logout();
    isUserRegister.value = false;
    userForm.value = {
      username: '',
      password: ''
    };
  };

  onMounted(() => {
    const { user: userStore } = useCurrentUser();
    if (userStore.value) {
      isUserRegister.value = true;
      user.value = userStore.value;
    }
  });

  watch(
    () => props.isOpen,
    newValue => {
      isOpenAside.value = newValue;
    }
  );
</script>

<style lang="scss" scoped>
  .log-in-aside {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    padding: 0 2rem;
    height: 100vh;

    &__svg {
      position: absolute;
      right: -6px;

      &--up {
        top: -84px;
      }

      &--down {
        bottom: -64px;
      }
    }

    &__wrapper {
      display: flex;
      flex-direction: column;
      z-index: 1;

      &--inputs {
        gap: 28px;
        width: 100%;
      }

      &--footer {
        gap: 12px;
      }
    }

    &__wrapper-text {
      display: flex;
      justify-content: center;
      gap: 4px;
    }

    &__text {
      align-self: center;
    }
  }
</style>
