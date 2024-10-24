<template>
  <header-layout />
  <img v-if="landingImage?.imageUrl" :src="landingImage.imageUrl" :alt="landingImage.type" />
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';

  import { generalService } from '../services/general.service';

  import HeaderLayout from './header-layout.view.vue';

  const landingImage = ref();

  onMounted(async () => {
    landingImage.value = await generalService.getLandingImage();
  });
</script>

<style lang="scss" scoped>
  .home {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 4rem;
    margin: 2rem;

    &__image {
      height: 14rem;
      width: 10rem;
    }

    &__product {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 14rem;
    }
  }
</style>
