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
      <div>
        <p v-if="invalidCredentials" :class="`${baseClass}__text ${baseClass}__text--error`">
          {{ invalidCredentials }}
        </p>
        <text-input
          @input="query => (userForm.username = query)"
          :class="`${baseClass}__input ${baseClass}__input--user`"
          :placeholder="t('userAsides.logIn.inputsPlaceholders.username.title')"
          icon="user"
          color-attribute="stroke"
          :error="errorUsername"
        />
        <text-input
          @input="query => (userForm.password = query)"
          :class="`${baseClass}__input ${baseClass}__input--password`"
          :placeholder="t('userAsides.logIn.inputsPlaceholders.password.title')"
          type="password"
          icon="password"
          color-attribute="fill"
          :error="errorPassword"
        />
        <base-text tag="small" text-align="right" :class="`${baseClass}__link`">
          {{ t('userAsides.logIn.forgotPassword') }}
        </base-text>
      </div>
      <div :class="`${baseClass}__wrapper`">
        <base-button @click="logInUser" :text="t('userAsides.logIn.action')" have-shadow />
        <base-text tag="small" :class="`${baseClass}__text ${baseClass}__text--sign-up`">
          {{ t('userAsides.logIn.signUp.description') }}
          <a @click="$emit('openSignUpAsideOpen')" :class="`${baseClass}__link`">
            {{ t('userAsides.logIn.signUp.action') }}
          </a>
        </base-text>
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

  import { useUsers } from '../../composables/use-users';
  import { PositionType } from '../../types/position.type';

  import SvgIcon from '../icons/svg-icon.component.vue';

  import BaseButton from '../inputs/base-button.component.vue';
  import TextInput from '../inputs/text-input.component.vue';

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
        bottom: -70px;
      }
    }

    &__input {
      &--password {
        margin-top: 32px;
      }
    }

    &__wrapper {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    &__text {
      display: flex;

      &--sign-up {
        gap: 4px;
      }

      &--error {
        justify-content: flex-start;
        margin-bottom: 26px;
        color: var(--color-error);
      }
    }

    &__link {
      font-weight: 600;
      cursor: pointer;
    }
  }
</style>
