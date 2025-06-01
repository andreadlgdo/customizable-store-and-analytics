<template>
  <Header
    :opened-menu="isOpenMenu"
    :opened-user-menu="isOpenUserMenu"
    :opened-whist-list="isOpenWhistList"
    :opened-shopping-cart="isOpenShoppingCart"
    @updateMenu="isOpenMenu = $event"
    @updateUserMenu="isOpenUserMenu = $event"
    @updateWhistList="isOpenWhistList = $event"
    @updateShoppingCart="isOpenShoppingCart = $event"
    transparent
  />
  <section
    v-if="landingImage?.imageUrl"
    :class="`${baseClass}__image`"
    :style="{ backgroundImage: `url(${landingImage?.imageUrl})` }"
  />
  <section :class="`${baseClass}__content`">
    <ui-button 
      @click="router.push('/products')" 
      :text="homeCustom?.texts.mainAction" 
      :background-color="homeCustom?.visuals.colors.button"
      :class="`${baseClass}__button`" 
    />
    <div :class="`${baseClass}__info`" :style="containerStyle">
        <template v-for="(highlight, index) in homeCustom?.texts.highlights" :key="index">
            <p :class="`${baseClass}__text`">{{ highlight }}</p>
            <p v-if="index < homeCustom?.texts.highlights.length - 1" :class="`${baseClass}__text`">|</p>
        </template>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';

  import UiButton from '@/components/shared/ui-button.component.vue';
  import { customService, generalService } from '../services';

  import Header from './app-header.view.vue';

  const baseClass = 'home';

  const router = useRouter();
  
  const isOpenMenu = ref(false);
  const isOpenUserMenu = ref(false);
  const isOpenWhistList = ref(false);
  const isOpenShoppingCart = ref(false);

  const landingImage = ref();
  const homeCustom = ref();

  const containerStyle = computed(() => ({
    '--color-vibrant-primary': homeCustom.value?.visuals.colors.secondary,
    '--color-soft-primary': homeCustom.value?.visuals.colors.primary
  }));

  onMounted(async () => {
    homeCustom.value = await customService.getCustom('home');
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
