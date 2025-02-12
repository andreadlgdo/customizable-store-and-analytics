<template>
  <base-aside
    @close="$emit('close')"
    :is-open="isOpenAside"
    :close-position="position"
    :aside-position="position"
    type="round"
  >
    <div v-if="!isUserCreated" :class="baseClass">
      <svg-icon
        :src="require('../../assets/media/forms/form-up.svg')"
        :class="`${baseClass}__svg ${baseClass}__svg--up`"
        size="custom"
      />

      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--inputs`">
        <base-text tag="h2" overline>{{ t('asides.register.signUp.title') }}</base-text>
        <base-text-input
          @input="query => (userForm.email = query)"
          :label="t('asides.register.signUp.inputsPlaceholders.email.title')"
          icon="email"
          :error="errorEmail"
        />
        <div>
          <password-input
            @input="query => (userForm.password = query)"
            :label="t('asides.register.signUp.inputsPlaceholders.password.title')"
            :error="errorPassword"
          />
          <div :class="`${baseClass}__wrapper-pill`">
            <base-pill
              v-for="(item, index) in passwordRequirements"
              :key="index"
              :text="item.value"
              :color="item.status"
              icon="tick"
            />
          </div>
        </div>
        <password-input
          @input="query => (userForm.repeatPassword = query)"
          :label="t('asides.register.signUp.inputsPlaceholders.repeatPassword.title')"
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
              <base-text tag="link">{{ t('asides.register.signUp.checkboxText') }}</base-text>
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
          :text="t('asides.register.signUp.action')"
          color="primary"
          have-shadow
        />
        <div :class="`${baseClass}__wrapper-text`">
          <base-text tag="small">
            {{ t('asides.register.signUp.logIn.description') }}
          </base-text>
          <base-text @click="$emit('openLogInAsideOpen')" tag="link">
            {{ t('asides.register.signUp.logIn.action') }}
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
        @logOut="logOut"
        :is-open="isOpenAside"
        :user="userCreated"
      />
    </div>
  </base-aside>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { useCurrentUser, useMobile, useUsers } from '../../composables';
  import { User } from '../../interfaces';

  import BasePill from '../base-pill.component.vue';
  import BaseText from '../base-text.component.vue';
  import { SvgIcon } from '../icons';
  import { BaseButton, BaseTextInput, CheckboxInput, PasswordInput } from '../inputs';

  import BaseAside from './base-aside.component.vue';
  import MenuUserAside from './menu-user-aside.component.vue';

  const baseClass = 'sign-up-aside';

  const { t } = useI18n();

  const { isMobileAndTable } = useMobile();

  const { getUsers, createUser, logout } = useUsers();

  const props = defineProps({
    isOpen: Boolean
  });

  const emits = defineEmits(['close', 'openLogInAsideOpen']);

  const userCreated = ref();

  const isUserCreated = ref(false);
  const isSelectCheckbox = ref(false);

  const isOpenAside = ref(props.isOpen);

  const userForm = ref({
    email: '',
    password: '',
    repeatPassword: ''
  });

  const equalPassword = ref('');
  const errorPassword = ref('');
  const errorEmail = ref('');
  const errorAcceptTerms = ref('');

  const hasLetter = computed(() => /[a-zA-Z]/.test(userForm.value.password));
  const hasUpperCase = computed(() => /[A-Z]/.test(userForm.value.password));
  const hasNumber = computed(() => /\d/.test(userForm.value.password));

  const passwordRequirements = computed(() => [
    {
      value: t('asides.register.signUp.inputsPlaceholders.password.requirements.characters'),
      status: userForm.value.password.length >= 8 ? 'success' : 'error'
    },
    {
      value: t('asides.register.signUp.inputsPlaceholders.password.requirements.letter'),
      status: hasLetter.value ? 'success' : 'error'
    },
    {
      value: t('asides.register.signUp.inputsPlaceholders.password.requirements.uppercase'),
      status: hasUpperCase.value ? 'success' : 'error'
    },
    {
      value: t('asides.register.signUp.inputsPlaceholders.password.requirements.specialCharacter'),
      status: hasNumber.value ? 'success' : 'error'
    }
  ]);

  const position = computed(() => (isMobileAndTable.value ? 'left' : 'right'));

  const validPassword = (password: string, repeatPassword: string): void => {
    if (!password) {
      errorPassword.value = t('asides.register.signUp.inputsPlaceholders.password.error');
    }

    if (password !== repeatPassword) {
      equalPassword.value = t('asides.register.signUp.inputsPlaceholders.repeatPassword.error');
    }
  };

  const validEmail = (email: string): void => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errorEmail.value = t('asides.register.signUp.inputsPlaceholders.email.error.empty');
    } else if (!regex.test(email)) {
      errorEmail.value = t('asides.register.signUp.inputsPlaceholders.email.error.incorrect');
    }
  };

  const addUser = async (): Promise<void> => {
    equalPassword.value = '';
    errorPassword.value = '';
    errorEmail.value = '';
    errorAcceptTerms.value = '';

    validPassword(userForm.value.password, userForm.value.repeatPassword);
    validEmail(userForm.value.email);

    const users = await getUsers();
    const userWithSameEmail = users.find((user: User) => user.email === userForm.value.email);

    if (userWithSameEmail) {
      errorEmail.value = t('asides.register.signUp.inputsPlaceholders.email.error.exits');
    } else if (!isSelectCheckbox.value) {
      errorAcceptTerms.value = t('asides.register.signUp.inputsPlaceholders.acceptTerms');
    } else if (
      !equalPassword.value ||
      !errorPassword.value ||
      !errorEmail.value ||
      !errorAcceptTerms.value
    ) {
      userCreated.value = await createUser({
        email: userForm.value.email,
        password: userForm.value.password
      });
      isUserCreated.value = !!userCreated.value;
    }
  };

  const closeAside = () => {
    isOpenAside.value = false;
    emits('close');
  };

  const logOut = () => {
    logout();
    isUserCreated.value = false;
    userForm.value = {
      email: '',
      password: '',
      repeatPassword: ''
    };
    passwordRequirements.value = passwordRequirements.value.map(passwordRequirement => ({
      ...passwordRequirement,
      status: 'default'
    }));
  };

  watch(
    () => props.isOpen,
    newValue => {
      isOpenAside.value = newValue;
    }
  );

  onMounted(() => {
    const { user: userStore } = useCurrentUser();
    if (userStore.value) {
      isUserCreated.value = true;
      userCreated.value = userStore.value;
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
      z-index: 1;

      &--inputs {
        gap: 28px;
        width: 100%;
      }

      &--footer {
        gap: 12px;
      }
    }

    &__wrapper-pill {
      display: flex;
      flex-wrap: wrap;
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
