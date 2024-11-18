<template>
  <header-layout />
  <section
    v-if="landingImage.main?.imageUrl"
    :class="`${baseClass}__image ${baseClass}__image--primary `"
    :style="{ backgroundImage: `url(${landingImage.main?.imageUrl})` }"
  ></section>
  <categories-carousel :items="categories" />
  <product-carousel :label="t('landing.carousel.newProducts')" :products="products" />
  <div :class="`${baseClass}__wrapper`">
    <div :class="`${baseClass}__properties`">
      <section
        v-for="(item, index) in properties"
        :key="index"
        :class="`${baseClass}__property ${baseClass}__property--${index}`"
      >
        <svg-icon :src="require(`../assets/media/icons/properties/${item.icon}.svg`)" size="none" />
        <base-text tag="h4">{{ item.label }}</base-text>
      </section>
    </div>
    <section
      v-if="landingImage.secondary?.imageUrl"
      :class="`${baseClass}__image ${baseClass}__image--secondary `"
      :style="{ backgroundImage: `url(${landingImage.secondary?.imageUrl})` }"
    ></section>
  </div>
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
    BaseText,
    CategoriesCarousel,
    CategoriesSection,
    Footer,
    ProductCarousel,
    SvgIcon
  } from '../components';
  import { useCategories, useMobile, useProducts } from '../composables';
  import { CategoryEnum } from '../enums';
  import { generalService } from '../services';

  import HeaderLayout from './header-layout.view.vue';

  const baseClass = 'home';

  const { categories, loadCategories, getCategoriesByFilter } = useCategories();
  const { t } = useI18n();
  const { isMobile } = useMobile();
  const { products, loadProducts } = useProducts();

  const landingImage = ref({ main: {}, secondary: {} });

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
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;

      &--primary {
        height: 100%;
        width: 100%;
      }

      &--secondary {
        height: 44rem;
        clip-path: polygon(0 50%, 50% 60%, 100% 50%, 100% 100%, 0% 100%);
      }
    }

    &__categories {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin: 1.5rem 0;
    }

    &__category {
      margin: 1rem;
    }

    &__wrapper {
      width: 100%;
      height: 44rem;
      background-color: var(--color-primary);
    }

    &__properties {
      position: absolute;
      display: flex;
      justify-content: space-evenly;
      width: 100%;
      gap: 6rem;
      padding: 0 2rem;
      overflow-x: hidden;
    }

    &__property {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;

      &--0,
      &--4 {
        margin-top: 3rem;
      }

      &--1,
      &--3 {
        margin-top: 6rem;
      }

      &--2 {
        margin-top: 9rem;
      }
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
