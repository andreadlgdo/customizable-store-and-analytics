<template>
  <ui-aside @click="$emit('close')" :class="baseClass" :is-open="isOpen" icon="close" fixed>
    <ui-toggle @click="selectToggle" :options="options" />
    <div v-if="options[0].selected" :class="`${baseClass}__wrapper`">
      <p v-if="invalidCredentials" :class="`${baseClass}__text`">{{ invalidCredentials }}</p>
      <ui-textbox
        @input="value => (newUser.email = value)"
        label="Email"
        :value="newUser.email"
        placeholder="email@example.com"
        :error="errors.email"
      />
      <ui-textbox
        @input="value => (newUser.password = value)"
        label="Password"
        :value="newUser.password"
        placeholder="***********"
        :error="errors.password"
      />
      <ui-button @click="logIn" text="Registrarse" color-soft />
    </div>
    <p v-else :class="`${baseClass}__wrapper`">
      <ui-textbox
        @input="value => (newUser.name = value)"
        label="Name"
        :value="newUser.name"
        placeholder="name"
        :error="errors.name"
      />
      <ui-textbox
        @input="value => (newUser.surname = value)"
        label="Surname"
        :value="newUser.surname"
        placeholder="surname"
        :error="errors.surname"
      />
      <ui-textbox
        @input="value => (newUser.email = value)"
        label="Email"
        :value="newUser.email"
        placeholder="email@example.com"
        :error="errors.email"
      />
      <ui-textbox
        @input="value => (newUser.password = value)"
        label="Password"
        :value="newUser.password"
        placeholder="***********"
        :error="errors.password"
      />
      <ui-textbox
        @input="value => (newUser.repeatPassword = value)"
        label="Repeat password"
        :value="newUser.repeatPassword"
        placeholder="***********"
        :error="errors.repeatPassword"
      />
      <ui-checkbox
        @change="acceptTermsAndConditions = !acceptTermsAndConditions"
        :value="acceptTermsAndConditions"
        text="Acepto los terminos y condiciones"
        :error="errors.terms"
      />
      <ui-button @click="signUp" text="Inicio de sesion" color-soft />
    </p>
  </ui-aside>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';

  import { useValidations } from '../../../composables';

  import UiAside from '../ui-aside.component.vue';
  import UiButton from '../ui-button.component.vue';
  import UiCheckbox from '../ui-checkbox.component.vue';
  import UiTextbox from '../ui-textbox.component.vue';
  import UiToggle from '../ui-toggle.component.vue';

  const baseClass = 'ui-user-register';

  const { validEmail } = useValidations();

  const props = defineProps({
    isOpen: Boolean,
    error: String
  });

  const emit = defineEmits(['close', 'logIn']);

  const options = ref([
    { label: 'Iniciar sesion', selected: true },
    { label: 'Registrarse', selected: false }
  ]);

  const newUser = ref({
    name: '',
    surname: '',
    email: '',
    password: '',
    repeatPassword: ''
  });
  const errors = ref({
    email: '',
    password: '',
    name: '',
    surname: '',
    repeatPassword: '',
    terms: ''
  });
  const acceptTermsAndConditions = ref(false);
  const invalidCredentials = ref(props.error);

  const errorsEmpty = computed(() => Object.values(errors.value).every(error => !error));

  const selectToggle = (option: { label: string; selected: boolean }) => {
    options.value = options.value.map(item => ({ ...item, selected: item.label === option.label }));
    newUser.value = {
      name: '',
      surname: '',
      email: '',
      password: '',
      repeatPassword: ''
    };
    errors.value = {
      email: '',
      password: '',
      name: '',
      surname: '',
      repeatPassword: '',
      terms: ''
    };
    acceptTermsAndConditions.value = false;
    invalidCredentials.value = '';
  };

  const checkEmail = () => {
    if (!newUser.value.email) {
      errors.value.email = 'Email is required';
    } else if (!validEmail(newUser.value.email)) {
      errors.value.email = 'Email is not valid';
    } else {
      errors.value.email = '';
    }
  };

  const checkRepeatPassword = () => {
    if (!newUser.value.repeatPassword) {
      errors.value.repeatPassword = 'Repeat password is required';
    } else if (newUser.value.password !== newUser.value.repeatPassword) {
      errors.value.repeatPassword = 'Repeat password must be the same as password';
    } else {
      errors.value.repeatPassword = '';
    }
  };

  const signUp = () => {
    errors.value.name = !newUser.value.name ? 'Name is required' : '';
    errors.value.surname = !newUser.value.surname ? 'Surname is required' : '';
    checkEmail();
    errors.value.password = !newUser.value.password ? 'Password is required' : '';
    checkRepeatPassword();
    errors.value.terms = acceptTermsAndConditions.value
      ? ''
      : 'You must accept the terms and conditions';

    if (errorsEmpty.value) {
      emit('close');
    }
  };

  const logIn = () => {
    checkEmail();
    errors.value.password = !newUser.value.password ? 'Password is required' : '';

    if (errorsEmpty.value) {
      emit('logIn', newUser.value);
    }
  };

  watch(
    () => props.error,
    () => (invalidCredentials.value = props.error),
    { immediate: true }
  );
</script>

<style lang="scss" scoped>
  .ui-user-register {
    width: 360px;
    padding: 6rem 2rem;

    &__wrapper {
      display: flex;
      flex-direction: column;
      gap: 18px;
      padding: 2rem 0;
    }

    &__text {
      text-align: center;
      color: var(--color-red);
    }
  }
</style>
