<template>
  <div :class="baseClass">
    <div v-if="user" :class="`${baseClass}__wrapper ${baseClass}__wrapper--column`">
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
        <ui-textbox
          @input="value => (userData.name = value)"
          :value="userData.name"
          :label="t('asides.register.form.name')"
          :disabled="!updateMode"
        />
        <ui-textbox
          @input="value => (userData.surname = value)"
          :value="userData.surname"
          :label="t('asides.register.form.surname')"
          :disabled="!updateMode"
        />
      </div>
      <ui-textbox
        @input="value => (userData.email = value)"
        :value="userData.email"
        label="Email"
        :disabled="!updateMode"
      />
      <ui-button
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
        <ui-button
          @click="updateMode = !updateMode"
          icon="edit"
          :text="t('order.formData.action.save')"
          :class="`${baseClass}__button ${baseClass}__button--action`"
          :disabled="!isValid"
        />
        <ui-button
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
        <ui-textbox
          :label="t('asides.register.form.email.label')"
          :placeholder="t('asides.register.form.email.placeholder')"
        />
        <ui-password :label="t('asides.register.form.password')" />
        <ui-button
          text="Iniciar sesión"
          :class="`${baseClass}__button ${baseClass}__button--register`"
        />
      </div>
      <div v-else :class="`${baseClass}__wrapper ${baseClass}__wrapper--column`">
        <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
          <ui-textbox
            :label="t('asides.register.form.name')"
            :placeholder="t('asides.register.form.name')"
          />
          <ui-textbox
            :label="t('asides.register.form.surname')"
            :placeholder="t('asides.register.form.surname')"
          />
        </div>
        <ui-textbox
          :label="t('asides.register.form.email.label')"
          :placeholder="t('asides.register.form.email.placeholder')"
        />
        <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
          <ui-password :label="t('asides.register.form.password')" have-conditions />
          <ui-password :label="t('asides.register.form.repeatPassword')" />
        </div>
        <ui-checkbox
          @change="acceptTermsAndConditions = !acceptTermsAndConditions"
          :text="t('asides.register.form.termsAndConditions')"
        />
        <ui-button
          text="Registrarse"
          :class="`${baseClass}__button ${baseClass}__button--register`"
        />
      </div>
      <ui-separator :label="t('order.formData.separator')" />
      <ui-textbox
        :label="t('asides.register.form.email.label')"
        :placeholder="t('asides.register.form.email.placeholder')"
      />
    </div>
    <div :class="`${baseClass}__footer`">
      <ui-button
        @click="$emit('continue')"
        :text="t('order.action')"
        :class="`${baseClass}__button ${baseClass}__button--action`"
        :disabled="!isValid"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { useUsers } from '../../../composables';

  import UiCheckbox from '../ui-checkbox.component.vue';
  import UiButton from '../ui-button.component.vue';
  import UiPassword from '../ui-password.component.vue';
  import UiTextbox from '../ui-textbox.component.vue';
  import UiToggle from '../ui-toggle.component.vue';
  import UiSeparator from '../ui-separator.component.vue';

  const baseClass = 'order-personal-data';

  defineEmits(['continue']);

  const { user } = useUsers();
  const { t } = useI18n();

  const userData = ref({ ...user.value } ?? { name: '', surname: '', email: '' });
  const updateMode = ref(false);

  const options = ref([
    { label: t('asides.register.actions.logIn'), selected: true },
    { label: t('asides.register.actions.signUp'), selected: false }
  ]);

  const acceptTermsAndConditions = ref(false);

  const isValid = computed(() => {
    if (user.value) {
      return userData.value.name && userData.value.surname && userData.value.email;
    }
    return false;
  });

  const cancelUpdateMode = () => {
    userData.value = { ...user.value } ?? { name: '', surname: '', email: '' };
    updateMode.value = !updateMode.value;
  };

  const selectToggle = (option: { label: string; selected: boolean }) => {
    options.value = options.value.map(item => ({ ...item, selected: item.label === option.label }));
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
