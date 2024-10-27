<template>
  <header-layout />
  <img
    v-if="landingImage?.imageUrl"
    :class="`${baseClass}__image`"
    :src="landingImage.imageUrl"
    :alt="landingImage.type"
  />
</template>

<script lang="ts" setup>
  import { computed, ref, onMounted } from 'vue';

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
    @media only screen and (max-width: 768px) {
      &__image {
        width: 100%;
        height: auto;
      }
    }
  }
</style>
