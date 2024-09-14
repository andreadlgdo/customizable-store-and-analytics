<template>
  <Aside @close="$emit('close')" :is-open="isOpen" :close-position="closePosition">
    <div v-if="!isUserRegister" :class="baseClass">
      <h1>{{ t('userAsides.logIn.title') }}</h1>
      <div>
        <text-input
          @input="query => (userForm.username = query)"
          :class="`${baseClass}__input ${baseClass}__input--user`"
          :placeholder="t('userAsides.logIn.inputsPlaceholders.username')"
          icon="user"
          color-attribute="stroke"
        />
        <text-input
          @input="query => (userForm.password = query)"
          :class="`${baseClass}__input ${baseClass}__input--password`"
          :placeholder="t('userAsides.logIn.inputsPlaceholders.password')"
          type="password"
          icon="password"
          color-attribute="fill"
        />
        <p :class="`${baseClass}__text ${baseClass}__text--password`">
          {{ t('userAsides.logIn.forgotPassword') }}
        </p>
      </div>
      <div>
        <button-input @click="logInUser" :text="t('userAsides.logIn.action')" type="fill" />
        <p :class="`${baseClass}__text ${baseClass}__text--create-account`">
          {{ t('userAsides.logIn.signUp.description') }}
        </p>
        <a
          :class="`${baseClass}__text ${baseClass}__text--sign-up`"
          @click="$emit('openSignUpAsideOpen')"
        >
          {{ t('userAsides.logIn.signUp.action') }}
        </a>
      </div>
    </div>
    <!-- TO DO: Change when we add the admin menu -->
    <div v-else :class="baseClass">
      <p>ENTRO</p>
    </div>
  </Aside>
</template>

<script lang="ts" setup>
  import { PropType, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { useUsers } from '../../composables/use-users';
  import { PositionType } from '../../types/position.type';

  import TextInput from '../inputs/text-input.component.vue';
  import ButtonInput from '../inputs/button-input.component.vue';

  import Aside from './aside.component.vue';

  const baseClass = 'log-in-aside';

  const { t } = useI18n();

  const { user, login } = useUsers();

  defineProps({
    isOpen: Boolean,
    closePosition: {
      type: String as PropType<PositionType>,
      default: 'right'
    }
  });

  defineEmits(['close', 'openSignUpAsideOpen']);

  const userForm = ref({
    username: '',
    password: ''
  });

  const isUserRegister = ref(false);

  const logInUser = async (): Promise<void> => {
    if (userForm.value.username && userForm.value.password) {
      await login(userForm.value.username, userForm.value.password);
      isUserRegister.value = !!user.value;
    }
  };
</script>

<style lang="scss" scoped>
  .log-in-aside {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4rem;
    margin-top: 42px;

    &__input {
      &--password {
        margin-top: 32px;
      }
    }

    &__text {
      display: flex;
      justify-content: center;

      &--password,
      &--create-account {
        margin-top: 16px;
      }

      &--sign-up {
        margin-top: 4px;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
</style>
