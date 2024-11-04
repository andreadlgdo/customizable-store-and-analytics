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
          @click="isBasicAsideOpen = !isBasicAsideOpen"
          :text="isBasicAsideOpen ? 'Close Basic Aside' : 'Open Basic Aside'"
        />
        <base-aside @close="isBasicAsideOpen = false" :is-open="isBasicAsideOpen" />
        <button-input
          @click="isLogInAsideOpen = !isLogInAsideOpen"
          :text="isLogInAsideOpen ? 'Close Log In Aside' : 'Open Log In Aside'"
        />
        <log-in-aside @close="isLogInAsideOpen = false" :is-open="isLogInAsideOpen" />
        <button-input
          @click="isSignUpAsideOpen = !isSignUpAsideOpen"
          :text="isSignUpAsideOpen ? 'Close Sign up Aside' : 'Open Sign up Aside'"
        />
        <sign-up-aside @close="isSignUpAsideOpen = false" :is-open="isSignUpAsideOpen" />
        <button-input
          @click="isShoppingCartEmptyAsideOpen = !isShoppingCartEmptyAsideOpen"
          :text="
            isShoppingCartEmptyAsideOpen
              ? 'Close Shopping cart Aside Empty'
              : 'Open Shopping cart Aside Empty'
          "
          size="large"
        />
        <shopping-cart-aside
          @close="isShoppingCartEmptyAsideOpen = false"
          :is-open="isShoppingCartEmptyAsideOpen"
        />
        <button-input
          @click="isShoppingCartAsideOpen = !isShoppingCartAsideOpen"
          :text="isShoppingCartAsideOpen ? 'Close Shopping cart Aside' : 'Open Shopping cart Aside'"
          size="large"
        />
        <shopping-cart-aside
          :is-open="isShoppingCartAsideOpen"
          @close="isShoppingCartAsideOpen = false"
          :whist-list-products="products"
          :cart-products="products"
        />
      </div>
    </div>
    <hr />
    <div>
      <h3 :class="`${baseClass}__text ${baseClass}__text--subtitle`">
        {{ t('library.icons.button') }}
      </h3>
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--column`">
        <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
          <icon-button icon="search" size="small" colorAttribute="fill" />
          <icon-button icon="search" colorAttribute="fill" />
          <icon-button icon="search" size="large" colorAttribute="fill" />
        </div>
        <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
          <icon-button icon="search" size="small" colorAttribute="fill" have-border />
          <icon-button icon="search" colorAttribute="fill" have-border />
          <icon-button icon="search" size="large" colorAttribute="fill" have-border />
        </div>
      </div>
      <br />
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
          <button-input text="Stroke mini" size="mini" />
          <button-input text="Stroke small" size="small" />
          <button-input text="Stroke normal" />
          <button-input text="Stroke large" size="large" />
        </div>
        <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
          <button-input text="Fill mini" type="fill" size="mini" />
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
        {{ t('library.products.title.whistList') }}
      </h3>
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
        <product-card-whistlist
          :class="`${baseClass}__product`"
          v-for="(product, index) in products"
          :key="index"
          :product="product"
        />
      </div>
      <h3 :class="`${baseClass}__text ${baseClass}__text--subtitle`">
        {{ t('library.products.title.cart') }}
      </h3>
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--column`">
        <product-card-shopping-cart
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
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import {
    CheckboxInput,
    ButtonInput,
    Header,
    IconButton,
    BaseAside,
    LanguageToggle,
    LogInAside,
    ProductCardShoppingCart,
    ProductCardWhistlist,
    ShoppingCartAside,
    SignUpAside,
    SvgIcon,
    TextInput,
    ThemeToggle
  } from '../components';

  const { t } = useI18n();

  const baseClass = 'library';

  const isBasicAsideOpen = ref(false);
  const isLogInAsideOpen = ref(false);
  const isSignUpAsideOpen = ref(false);
  const isShoppingCartEmptyAsideOpen = ref(false);
  const isShoppingCartAsideOpen = ref(false);

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
      isFavorite: true
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

    &__product {
      margin-bottom: 2rem;
    }
  }
</style>
