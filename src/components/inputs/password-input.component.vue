<template>
  <base-text-input
    @input="query => $emit('input', query)"
    icon="password"
    color-attribute="fill"
    tag="password"
    :label="label"
    :error="error"
    :class="baseClass"
  >
    <template v-slot:header>
      <checkbox-input size="small">
        <base-text tag="small">
          {{ t('userAsides.logIn.inputsPlaceholders.password.showPassword') }}
        </base-text>
      </checkbox-input>
    </template>
    <template v-slot:footer>
      <div v-if="isNewPassword" :class="`${baseClass}__footer`">
        <checkbox-input size="small">
          <base-text tag="small">
            {{ t('userAsides.logIn.inputsPlaceholders.password.rememberMe') }}
          </base-text>
        </checkbox-input>
        <base-text tag="link">
          {{ t('userAsides.logIn.forgotPassword') }}
        </base-text>
      </div>
    </template>
  </base-text-input>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';

  import BaseTextInput from '../inputs/base-text-input.component.vue';
  import CheckboxInput from '../inputs/checkbox-input.component.vue';

  import BaseText from '../base-text.component.vue';

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
