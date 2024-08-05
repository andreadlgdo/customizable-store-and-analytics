<template>
  <Aside @close="$emit('close')" :is-open="isOpen">
    <div :class="baseClass">
      <h1>{{ t('signUp.title') }}</h1>
      <div :class="`${baseClass}__wrapper-inputs`">
        <text-input
          :class="`${baseClass}__input ${baseClass}__input--name`"
          :placeholder="t('signUp.inputsPlaceholders.name')"
          icon="user"
          color-attribute="stroke"
        />
        <text-input
          :class="`${baseClass}__input ${baseClass}__input--email`"
          :placeholder="t('signUp.inputsPlaceholders.email')"
          icon="email"
          color-attribute="fill"
        />
        <text-input
          :class="`${baseClass}__input ${baseClass}__input--password`"
          :placeholder="t('signUp.inputsPlaceholders.password')"
          type="password"
          icon="password"
          color-attribute="fill"
        />
        <text-input
          :class="`${baseClass}__input ${baseClass}__input--password`"
          :placeholder="t('signUp.inputsPlaceholders.repeatPassword')"
          type="password"
          icon="password"
          color-attribute="fill"
        />
        <checkbox-input :text="t('signUp.checkboxText')" />
      </div>
      <div>
        <button-input :text="t('signUp.action')" type="fill" />
        <p :class="`${baseClass}__text ${baseClass}__text--have-account`">
          {{ t('signUp.logIn.description') }}
        </p>
        <a
          :class="`${baseClass}__text ${baseClass}__text--logIn`"
          @click="$emit('openLogInAsideOpen')"
        >
          {{ t('signUp.logIn.action') }}
        </a>
      </div>
    </div>
  </Aside>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';

  import ButtonInput from '../inputs/button-input.component.vue';
  import CheckboxInput from '../inputs/checkbox-input.component.vue';
  import TextInput from '../inputs/text-input.component.vue';

  import Aside from './aside.component.vue';

  const baseClass = 'sign-up-aside';

  const { t } = useI18n();

  defineProps({
    isOpen: Boolean
  });

  defineEmits(['close', 'openLogInAsideOpen']);
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
