<template>
  <div :class="baseClass">
    <h1 :class="`${baseClass}__text ${baseClass}__text--title`">{{ t('library.title') }}</h1>
    <div>
      <h3 :class="`${baseClass}__text ${baseClass}__text--subtitle`">
        {{ t('library.toggle.language') }}
      </h3>
      <language-toggle />
    </div>
    <hr />
    <div>
      <h3 :class="`${baseClass}__text ${baseClass}__text--subtitle`">
        {{ t('library.toggle.language') }}
      </h3>
      <theme-toggle />
    </div>
    <hr />
    <div>
      <h3 :class="`${baseClass}__text ${baseClass}__text--subtitle`">
        {{ t('library.asides.title') }}
      </h3>
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
        <button-input
          :text="isBasicAsideOpen ? 'Close Basic Aside' : 'Open Basic Aside'"
          @click="isBasicAsideOpen = !isBasicAsideOpen"
        />
        <Aside :is-open="isBasicAsideOpen" @close="isBasicAsideOpen = false" />
        <button-input
          :text="isLogInAsideOpen ? 'Close Log In Aside' : 'Open Log In Aside'"
          @click="isLogInAsideOpen = !isLogInAsideOpen"
        />
        <log-in-aside :is-open="isLogInAsideOpen" @close="isLogInAsideOpen = false" />
        <button-input
          :text="isSignUpAsideOpen ? 'Close Sign up Aside' : 'Open Sign up Aside'"
          @click="isSignUpAsideOpen = !isSignUpAsideOpen"
        />
        <sign-up-aside :is-open="isSignUpAsideOpen" @close="isSignUpAsideOpen = false" />
      </div>
    </div>
    <hr />
    <div>
      <h3 :class="`${baseClass}__text ${baseClass}__text--subtitle`">
        {{ t('library.icons.button') }}
      </h3>
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
        <icon-button icon="search" size="small" colorAttribute="fill" />
        <icon-button icon="search" colorAttribute="fill" />
        <icon-button icon="search" size="large" colorAttribute="fill" />
      </div>
      <h3 :class="`${baseClass}__text ${baseClass}__text--subtitle`">
        {{ t('library.icons.svg') }}
      </h3>
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
        <svg-icon
          :src="require('../assets/media/icons/user.svg')"
          size="small"
          colorAttribute="stroke"
        />
        <svg-icon :src="require('../assets/media/icons/user.svg')" colorAttribute="stroke" />
        <svg-icon
          :src="require('../assets/media/icons/user.svg')"
          size="large"
          colorAttribute="stroke"
        />
      </div>
    </div>
    <hr />
    <div>
      <h3 :class="`${baseClass}__text ${baseClass}__text--subtitle`">
        {{ t('library.inputs.text.title') }}
      </h3>
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--column`">
        <text-input />
        <text-input icon="user" colorAttribute="stroke" />
        <text-input icon="user" colorAttribute="stroke" placeholder="Placeholder text" />
        <p>{{ t('library.inputs.text.password') }}</p>
        <text-input type="password" />
      </div>
    </div>
    <hr />
    <div>
      <h3 :class="`${baseClass}__text ${baseClass}__text--subtitle`">
        {{ t('library.inputs.button') }}
      </h3>
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--column`">
        <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
          <button-input text="Stroke small" size="small" />
          <button-input text="Stroke normal" />
          <button-input text="Stroke large" size="large" />
        </div>
        <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
          <button-input text="Fill small" type="fill" size="small" />
          <button-input text="Fill normal" type="fill" />
          <button-input text="Fill large" type="fill" size="large" />
        </div>
      </div>
    </div>
    <hr />
    <div>
      <h3 :class="`${baseClass}__text ${baseClass}__text--subtitle`">
        {{ t('library.inputs.checkbox') }}
      </h3>
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--column`">
        <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
          <checkbox-input size="small" />
          <checkbox-input />
          <checkbox-input size="large" />
        </div>
        <checkbox-input text="Texto del checkbox" size="small" />
        <checkbox-input text="Texto del checkbox" />
        <checkbox-input text="Texto del checkbox" size="large" />
      </div>
    </div>
    <hr />
    <div>
      <h3 :class="`${baseClass}__text ${baseClass}__text--subtitle`">
        {{ t('library.products.title') }}
      </h3>
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
        <product-card-whist-list
          v-for="(product, index) in products"
          :key="index"
          :product="product"
        />
      </div>
    </div>
    <hr />
    <div>
      <h3 :class="`${baseClass}__text ${baseClass}__text--subtitle`">
        {{ t('library.header.title') }}
      </h3>
      <Header />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';

  import Aside from '../components/asides/aside.component.vue';
  import LogInAside from '../components/asides/log-in-aside.component.vue';
  import SignUpAside from '../components/asides/sign-up-aside.component.vue';

  import IconButton from '../components/icons/icon-button.component.vue';
  import SvgIcon from '../components/icons/svg-icon.component.vue';

  import Header from '../components/header/header.component.vue';

  import ButtonInput from '../components/inputs/button-input.component.vue';
  import CheckboxInput from '../components/inputs/checkbox-input.component.vue';
  import TextInput from '../components/inputs/text-input.component.vue';

  import ProductCardWhistList from '../components/product-cards/product-card-whist-list.component.vue';

  import LanguageToggle from '../components/toggles/language-toggle.component.vue';
  import ThemeToggle from '../components/toggles/theme-toggle.component.vue';

  import { ref } from 'vue';

  const { t } = useI18n();

  const baseClass = 'library';

  const isBasicAsideOpen = ref(false);
  const isLogInAsideOpen = ref(false);
  const isSignUpAsideOpen = ref(false);

  const products = [
    {
      title: 'Producto',
      price: 10,
      image: 'empty'
    },
    {
      title: 'Producto fav',
      price: 20.5,
      image: 'empty',
      isSelected: true
    }
  ];
</script>

<style scoped lang="scss">
  .library {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;

    &__text {
      font-weight: 600;
      margin-bottom: 1rem;

      &--title {
        align-self: center;
        font-size: xxx-large;
      }

      &--subtitle {
        font-size: x-large;
      }
    }

    &__wrapper {
      display: flex;

      &--row {
        align-items: center;
        gap: 1.5rem;
      }

      &--column {
        flex-direction: column;
        gap: 1rem;
      }
    }
  }
</style>
