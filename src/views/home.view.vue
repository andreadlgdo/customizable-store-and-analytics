<template>
  <header-layout />
  <section
    v-if="landingImage?.imageUrl"
    :class="`${baseClass}__image`"
    :style="{ backgroundImage: `url(${landingImage.imageUrl})` }"
  ></section>
  <categories-carousel :items="categories" />
  <product-carousel :label="t('landing.carousel.newProducts')" :products="products" />
  <div :class="`${baseClass}__categories`">
    <categories-section
      v-for="category in sections"
      :key="category?._id"
      :text="category?.title"
      :image="category?.imageUrl"
      size="large"
      have-shadow
      :class="`${baseClass}__category`"
    />
  </div>
  <Footer />
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { CategoriesCarousel, CategoriesSection, Footer, ProductCarousel } from '../components';
  import { useCategories, useMobile, useProducts } from '../composables';
  import { CategoryEnum } from '../enums';
  import { generalService } from '../services';

  import HeaderLayout from './header-layout.view.vue';

  const baseClass = 'home';

  const { categories, loadCategories, getCategoriesByFilter } = useCategories();
  const { t } = useI18n();
  const { isMobile } = useMobile();
  const { products, loadProducts } = useProducts();

  const landingImage = ref();

  const sections = ref();

  onMounted(async () => {
    landingImage.value = await generalService.getLandingImage();
    await loadCategories();
    await loadProducts();
    const sectionsImages = await generalService.getSectionsImages();
    const sectionsCategories = getCategoriesByFilter([
      CategoryEnum.JACKETS,
      CategoryEnum.ACCESSORIES
    ]);
    sections.value = isMobile.value
      ? [sectionsCategories[0], sectionsImages[0], sectionsCategories[1], sectionsImages[1]]
      : [sectionsCategories[0], sectionsImages[0], sectionsImages[1], sectionsCategories[1]];
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

    &__categories {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    &__category {
      margin: 1rem;
    }
  }

  @media only screen and (max-width: 500px) {
    .home {
      &__categories {
        grid-template-columns: 1fr;
      }
    }
  }
</style>
