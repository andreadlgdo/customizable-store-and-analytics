<template>
  <header-layout />
  <section
    v-if="landingImage?.imageUrl"
    :class="`${baseClass}__image`"
    :style="{ backgroundImage: `url(${landingImage.imageUrl})` }"
  ></section>
  <categories-carousel />
</template>

<script lang="ts" setup>
  import { computed, ref, onMounted } from 'vue';

  import { CategoriesCarousel } from '../components';
  import { useMobile } from '../composables';
  import { generalService } from '../services';

  import HeaderLayout from './header-layout.view.vue';

  const baseClass = 'home';

  const { isMobile } = useMobile();

  const images = ref([]);

  const landingImage = computed(() => {
    if (isMobile.value) {
      return images.value.find((image: any) => image.device === 'mobile');
    } else {
      return images.value.find((image: any) => image.device === 'desktop');
    }
  });

  onMounted(async () => {
    images.value = await generalService.getLandingImages();
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
  }
</style>
