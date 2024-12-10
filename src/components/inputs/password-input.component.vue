<template>
  <base-text-input
    @input="query => $emit('input', query)"
    icon="password"
    tag="password"
    :label="label"
    :error="error"
    :class="baseClass"
  >
    <template v-slot:header>
      <checkbox-input size="small">
        <base-text tag="small">
          {{ t('asides.register.logIn.inputsPlaceholders.password.showPassword') }}
        </base-text>
      </checkbox-input>
    </template>
    <template v-slot:footer>
      <div v-if="isNewPassword" :class="`${baseClass}__footer`">
        <checkbox-input size="small">
          <base-text tag="small">
            {{ t('asides.register.logIn.inputsPlaceholders.password.rememberMe') }}
          </base-text>
        </checkbox-input>
        <base-text tag="link">
          {{ t('asides.register.logIn.forgotPassword') }}
        </base-text>
      </div>
    </template>
  </base-text-input>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';

  import BaseText from '../base-text.component.vue';
  import { BaseTextInput, CheckboxInput } from '../inputs';

  const baseClass = 'password-input';

  const { t } = useI18n();

  defineProps({
    label: String,
    error: String,
    isNewPassword: Boolean
  });
</script>

<style lang="scss" scoped>
  .password-input {
    &__footer {
      display: flex;
      justify-content: space-between;
      padding: 0 14px;
      margin-top: 6px;
    }
  }
</style>
