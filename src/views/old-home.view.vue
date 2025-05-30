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
  />
  <section
    v-if="landingImage.main?.imageUrl"
    :class="`${baseClass}__image `"
    :style="{ backgroundImage: `url(${landingImage.main?.imageUrl})` }"
  ></section>
  <categories-carousel :items="categories" />
  <product-carousel :label="t('landing.carousel.newProducts')" :products="products" />
  <properties-section
    :background-image-url="landingImage.secondary?.imageUrl"
    :items="properties"
  />
  <div :class="`${baseClass}__categories`">
    <categories-section
      v-for="category in sections"
      :key="category?._id ?? ''"
      :text="category?.title ?? ''"
      :image="category?.imageUrl ?? ''"
      size="large"
      have-shadow
      :class="`${baseClass}__category`"
    />
  </div>
  <Footer />
</template>

<script lang="ts" setup>
  import { computed, ref, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';

  import {
    CategoriesCarousel,
    CategoriesSection,
    Footer,
    ProductCarousel,
    PropertiesSection
  } from '../components';
  import { useCategories, useMobile, useProducts } from '../composables';
  import { CategoryEnum } from '../enums';
  import { generalService } from '../services';

  import Header from './app-header.view.vue';

  const baseClass = 'home';

  const { categories, loadCategories, getCategoriesByFilter } = useCategories();
  const { t } = useI18n();
  const { isMobile } = useMobile();
  const { products, loadProducts } = useProducts();

  const landingImage = ref({ main: {}, secondary: {} });

  const isOpenMenu = ref(false);
  const isOpenUserMenu = ref(false);
  const isOpenWhistList = ref(false);
  const isOpenShoppingCart = ref(false);

  const properties = computed(() => [
    { icon: 'size', label: t('landing.properties.size') },
    { icon: 'design', label: t('landing.properties.design') },
    { icon: 'made', label: t('landing.properties.made') },
    { icon: 'return', label: t('landing.properties.return') },
    { icon: 'material', label: t('landing.properties.material') }
  ]);

  const sections = ref();

  onMounted(async () => {
    const images = await generalService.getLandingImages();
    landingImage.value.main = images[0];
    landingImage.value.secondary = images[1];
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
      margin: 1.5rem 0;
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
