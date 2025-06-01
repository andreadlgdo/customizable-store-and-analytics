<template>
  <UiAside @click="$emit('close')" :class="baseClass" :is-open="isOpen" icon="close" fixed>
    <UiToggle @click="selectToggle" :options="toggleOptions" />
    <div v-if="isLoginView" :class="`${baseClass}__wrapper`">
      <p v-if="invalidCredentials" :class="`${baseClass}__text`">{{ invalidCredentials }}</p>
      <ui-textbox
        @input="(value: string) => handleInput('email', value)"
        :label="t('asides.register.form.email.label')"
        :value="formData.email"
        :placeholder="t('asides.register.form.email.placeholder')"
        :error="formErrors.email"
      />
      <ui-password
        @input="(value: string) => handleInput('password', value)"
        :label="t('asides.register.form.password')"
        :value="formData.password"
        :error="formErrors.password"
      />
      <ui-button @click="handleLogin" :text="t('asides.register.actions.logIn')" color-soft />
    </div>
    <div v-else :class="`${baseClass}__wrapper`">
      <UiTextbox
        @input="(value: string) => handleInput('name', value)"
        :label="t('asides.register.form.name')"
        :value="formData.name"
        :placeholder="t('asides.register.form.name')"
        :error="formErrors.name"
      />
      <UiTextbox
        @input="(value: string) => handleInput('surname', value)"
        :label="t('asides.register.form.surname')"
        :value="formData.surname"
        :placeholder="t('asides.register.form.surname')"
        :error="formErrors.surname"
      />
      <UiTextbox
        @input="(value: string) => handleInput('email', value)"
        :label="t('asides.register.form.email.label')"
        :value="formData.email"
        :placeholder="t('asides.register.form.email.placeholder')"
        :error="formErrors.email"
      />
      <UiPassword
        @input="handlePasswordChange"
        :label="t('asides.register.form.password')"
        :value="formData.password"
        :error="formErrors.password"
        haveConditions
      />
      <UiPassword
        @input="(value: string) => handleInput('repeatPassword', value)"
        :label="t('asides.register.form.repeatPassword')"
        :value="formData.repeatPassword"
        :error="formErrors.repeatPassword"
      />
      <UiCheckbox
        @change="handleTermsChange"
        :value="acceptTermsAndConditions"
        :text="t('asides.register.form.termsAndConditions')"
        :error="formErrors.terms"
      />
      <UiButton 
        @click="handleRegister" 
        :text="t('asides.register.actions.signUp')" 
        color-soft 
        :disabled="!isFormValid" 
      />
    </div>
  </UiAside>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useValidations } from '../../../composables';

import UiAside from '../ui-aside.component.vue';
import UiButton from '../ui-button.component.vue';
import UiCheckbox from '../ui-checkbox.component.vue';
import UiTextbox from '../ui-textbox.component.vue';
import UiPassword from '../ui-password.component.vue';
import UiToggle from '../ui-toggle.component.vue';

interface FormData {
  name: string;
  surname: string;
  email: string;
  password: string;
  repeatPassword: string;
}

interface FormErrors {
  name: string;
  surname: string;
  email: string;
  password: string;
  repeatPassword: string;
  terms: string;
}

interface ToggleOption {
  label: string;
  selected: boolean;
}

const baseClass = 'ui-user-register';
const { validEmail } = useValidations();
const { t } = useI18n();

const props = defineProps<{
  isOpen: boolean;
  error?: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'logIn', data: Pick<FormData, 'email' | 'password'>): void;
  (e: 'signUp', data: FormData): void;
}>();

const toggleOptions = ref<ToggleOption[]>([
  { label: t('asides.register.actions.logIn'), selected: true },
  { label: t('asides.register.actions.signUp'), selected: false }
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
const invalidCredentials = ref(props.error);
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
    formErrors.value.email = t('validation.email.required');
  } else if (!validEmail(formData.value.email)) {
    formErrors.value.email = t('validation.email.invalid');
  } else {
    formErrors.value.email = '';
  }
};

const validateRepeatPassword = () => {
  if (!formData.value.repeatPassword) {
    formErrors.value.repeatPassword = t('validation.repeatPassword.required');
  } else if (formData.value.password !== formData.value.repeatPassword) {
    formErrors.value.repeatPassword = t('validation.repeatPassword.mismatch');
  } else {
    formErrors.value.repeatPassword = '';
  }
};

const handleInput = (field: keyof FormData, value: string) => {
  formData.value[field] = value;
  if (field === 'email') validateEmail();
  if (field === 'repeatPassword') validateRepeatPassword();
};

const handlePasswordChange = (value: string, isValid: boolean) => {
  formData.value.password = value;
  isPasswordValid.value = isValid;
  validateRepeatPassword();
};

const handleTermsChange = () => {
  acceptTermsAndConditions.value = !acceptTermsAndConditions.value;
  formErrors.value.terms = acceptTermsAndConditions.value ? '' : t('validation.terms.required');
};

const handleRegister = () => {
  formErrors.value.name = !formData.value.name ? t('validation.name.required') : '';
  formErrors.value.surname = !formData.value.surname ? t('validation.surname.required') : '';
  validateEmail();
  formErrors.value.password = !formData.value.password ? t('validation.password.required') : '';
  validateRepeatPassword();
  formErrors.value.terms = acceptTermsAndConditions.value ? '' : t('validation.terms.required');

  if (isFormValid.value) {
    emit('signUp', formData.value);
  }
};

const handleLogin = () => {
  validateEmail();
  formErrors.value.password = !formData.value.password ? t('validation.password.required') : '';

  if (Object.values(formErrors.value).every(error => !error)) {
    emit('logIn', {
      email: formData.value.email,
      password: formData.value.password
    });
  }
};

watch(
  () => props.error,
  (newError) => (invalidCredentials.value = newError),
  { immediate: true }
);

watch(
  () => props.isOpen,
  () => resetForm(),
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
