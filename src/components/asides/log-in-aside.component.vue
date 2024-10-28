<template>
  <base-aside
    @close="$emit('close')"
    :is-open="isOpenAside"
    :close-position="closePosition"
    type="round"
  >
    <div v-if="!isUserRegister" :class="baseClass">
      <svg-icon
        :src="require('../../assets/media/forms/form-up.svg')"
        :class="`${baseClass}__svg ${baseClass}__svg--up`"
        size="custom"
      />
      <base-text tag="h2" overline>{{ t('userAsides.logIn.title') }}</base-text>
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--inputs`">
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
          :label="t('userAsides.logIn.inputsPlaceholders.username.title')"
          icon="user"
          color-attribute="stroke"
          :error="errorUsername"
        />
        <password-input
          @input="query => (userForm.password = query)"
          :label="t('userAsides.logIn.inputsPlaceholders.password.title')"
          :error="errorPassword"
          isNewPassword
        />
      </div>
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--footer`">
        <base-button
          @click="logInUser"
          :text="t('userAsides.logIn.action')"
          color="primary"
          have-shadow
        />
        <div :class="`${baseClass}__wrapper-text`">
          <base-text tag="small">
            {{ t('userAsides.logIn.signUp.description') }}
          </base-text>
          <base-text @click="$emit('openSignUpAsideOpen')" tag="link">
            {{ t('userAsides.logIn.signUp.action') }}
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
  import { onMounted, PropType, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { PositionType } from '../../types/position.type';

  import { useUsers } from '../../composables';

  import SvgIcon from '../icons/svg-icon.component.vue';

  import BaseButton from '../inputs/base-button.component.vue';
  import BaseTextInput from '../inputs/base-text-input.component.vue';
  import PasswordInput from '../inputs/password-input.component.vue';

  import BaseText from '../base-text.component.vue';

  import BaseAside from './base-aside.component.vue';
  import MenuUserAside from './menu-user-aside.component.vue';

  const baseClass = 'log-in-aside';

  const { t } = useI18n();

  const { user, login, logout } = useUsers();

  const props = defineProps({
    isOpen: Boolean,
    closePosition: {
      type: String as PropType<PositionType>,
      default: 'right'
    }
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

  const logInUser = async (): Promise<void> => {
    errorPassword.value = '';
    invalidCredentials.value = '';
    errorUsername.value = '';
    if (!userForm.value.username && !userForm.value.password) {
      errorUsername.value = t('userAsides.logIn.inputsPlaceholders.username.error');
      errorPassword.value = t('userAsides.logIn.inputsPlaceholders.password.error');
    } else if (!userForm.value.username) {
      errorUsername.value = t('userAsides.logIn.inputsPlaceholders.username.error');
    } else if (!userForm.value.password) {
      errorPassword.value = t('userAsides.logIn.inputsPlaceholders.password.error');
    } else {
      const error = await login(userForm.value.username, userForm.value.password);
      if (error) {
        invalidCredentials.value = t('userAsides.logIn.inputsPlaceholders.generalError');
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
    const userStore = localStorage.getItem('user');
    if (userStore) {
      isUserRegister.value = true;
      const userObject = JSON.parse(userStore);
      user.value = userObject;
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

      &--inputs {
        gap: 28px;
        width: 100%;
      }

      &--footer {
        gap: 12px;
        z-index: 1;
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
