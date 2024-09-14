<template>
  <Aside @close="$emit('close')" :is-open="isOpen" :close-position="closePosition">
    <div v-if="!isUserCreated" :class="baseClass">
      <h1>{{ t('userAsides.signUp.title') }}</h1>
      <div :class="`${baseClass}__wrapper-inputs`">
        <text-input
          @input="query => (userForm.username = query)"
          :class="`${baseClass}__input ${baseClass}__input--name`"
          :placeholder="t('userAsides.signUp.inputsPlaceholders.username.title')"
          icon="user"
          color-attribute="stroke"
          :error="errorUser"
        />
        <text-input
          @input="query => (userForm.email = query)"
          :class="`${baseClass}__input ${baseClass}__input--email`"
          :placeholder="t('userAsides.signUp.inputsPlaceholders.email.title')"
          icon="email"
          color-attribute="fill"
          :error="errorEmail"
        />
        <text-input
          @input="query => (userForm.password = query)"
          :class="`${baseClass}__input ${baseClass}__input--password`"
          :placeholder="t('userAsides.signUp.inputsPlaceholders.password.title')"
          type="password"
          icon="password"
          color-attribute="fill"
          :error="errorPassword"
        />
        <text-input
          @input="query => (userForm.repeatPassword = query)"
          :class="`${baseClass}__input ${baseClass}__input--password`"
          :placeholder="t('userAsides.signUp.inputsPlaceholders.repeatPassword.title')"
          type="password"
          icon="password"
          color-attribute="fill"
          :error="equalPassword"
        />
        <div>
          <p v-if="errorAcceptTerms" :class="`${baseClass}__text ${baseClass}__text--error`">
            {{ errorAcceptTerms }}
          </p>
          <checkbox-input
            @selectCheckbox="isChecked => (isSelectCheckbox = isChecked)"
            :text="t('userAsides.signUp.checkboxText')"
          />
        </div>
      </div>
      <div>
        <button-input @click="addUser" :text="t('userAsides.signUp.action')" type="fill" />
        <p :class="`${baseClass}__text ${baseClass}__text--have-account`">
          {{ t('userAsides.signUp.logIn.description') }}
        </p>
        <a
          :class="`${baseClass}__text ${baseClass}__text--logIn`"
          @click="$emit('openLogInAsideOpen')"
        >
          {{ t('userAsides.signUp.logIn.action') }}
        </a>
      </div>
    </div>
    <div v-else :class="baseClass">
      <p>Usuario creado</p>
    </div>
  </Aside>
</template>

<script lang="ts" setup>
  import { PropType, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { useUsers } from '../../composables/use-users';
  import { User } from '../../interfaces/user';
  import { PositionType } from '../../types/position.type';

  import ButtonInput from '../inputs/button-input.component.vue';
  import CheckboxInput from '../inputs/checkbox-input.component.vue';
  import TextInput from '../inputs/text-input.component.vue';

  import Aside from './aside.component.vue';

  const baseClass = 'sign-up-aside';

  const { t } = useI18n();

  const { getUsers, createUser } = useUsers();

  defineProps({
    isOpen: Boolean,
    closePosition: {
      type: String as PropType<PositionType>,
      default: 'right'
    }
  });

  defineEmits(['close', 'openLogInAsideOpen']);

  const isUserCreated = ref(false);

  const isSelectCheckbox = ref(false);

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
      errorEmail.value = t('userAsides.signUp.inputsPlaceholders.email.error');
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
        const user = await createUser({
          username: userForm.value.username,
          email: userForm.value.email,
          password: userForm.value.password
        });
        isUserCreated.value = !!user;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .sign-up-aside {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4rem;
    margin-top: 42px;

    &__wrapper-inputs {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    &__text {
      display: flex;
      justify-content: center;

      &--have-account {
        margin-top: 16px;
      }

      &--logIn {
        margin-top: 4px;
        text-decoration: underline;
        cursor: pointer;
      }

      &--error {
        justify-content: flex-start;
        margin-bottom: 8px;
        color: var(--color-error);
      }
    }
  }
</style>
