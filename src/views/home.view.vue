<template>
  <Header
    :opened-menu="isOpenMenu"
    :opened-user-menu="isOpenUserMenu"
    :opened-whist-list="isOpenWhistList"
    :opened-shopping-cart="isOpenShoppingCart"
    @updateMenu="value => (isOpenMenu = value)"
    @updateUserMenu="value => (isOpenUserMenu = value)"
    @updateWhistList="value => (isOpenWhistList = value)"
    @updateShoppingCart="value => (isOpenShoppingCart = value)"
    transparent
  />
  <section
    v-if="landingImage?.imageUrl"
    :class="`${baseClass}__image `"
    :style="{ backgroundImage: `url(${landingImage?.imageUrl})` }"
  />
  <section :class="`${baseClass}__content`">
    <ui-button 
      @click="router.push('/products')" 
      text="Shop now" 
      :class="`${baseClass}__button`" colorSoft
    />
    <div :class="`${baseClass}__info`">
      <p :class="`${baseClass}__text`">Free shipping</p>
      <p :class="`${baseClass}__text`">|</p>
      <p :class="`${baseClass}__text`">Free 30 days return</p>
      <p :class="`${baseClass}__text`">|</p>
      <p :class="`${baseClass}__text`">Secure payment</p>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';

  import UiButton from '@/components/shared/ui-button.component.vue';
  import { generalService } from '@/services';

  import Header from './header.view.vue';

  const baseClass = 'home';

  const router = useRouter();
  
  const isOpenMenu = ref(false);
  const isOpenUserMenu = ref(false);
  const isOpenWhistList = ref(false);
  const isOpenShoppingCart = ref(false);

  const landingImage = ref();

  onMounted(async () => {
    const images = await generalService.getLandingImages();
    landingImage.value = images[0];
  });
</script>

<style lang="scss" scoped>
  .home {
    &__image {
      height: 100%;
      width: 100%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    &__content {
      position: absolute;
      bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
    }

    &__button {
      align-self: flex-end;
      margin-bottom: 42px;
      margin-right: 48px;
      height: 3rem;
      width: 12rem;
    }

    &__info {
      display: flex;
      justify-content: space-evenly;
      background-color: var(--color-soft-primary);
      height: 4rem;
      padding: 14px 18px;
    }

    &__text {
      align-self: center;
      color: var(--color-vibrant-primary);
    }

    &__tab {
      color: var(--color-dark-primary);
    }
  }
</style>
