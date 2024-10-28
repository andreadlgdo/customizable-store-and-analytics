<template>
  <base-aside
    @close="$emit('close')"
    :is-open="isOpenAside"
    :close-position="closePosition"
    type="round"
  >
    <div v-if="!isUserCreated" :class="baseClass">
      <svg-icon
        :src="require('../../assets/media/forms/form-up.svg')"
        :class="`${baseClass}__svg ${baseClass}__svg--up`"
        size="custom"
      />
      <base-text tag="h2" overline>{{ t('userAsides.signUp.title') }}</base-text>
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--inputs`">
        <base-text-input
          @input="query => (userForm.username = query)"
          :label="t('userAsides.signUp.inputsPlaceholders.username.title')"
          icon="user"
          color-attribute="stroke"
          :error="errorUser"
        />
        <base-text-input
          @input="query => (userForm.email = query)"
          :label="t('userAsides.signUp.inputsPlaceholders.email.title')"
          icon="email"
          color-attribute="fill"
          :error="errorEmail"
        />
        <password-input
          @input="query => (userForm.password = query)"
          :label="t('userAsides.signUp.inputsPlaceholders.password.title')"
          :error="errorPassword"
        />
        <password-input
          @input="query => (userForm.repeatPassword = query)"
          :label="t('userAsides.signUp.inputsPlaceholders.repeatPassword.title')"
          :error="equalPassword"
        />
        <div>
          <checkbox-input @selectCheckbox="isChecked => (isSelectCheckbox = isChecked)">
            <a
              :href="$router.resolve('/terms-and-conditions').href"
              target="_blank"
              rel="noopener noreferrer"
              :class="`${baseClass}__text ${baseClass}__text--link`"
            >
              <base-text tag="link">{{ t('userAsides.signUp.checkboxText') }}</base-text>
            </a>
          </checkbox-input>
          <base-text
            v-if="errorAcceptTerms"
            tag="small"
            color="error"
            :class="`${baseClass}__text ${baseClass}__text-error`"
          >
            {{ errorAcceptTerms }}
          </base-text>
        </div>
      </div>
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--footer`">
        <base-button
          @click="addUser"
          :text="t('userAsides.signUp.action')"
          color="primary"
          have-shadow
        />
        <div :class="`${baseClass}__wrapper-text`">
          <base-text tag="small">
            {{ t('userAsides.signUp.logIn.description') }}
          </base-text>
          <base-text @click="$emit('openLogInAsideOpen')" tag="link">
            {{ t('userAsides.signUp.logIn.action') }}
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
        v-if="userCreated"
        @close="closeAside"
        :is-open="isOpenAside"
        :user="userCreated"
      />
    </div>
  </base-aside>
</template>

<script lang="ts" setup>
  import { onMounted, PropType, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { PositionType } from '../../types/position.type';

  import { useUsers } from '../../composables';
  import { User } from '../../interfaces';

  import SvgIcon from '../icons/svg-icon.component.vue';

  import BaseButton from '../inputs/base-button.component.vue';
  import BaseTextInput from '../inputs/base-text-input.component.vue';
  import CheckboxInput from '../inputs/checkbox-input.component.vue';
  import PasswordInput from '../inputs/password-input.component.vue';

  import BaseText from '../base-text.component.vue';

  import BaseAside from './base-aside.component.vue';
  import MenuUserAside from './menu-user-aside.component.vue';

  const baseClass = 'sign-up-aside';

  const { t } = useI18n();

  const { getUsers, createUser } = useUsers();

  const props = defineProps({
    isOpen: Boolean,
    closePosition: {
      type: String as PropType<PositionType>,
      default: 'right'
    }
  });

  const emits = defineEmits(['close', 'openLogInAsideOpen']);

  const userCreated = ref();

  const isUserCreated = ref(false);
  const isSelectCheckbox = ref(false);

  const isOpenAside = ref(props.isOpen);

  const userForm = ref({
    username: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  const equalPassword = ref('');
  const errorPassword = ref('');
  const errorUser = ref('');
  const errorEmail = ref('');
  const errorAcceptTerms = ref('');

  const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const addUser = async (): Promise<void> => {
    equalPassword.value = '';
    errorPassword.value = '';
    errorUser.value = '';
    errorEmail.value = '';
    errorAcceptTerms.value = '';

    if (!userForm.value.password) {
      errorPassword.value = t('userAsides.signUp.inputsPlaceholders.password.error');
    } else if (userForm.value.password !== userForm.value.repeatPassword) {
      equalPassword.value = t('userAsides.signUp.inputsPlaceholders.repeatPassword.error');
    }
    if (!userForm.value.email) {
      errorEmail.value = t('userAsides.signUp.inputsPlaceholders.email.error.empty');
    } else if (!isValidEmail(userForm.value.email)) {
      errorEmail.value = t('userAsides.signUp.inputsPlaceholders.email.error.incorrect');
    }
    if (!userForm.value.username) {
      errorUser.value = t('userAsides.signUp.inputsPlaceholders.username.error.empty');
    } else {
      const users = await getUsers();
      const userWithSameUsername = users.find(
        (user: User) => user.username === userForm.value.username
      );
      if (userWithSameUsername) {
        errorUser.value = t('userAsides.signUp.inputsPlaceholders.username.error.exits');
      } else if (!isSelectCheckbox.value) {
        errorAcceptTerms.value = t('userAsides.signUp.inputsPlaceholders.acceptTerms');
      } else {
        userCreated.value = await createUser({
          username: userForm.value.username,
          email: userForm.value.email,
          password: userForm.value.password
        });
        isUserCreated.value = !!userCreated.value;
      }
    }
  };

  const closeAside = () => {
    isOpenAside.value = false;
    emits('close');
  };

  watch(
    () => props.isOpen,
    newValue => {
      isOpenAside.value = newValue;
    }
  );

  onMounted(() => {
    const userStore = localStorage.getItem('user');
    if (userStore) {
      isUserCreated.value = true;
      const userObject = JSON.parse(userStore);
      userCreated.value = userObject;
    }
  });
</script>

<style lang="scss" scoped>
  .sign-up-aside {
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
        top: -106px;
      }

      &--down {
        bottom: -90px;
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

    &__text {
      &--link {
        text-decoration: none;
      }

      &--error {
        margin-top: 6px;
      }
    }

    &__wrapper-text {
      display: flex;
      justify-content: center;
      gap: 4px;
    }
  }
</style>
