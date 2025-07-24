<template>
  <dashboard :selected-item="menuElements[7]">
    <div :class="[baseClass, { [`${baseClass}--edit`]: action }]">
      <div v-if="!action" :class="`${baseClass}__header`">
        <h1 :class="`${baseClass}__title`">Analytics</h1>
        <p :class="`${baseClass}__subtitle`">Analiza el rendimiento y comportamiento de tu tienda</p>
      </div>
      <div v-if="!action" :class="`${baseClass}__wrapper`">
        <section 
          v-for="(section, index) in sections" 
          :key="index"
          @click="selectAction(section.action)" 
          :class="`${baseClass}__section`"
        >
          <div :class="`${baseClass}__section-content`">
            <h2 :class="`${baseClass}__section-title`">{{ section.title }}</h2>
            <p :class="`${baseClass}__section-description`">{{ section.description }}</p>
          </div>
        </section>
      </div>
      <UiProductsByCategoryAnalytics v-else-if="action === actions[0]" />
      <UiPurchaseProductsAnalytics v-else-if="action === actions[1]" />
      <UiViewCategoriesAnalytics v-else-if="action === actions[2]" />
      <UiPurchaseCategoriesAnalytics v-else-if="action === actions[3]" />
    </div>
  </dashboard>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';

  import { useUserMenu } from '@/composables';
  import Dashboard from '@/views/dashboard/base-dashboard.view.vue';
  import UiProductsByCategoryAnalytics from '@/components/dashboard/analytics/ui-products-by-category-analytics.component.vue';
  import UiPurchaseProductsAnalytics from '@/components/dashboard/analytics/ui-purchase-products-analytics.component.vue';
  import UiViewCategoriesAnalytics from '@/components/dashboard/analytics/ui-view-categories-analytics.component.vue';
  import UiPurchaseCategoriesAnalytics from '@/components/dashboard/analytics/ui-purchase-categories-analytics.component.vue';
  const baseClass = 'analytics-dashboard';

  const { menuElements } = useUserMenu();
  const router = useRouter();

  defineProps({
    action: {
      type: String,
      default: undefined
    }
  });

  const actions = ['productsByCategory', 'orderProductsByCategory', 'mostViewedCategories', 'mostPurchasedCategories'];

  const sections = [
    {
      title: 'Top 10 productos visualizados',
      description: 'Los productos con más visualizaciones en la tienda por categoría',
      action: 'productsByCategory'
    },
    {
      title: 'Los 10 productos más comprados',
      description: 'Los productos más comprados en la tienda',
      action: 'orderProductsByCategory'
    },
    {
      title: 'Top 5 categorias visualizadas',
      description: 'Las categorias con más visualizaciones en la tienda',
      action: 'mostViewedCategories'
    },
    {
      title: 'Top 5 categorias más compradas',
      description: 'Las categorias mas compradas en la tienda',
      action: 'mostPurchasedCategories'
    },
  ];

  const selectAction = (action: string) => {
    router.push({
      name: 'Analytics',
      params: { action }
    });
  };
</script>

<style lang="scss" scoped>
.analytics-dashboard {
  padding: 2rem;
  width: 100%;
  min-height: calc(100vh - 64px);
  background-color: var(--color-background-light, #f8f9fa);

  &--edit {
    background-color: white;
  }

  &__header {
    text-align: center;
    margin-bottom: 3rem;
  }

  &__title {
    font-size: 2.5rem;
    color: var(--color-dark-primary);
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  &__subtitle {
    font-size: 1.1rem;
    color: var(--color-text-secondary, #6c757d);
  }

  &__wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0.5rem;
  }
  
  &__section {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 2px solid transparent;
    cursor: pointer;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
      border-color: var(--color-primary, #007bff);
    }
  }

  &__section-content {
    text-align: center;
  }

  &__section-title {
    font-size: 1.5rem;
    color: var(--color-dark-primary);
    margin-bottom: 0.75rem;
    font-weight: 600;
  }

  &__section-description {
    color: var(--color-text-secondary, #6c757d);
    font-size: 1rem;
    line-height: 1.5;
  }
}
</style>
