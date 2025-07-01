<template>
    <UiHeaderDashboard route="Analytics" />
    <div :class="baseClass">
        <div :class="`${baseClass}__header`">
            <h1 :class="`${baseClass}__title`">Top 10 productos por categoría</h1>
            <UiIconButton
                icon="download"
                :class="`${baseClass}__icon`"
                size="small"
                @click="downloadPdf"
                :disabled="isDownloading"
            />
        </div>
        <UiSelect @change="selectCategory" label="Categoría" :options="categories" :value="category" :class="`${baseClass}__select`" show-all-option />
        <UiToggle @click="selectToggle" :options="toggleOptions" :class="`${baseClass}__toggle`" />
        <div v-if="toggleOptions[0].selected" :class="`${baseClass}__chart-container`" ref="chartContainer">
            <UiBarChart :top-products="topProducts" />
        </div>
        <div v-else-if="toggleOptions[1].selected" :class="`${baseClass}__chart-container`" ref="chartContainer">
            <UiPieChart :top-products="topProducts" />
        </div>
        <div v-else ref="chartContainer">
            <UiProductsGrid :top-products="topProducts" />
        </div>
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
import UiIconButton from '@/components/shared/ui-icon-button.component.vue';
import { useAnalytics, useCategories, usePdfExport } from '@/composables';
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
const { exportChartToPdf, exportListToPdf } = usePdfExport();

const topProducts = ref<TopProduct[]>([]);
const chartContainer = ref<HTMLElement>();
const isDownloading = ref(false);

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

const downloadPdf = async () => {
  if (!chartContainer.value || isDownloading.value) return;
  
  try {
    isDownloading.value = true;
    
    const selectedOption = toggleOptions.value.find(option => option.selected);
    if (!selectedOption) return;
    
    const categoryTitle = category.value || 'Todas las categorías';
    
    if (selectedOption.label === 'Listado') {
      await exportListToPdf(chartContainer.value, topProducts.value);
    } else {
      const chartType = selectedOption.label === 'Barras' ? 'Gráfico de Barras' : 'Gráfico Circular';
      await exportChartToPdf(chartContainer.value, `${chartType} - ${categoryTitle}`, topProducts.value);
    }
  } catch (error) {
    console.error('Error downloading PDF:', error);
    // You could add a toast notification here
  } finally {
    isDownloading.value = false;
  }
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

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    &__icon {
        margin-top: 1rem;
        margin-bottom: 1rem;
        background-color: var(--color-primary);
        border-radius: 50%;
        padding: 0.8rem;
        transition: all 0.3s ease;

        &:hover:not(:disabled) {
            background-color: var(--color-dark-primary);
        }

        &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
    }

    &__select {
        position: absolute;
        top: 28px;
        right: 100px;
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