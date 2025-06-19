<template>
  <UiAside @click="$emit('close')" :class="baseClass" :is-open="isOpen" icon="close" fixed>
    <UiToggle @click="selectToggle" :options="toggleOptions" />
    <div v-if="isLoginView" :class="`${baseClass}__wrapper`">
      <p v-if="invalidCredentials" :class="`${baseClass}__text`">{{ invalidCredentials }}</p>
      <ui-textbox
        @input="(value: string) => handleInput('email', value)"
        :label="userRegisterCustom?.texts.logIn.email.label"
        :value="formData.email"
        :placeholder="userRegisterCustom?.texts.logIn.email.placeholder"
        :error="formErrors.email"
      />
      <ui-password
        @input="(value: string) => handleInput('password', value)"
        :label="userRegisterCustom?.texts.logIn.password.label"
        :placeholder="userRegisterCustom?.texts.logIn.password.placeholder"
        :value="formData.password"
        :error="formErrors.password"
      />
      <ui-button @click="handleLogin" :text="userRegisterCustom?.texts.logIn.action" :background-color="userRegisterCustom?.visuals.colors.button" />
    </div>
    <div v-else :class="`${baseClass}__wrapper`">
      <p v-if="repeatedCredentialsEmail" :class="`${baseClass}__text`">{{ repeatedCredentialsEmail }}</p>
      <UiTextbox
        @input="(value: string) => handleInput('name', value)"
        :label="userRegisterCustom?.texts.signUp.name.label"
        :value="formData.name"
        :placeholder="userRegisterCustom?.texts.signUp.name.placeholder"
        :error="formErrors.name"
      />
      <UiTextbox
        @input="(value: string) => handleInput('surname', value)"
        :label="userRegisterCustom?.texts.signUp.surname.label"
        :value="formData.surname"
        :placeholder="userRegisterCustom?.texts.signUp.surname.placeholder"
        :error="formErrors.surname"
      />
      <UiTextbox
        @input="(value: string) => handleInput('email', value)"
        :label="userRegisterCustom?.texts.signUp.email.label"
        :value="formData.email"
        :placeholder="userRegisterCustom?.texts.signUp.email.placeholder"
        :error="formErrors.email"
      />
      <UiPassword
        @input="handlePasswordChange"
        :label="userRegisterCustom?.texts.signUp.password.label"
        :placeholder="userRegisterCustom?.texts.signUp.password.placeholder"
        :value="formData.password"
        :error="formErrors.password"
        haveConditions
      />
      <UiPassword
        @input="(value: string) => handleInput('repeatPassword', value)"
        :label="userRegisterCustom?.texts.signUp.repeatPassword.label"
        :placeholder="userRegisterCustom?.texts.signUp.repeatPassword.placeholder"
        :value="formData.repeatPassword"
        :error="formErrors.repeatPassword"
      />
      <UiCheckbox
        @change="handleTermsChange"
        :value="acceptTermsAndConditions"
        :text="userRegisterCustom?.texts.signUp.acceptTerms"
        :error="formErrors.terms"
      />
      <UiButton 
        @click="handleRegister" 
        :text="userRegisterCustom?.texts.signUp.action" 
        :background-color="userRegisterCustom?.visuals.colors.button"
      />
    </div>
  </UiAside>
</template>

<script lang="ts" setup>
import { computed, ref, watch, onMounted } from 'vue';

import { FormErrors, FormData, UserRegisterCustom } from '@/types/user-register.type';
import { useValidations } from '@/composables';
import { customService } from '@/services';

import UiAside from '@/components/shared/ui-aside.component.vue';
import UiButton from '@/components/shared/ui-button.component.vue';
import UiCheckbox from '@/components/shared/ui-checkbox.component.vue';
import UiTextbox from '@/components/shared/ui-textbox.component.vue';
import UiPassword from '@/components/shared/ui-password.component.vue';
import UiToggle, { ToggleOption } from '@/components/shared/ui-toggle.component.vue';

const baseClass = 'ui-user-register';
const { validEmail } = useValidations();

const props = defineProps<{
  isOpen: boolean;
  errorLogIn?: string;
  errorSignUp?: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'logIn', data: Pick<FormData, 'email' | 'password'>): void;
  (e: 'signUp', data: FormData): void;
}>();

const userRegisterCustom = ref<UserRegisterCustom>();

const toggleOptions = ref<ToggleOption[]>([
  { label: userRegisterCustom.value?.texts.toggle.logIn ?? '', selected: true },
  { label: userRegisterCustom.value?.texts.toggle.signUp ?? '', selected: false }
]);

const formData = ref<FormData>({
  name: '',
  surname: '',
  email: '',
  password: '',
  repeatPassword: ''
});

const formErrors = ref<FormErrors>({
  name: '',
  surname: '',
  email: '',
  password: '',
  repeatPassword: '',
  terms: ''
});

const acceptTermsAndConditions = ref(false);
const invalidCredentials = ref(props.errorLogIn);
const repeatedCredentialsEmail = ref(props.errorSignUp);
const isPasswordValid = ref(false);

const isLoginView = computed(() => toggleOptions.value[0].selected);
const isFormValid = computed(() => {
  const hasNoErrors = Object.values(formErrors.value).every(error => !error);
  return hasNoErrors && isPasswordValid.value && acceptTermsAndConditions.value;
});

const resetForm = () => {
  formData.value = {
    name: '',
    surname: '',
    email: '',
    password: '',
    repeatPassword: ''
  };
  formErrors.value = {
    name: '',
    surname: '',
    email: '',
    password: '',
    repeatPassword: '',
    terms: ''
  };
  acceptTermsAndConditions.value = false;
  invalidCredentials.value = '';
  repeatedCredentialsEmail.value = '';
  isPasswordValid.value = false;
};

const selectToggle = (option: ToggleOption) => {
  toggleOptions.value = toggleOptions.value.map(item => ({
    ...item,
    selected: item.label === option.label
  }));
  resetForm();
};

const validateEmail = () => {
  if (!formData.value.email) {
    formErrors.value.email = 'El email es obligatorio';
  } else if (!validEmail(formData.value.email)) {
    formErrors.value.email = 'El email no es válido';
  } else {
    formErrors.value.email = '';
  }
};

const validateRepeatPassword = () => {
  if (!formData.value.repeatPassword) {
    formErrors.value.password = 'La contraseña es obligatoria';
  } else if (formData.value.password !== formData.value.repeatPassword) {
    formErrors.value.repeatPassword = 'Las contraseñas no coinciden';
  } else {
    formErrors.value.repeatPassword = '';
  }
};

const handleInput = (field: keyof FormData, value: string) => {
  formData.value[field] = value;
};

const handlePasswordChange = (value: string, isValid: boolean) => {
  formData.value.password = value;
  isPasswordValid.value = isValid;
};

const handleTermsChange = () => {
  acceptTermsAndConditions.value = !acceptTermsAndConditions.value;
  formErrors.value.terms = acceptTermsAndConditions.value ? '' : 'Debes aceptar los términos y condiciones';
};

const handleRegister = () => {
  formErrors.value.name = !formData.value.name ? 'El nombre es obligatorio' : '';
  formErrors.value.surname = !formData.value.surname ? 'El apellido es obligatorio' : '';
  validateEmail();
  formErrors.value.password = !formData.value.password ? 'La contraseña es obligatoria' : '';
  validateRepeatPassword();
  formErrors.value.terms = acceptTermsAndConditions.value ? '' : 'Debes aceptar los términos y condiciones';

  if (isFormValid.value) {
    emit('signUp', formData.value);
  }
};

const handleLogin = () => {
  validateEmail();
  formErrors.value.password = !formData.value.password ? 'La contraseña es obligatoria' : '';

  if (Object.values(formErrors.value).every(error => !error)) {
    emit('logIn', {
      email: formData.value.email,
      password: formData.value.password
    });
  }
};

watch(
  () => props.errorLogIn,
  (newError) => (invalidCredentials.value = newError),
  { immediate: true }
);

watch(
  () => props.errorSignUp,
  (newError) => (repeatedCredentialsEmail.value = newError),
  { immediate: true }
);

watch(
  () => props.isOpen,
  () => resetForm(),
  { immediate: true }
);

watch(
  () => userRegisterCustom.value?.texts.toggle,
  () => {
    toggleOptions.value = [
      { label: userRegisterCustom.value?.texts.toggle.logIn ?? '', selected: true },
      { label: userRegisterCustom.value?.texts.toggle.signUp ?? '', selected: false }
    ];
  },
  { immediate: true, deep: true }
);

onMounted(async () => {
  userRegisterCustom.value = await customService.getCustom('register') as UserRegisterCustom;
});
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
