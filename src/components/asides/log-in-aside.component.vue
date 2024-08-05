<template>
  <Aside @close="$emit('close')" :isOpen="isOpen">
    <div :class="baseClass">
      <h1>{{ t('logIn.title') }}</h1>
      <div>
        <text-input
          :class="`${baseClass}__input ${baseClass}__input--email`"
          :placeholder="t('logIn.inputsPlaceholders.email')"
          icon="email"
          colorAttribute="fill"
        />
        <text-input
          :class="`${baseClass}__input ${baseClass}__input--password`"
          :placeholder="t('logIn.inputsPlaceholders.password')"
          type="password"
          icon="password"
          colorAttribute="fill"
        />
        <p :class="`${baseClass}__text ${baseClass}__text--password`">
          {{ t('logIn.forgotPassword') }}
        </p>
      </div>
      <div>
        <button-input :text="t('logIn.action')" type="fill" />
        <p :class="`${baseClass}__text ${baseClass}__text--create-account`">
          {{ t('logIn.signUp.description') }}
        </p>
        <a
          :class="`${baseClass}__text ${baseClass}__text--sign-up`"
          @click="$emit('openSignUpAsideOpen')"
        >
          {{ t('logIn.signUp.action') }}
        </a>
      </div>
    </div>
  </Aside>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';

  import TextInput from '../inputs/text-input.component.vue';
  import ButtonInput from '../inputs/button-input.component.vue';

  import Aside from './aside.component.vue';

  const baseClass = 'log-in-aside';

  const { t } = useI18n();

  defineProps({
    isOpen: Boolean
  });

  defineEmits(['close', 'openSignUpAsideOpen']);
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
