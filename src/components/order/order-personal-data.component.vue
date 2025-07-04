<template>
  <div :class="baseClass">
    <div v-if="user" :class="`${baseClass}__wrapper ${baseClass}__wrapper--column`">
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
        <UiTextbox
          @input="value => (userData.name = value)"
          :value="userData.name"
          :label="t('asides.register.form.name')"
          :disabled="!updateMode"
        />
        <UiTextbox
          @input="value => (userData.surname = value)"
          :value="userData.surname"
          :label="t('asides.register.form.surname')"
          :disabled="!updateMode"
        />
      </div>
      <UiTextbox
        @input="value => (userData.email = value)"
        :value="userData.email"
        label="Email"
        :disabled="!updateMode"
      />
      <UiButton
        v-if="!updateMode"
        @click="updateMode = !updateMode"
        icon="edit"
        :text="t('order.formData.action.edit')"
        :class="`${baseClass}__button ${baseClass}__button--action`"
        :style="{ alignSelf: 'flex-end' }"
        transparent
      />
      <div
        v-else
        :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`"
        :style="{ alignSelf: 'flex-end' }"
      >
        <UiButton
          @click="saveUserData"
          icon="edit"
          :text="t('order.formData.action.save')"
          :class="`${baseClass}__button ${baseClass}__button--action`"
          :disabled="!isValid"
        />
        <UiButton
          @click="cancelUpdateMode"
          icon="close"
          :text="t('order.formData.action.cancel')"
          :class="`${baseClass}__button ${baseClass}__button--action`"
          transparent
        />
      </div>
    </div>
    <div v-else :class="`${baseClass}__wrapper ${baseClass}__wrapper--column`">
      <ui-toggle @click="selectToggle" :options="options" />
      <div
        v-if="options[0].selected"
        :class="`${baseClass}__wrapper ${baseClass}__wrapper--column`"
      >
        <p v-if="errors.value?.invalidCredentials" :class="`${baseClass}__text`">
          {{ errors.value.invalidCredentials }}
        </p>
        <ui-textbox
          @input="value => (registerUser.email = value)"
          :value="registerUser.email"
          :label="t('asides.register.form.email.label')"
          :placeholder="t('asides.register.form.email.placeholder')"
          :error="errors.email"
        />
        <ui-password
          @input="value => (registerUser.password = value)"
          :value="registerUser.password"
          :label="t('asides.register.form.password')"
          :error="errors.password"
        />
        <ui-button
          @click="logIn"
          text="Iniciar sesión"
          :class="`${baseClass}__button ${baseClass}__button--register`"
        />
      </div>
      <div v-else :class="`${baseClass}__wrapper ${baseClass}__wrapper--column`">
        <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
          <ui-textbox
            @input="value => (registerUser.name = value)"
            :value="registerUser.name"
            :label="t('asides.register.form.name')"
            :placeholder="t('asides.register.form.name')"
            :error="errors.name"
          />
          <ui-textbox
            @input="value => (registerUser.surname = value)"
            :value="registerUser.surname"
            :label="t('asides.register.form.surname')"
            :placeholder="t('asides.register.form.surname')"
            :error="errors.surname"
          />
        </div>
        <ui-textbox
          @input="value => (registerUser.email = value)"
          :value="registerUser.email"
          :label="t('asides.register.form.email.label')"
          :placeholder="t('asides.register.form.email.placeholder')"
          :error="errors.email"
        />
        <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
          <ui-password
            @input="value => (registerUser.password = value)"
            :value="registerUser.password"
            :label="t('asides.register.form.password')"
            :error="errors.password"
            have-conditions
          />
          <ui-password
            @input="setPassword"
            :value="registerUser.repeatPassword"
            :label="t('asides.register.form.repeatPassword')"
            :error="errors.repeatPassword"
          />
        </div>
        <ui-checkbox
          @change="acceptTermsAndConditions = !acceptTermsAndConditions"
          :text="t('asides.register.form.termsAndConditions')"
          :error="errors.terms"
        />
        <ui-button
          @click="signUp"
          text="Registrarse"
          :class="`${baseClass}__button ${baseClass}__button--register`"
        />
      </div>
      <ui-separator :label="t('order.formData.separator')" />
      <UiTextbox
        @input="value => (userData.email = value)"
        :value="userData.email"
        :label="t('asides.register.form.email.label')"
        :placeholder="t('asides.register.form.email.placeholder')"
      />
    </div>
    <div :class="`${baseClass}__footer`">
      <UiButton
        @click="$emit('continue', userData)"
        :text="t('order.action.continue')"
        :class="`${baseClass}__button ${baseClass}__button--action`"
        :disabled="!isValid"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { useCart, useUsers, useValidations } from '@/composables';
  import { Order } from '@/interfaces';
  import { orderService } from '@/services';

  import UiCheckbox from '@/components/shared/ui-checkbox.component.vue';
  import UiButton from '@/components/shared/ui-button.component.vue';
  import UiPassword from '@/components/shared/ui-password.component.vue';
  import UiTextbox from '@/components/shared/ui-textbox.component.vue';
  import UiToggle from '@/components/shared/ui-toggle.component.vue';
  import UiSeparator from '@/components/shared/ui-separator.component.vue';

  const baseClass = 'order-personal-data';

  const props = defineProps({
    newUser: {
      type: Object,
      default: undefined
    }
  });

  const emit = defineEmits(['save', 'continue']);

  const { user, createUser, login } = useUsers();
  const { t } = useI18n();
  const { validEmail } = useValidations();
  const { openOrder, loadUserOrders, saveOrdersToLocalStorage } = useCart();

  const userData = ref(
    props.newUser ?? {
        name: user.value?.name,
        surname: user.value?.surname,
        email: user.value?.email
      } ?? { name: '', surname: '', email: '' }
  );

  const registerUser = ref({
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
    terms: '',
    invalidCredentials: ''
  });

  const updateMode = ref(false);

  const options = ref([
    { label: t('asides.register.actions.logIn'), selected: true },
    { label: t('asides.register.actions.signUp'), selected: false }
  ]);

  const acceptTermsAndConditions = ref(false);

  const isValid = computed(() => {
    return user.value
      ? userData.value.name && userData.value.surname && userData.value.email
      : validEmail(userData.value.email);
  });

  const errorsEmpty = computed(() => Object.values(errors.value).every(error => !error));

  const saveUserData = () => {
    updateMode.value = !updateMode.value;
    emit('save', userData.value);
  };

  const cancelUpdateMode = () => {
    userData.value = { ...user.value } ?? { name: '', surname: '', email: '' };
    updateMode.value = !updateMode.value;
  };

  const selectToggle = (option: { label: string; selected: boolean }) => {
    options.value = options.value.map(item => ({ ...item, selected: item.label === option.label }));
  };

  const checkEmail = () => {
    if (!registerUser.value.email) {
      errors.value.email = 'Email is required';
    } else if (!validEmail(registerUser.value.email)) {
      errors.value.email = 'Email is not valid';
    } else {
      errors.value.email = '';
    }
  };

  const logIn = async () => {
    checkEmail();
    errors.value.password = !registerUser.value.password ? 'Password is required' : '';

    if (errorsEmpty.value) {
      const error = await login(registerUser.value.email, registerUser.value.password);
      if (error) {
        errors.value.invalidCredentials = 'Incorrect credentials';
      } else {
        await loadUserOrders();
        const userOrders = await orderService.findOrderByUserId(user.value?._id ?? '');
        const orderOpen = userOrders.find((o: Order) => o.status === 'open') ?? undefined;
        openOrder.value = {
          ...openOrder.value,
          _id: orderOpen?._id ?? undefined,
          userId: user.value?._id ?? openOrder.value.userId
        };
        orderOpen
          ? await orderService.updateOrder(openOrder.value)
          : await orderService.createOrder(openOrder.value);
        await saveOrdersToLocalStorage([]);
        window.location.reload();
      }
    }
  };

  const setPassword = (value: string) => {
    registerUser.value.repeatPassword = value;
    checkRepeatPassword();
  };

  const checkRepeatPassword = () => {
    if (!registerUser.value.repeatPassword) {
      errors.value.repeatPassword = 'Repeat password is required';
    } else if (registerUser.value.password !== registerUser.value.repeatPassword) {
      errors.value.repeatPassword = 'Repeat password must be the same as password';
    } else {
      errors.value.repeatPassword = '';
    }
  };

  const signUp = async () => {
    errors.value.name = !registerUser.value.name ? 'Name is required' : '';
    errors.value.surname = !registerUser.value.surname ? 'Surname is required' : '';
    checkEmail();
    errors.value.password = !registerUser.value.password ? 'Password is required' : '';
    checkRepeatPassword();
    errors.value.terms = acceptTermsAndConditions.value
      ? ''
      : 'You must accept the terms and conditions';

    if (errorsEmpty.value) {
      user.value = await createUser({
        name: registerUser.value.name,
        surname: registerUser.value.surname,
        email: registerUser.value.email,
        password: registerUser.value.password
      });
      await loadUserOrders();
      openOrder.value = {
        ...openOrder.value,
        _id: undefined,
        userId: user.value?._id ?? openOrder.value.userId
      };
      await orderService.createOrder(openOrder.value);
      await saveOrdersToLocalStorage([]);
      window.location.reload();
    }
  };
</script>

<style lang="scss" scoped>
  .order-personal-data {
    display: flex;
    flex-direction: column;
    gap: 16px;

    &__wrapper {
      display: flex;
      gap: 16px;

      &--column {
        flex-direction: column;
      }
    }

    &__text {
      color: var(--color-red);
    }

    &__footer {
      position: absolute;
      bottom: 24px;
      right: 28px;
    }

    &__button {
      &--action {
        width: 134px;
      }

      &--register {
        width: 234px;
        align-self: center;
      }
    }
  }
</style>
