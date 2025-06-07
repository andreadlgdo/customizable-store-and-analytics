<template>
    <UiHeaderDashboard route="Analytics" />
    <div :class="baseClass">
        <h1 :class="`${baseClass}__title`">Top 10 productos por categoría</h1>
        <UiSelect @change="selectCategory" label="Categoría" :options="categories" :value="category" :class="`${baseClass}__select`" show-all-option />
        <UiToggle @click="selectToggle" :options="toggleOptions" :class="`${baseClass}__toggle`" />
        <div v-if="toggleOptions[0].selected" :class="`${baseClass}__chart-container`">
            <UiBarChart :top-products="topProducts" />
        </div>
        <div v-else-if="toggleOptions[1].selected" :class="`${baseClass}__chart-container`">
            <UiPieChart :top-products="topProducts" />
        </div>
        <UiProductsGrid v-else :top-products="topProducts" />
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import UiHeaderDashboard from '@/components/dashboard/ui-header-dashboard.component.vue';
import UiToggle, { ToggleOption } from '@/components/shared/ui-toggle.component.vue';
import UiBarChart from './ui-bar-chart.component.vue';
import UiPieChart from './ui-pie-chart.component.vue';
import UiProductsGrid from './ui-products-grid.component.vue';
import UiSelect from '@/components/shared/ui-select.component.vue';
import { useAnalytics, useCategories } from '@/composables';
import { TopProduct } from '@/interfaces';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement
} from 'chart.js';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement
);

const baseClass = 'ui-products-analytics';

const { getTopProducts } = useAnalytics();
const { categories: categoriesList, loadCategories } = useCategories();

const topProducts = ref<TopProduct[]>([]);

const toggleOptions = ref<ToggleOption[]>([
  { label: 'Barras', selected: true },
  { label: 'Circular', selected: false },
  { label: 'Listado', selected: false }
]);

const category = ref<string>('');

const categories = computed(() => {
  return categoriesList.value?.map(category => ({
    title: category.title,
    disabled: false
  })) ?? [];
});

const selectToggle = (option: ToggleOption) => {
  toggleOptions.value = toggleOptions.value.map(item => ({
    ...item,
    selected: item.label === option.label
  }));
};

const selectCategory = async (value: string) => {
  category.value = value === 'all by default' ? '' : value;
  const products = await getTopProducts([category.value]);
  topProducts.value = products.slice(0, 10);
};

onMounted(async () => {
    await loadCategories();
    const products = await getTopProducts();
    topProducts.value = products.slice(0, 10);
});
</script>

<style lang="scss" scoped>
.ui-products-analytics {
    position: relative;
    padding: 2rem;

    &__select {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 200px;
    }

    &__title {
        font-size: 2rem;
        font-weight: 700;
        margin-top: 1rem;
        margin-bottom: 1rem;
        color: #2c3e50;
    }

    &__toggle {
        margin-bottom: 2rem;
    }
    
    &__chart-container {
        height: 400px;
        background: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1);
    }
}
</style>