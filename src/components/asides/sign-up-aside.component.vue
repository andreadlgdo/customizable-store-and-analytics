<template>
  <Aside @close="$emit('close')" :is-open="isOpen" :close-position="closePosition">
    <div v-if="!isUserCreated" :class="baseClass">
      <h1>{{ t('userAsides.signUp.title') }}</h1>
      <div :class="`${baseClass}__wrapper-inputs`">
        <text-input
          @input="query => (userForm.username = query)"
          :class="`${baseClass}__input ${baseClass}__input--name`"
          :placeholder="t('userAsides.signUp.inputsPlaceholders.name')"
          icon="user"
          color-attribute="stroke"
        />
        <text-input
          @input="query => (userForm.email = query)"
          :class="`${baseClass}__input ${baseClass}__input--email`"
          :placeholder="t('userAsides.signUp.inputsPlaceholders.email')"
          icon="email"
          color-attribute="fill"
        />
        <text-input
          @input="query => (userForm.password = query)"
          :class="`${baseClass}__input ${baseClass}__input--password`"
          :placeholder="t('userAsides.signUp.inputsPlaceholders.password')"
          type="password"
          icon="password"
          color-attribute="fill"
        />
        <text-input
          @input="query => (userForm.repeatPassword = query)"
          :class="`${baseClass}__input ${baseClass}__input--password`"
          :placeholder="t('userAsides.signUp.inputsPlaceholders.repeatPassword')"
          type="password"
          icon="password"
          color-attribute="fill"
        />
        <checkbox-input
          @selectCheckbox="isChecked => (isSelectCheckbox = isChecked)"
          :text="t('userAsides.signUp.checkboxText')"
        />
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

  const addUser = async (): Promise<void> => {
    if (userForm.value.password !== userForm.value.repeatPassword) {
      console.error('Las constraseñas no coinciden');
    } else if (!userForm.value.email) {
      console.error('El email es obligatorio');
    } else {
      const users = await getUsers();
      const userWithSameUsername = users.find(
        (user: User) => user.username === userForm.value.username
      );
      if (userWithSameUsername) {
        console.error('El usuario ya existe');
      } else if (!isSelectCheckbox.value) {
        console.error('Tienes que aceptar los terminos y condiciones');
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
    }
  }
</style>
