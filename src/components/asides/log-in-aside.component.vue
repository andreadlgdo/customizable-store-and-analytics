<template>
  <Aside @close="$emit('close')" :isOpen="isOpen">
    <div :class="baseClass">
      <h1>{{ t('initSesion.title') }}</h1>
      <div>
        <text-input
          :class="`${baseClass}__input ${baseClass}__input--user`"
          :placeholder="t('initSesion.inputsPlaceholders.user')"
          icon="user"
          colorAttribute="stroke"
        />
        <text-input
          :class="`${baseClass}__input ${baseClass}__input--password`"
          :placeholder="t('initSesion.inputsPlaceholders.password')"
          type="password"
          icon="password"
          colorAttribute="fill"
        />
        <p :class="`${baseClass}__text ${baseClass}__text--password`">
          {{ t('initSesion.forgotPassword') }}
        </p>
      </div>
      <div>
        <button-input :text="t('initSesion.action')" type="fill" />
        <p :class="`${baseClass}__text ${baseClass}__text--create-account`">
          {{ t('initSesion.register.description') }}
        </p>
        <a :class="`${baseClass}__text ${baseClass}__text--register`" @click="$emit('register')">
          {{ t('initSesion.register.action') }}
        </a>
      </div>
    </div>
  </Aside>
</template>

<script lang="ts" setup>
  import Aside from './aside.component.vue';
  import TextInput from '../inputs/text-input.component.vue';
  import ButtonInput from '../inputs/button-input.component.vue';
  import { useI18n } from 'vue-i18n';

  const baseClass = 'log-in-aside';

  const { t } = useI18n();

  defineProps({
    isOpen: Boolean
  });

  defineEmits(['close', 'register']);
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

      &--register {
        margin-top: 4px;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
</style>
