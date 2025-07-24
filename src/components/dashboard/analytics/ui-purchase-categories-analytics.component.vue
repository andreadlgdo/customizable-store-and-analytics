<template>
    <UiHeaderDashboard route="Analytics" />
    <div :class="baseClass">
        <div :class="`${baseClass}__header`">
            <h1 :class="`${baseClass}__title`">Top 5 categorías más compradas</h1>
            <UiIconButton
                icon="download"
                :class="`${baseClass}__icon`"
                size="small"
                @click="downloadPdf"
                :disabled="isDownloading"
            />
        </div>
        <UiToggle @click="selectToggle" :options="toggleOptions" :class="`${baseClass}__toggle`" />
        <div v-if="toggleOptions[0].selected" :class="`${baseClass}__chart-container`" ref="chartContainer">
            <UiPurchaseCategoriesBarChart :top-categories="topCategories" />
        </div>
        <div v-else-if="toggleOptions[1].selected" :class="`${baseClass}__chart-container`" ref="chartContainer">
            <UiPurchaseCategoriesPieChart :top-categories="topCategories" />
        </div>
        <div v-else ref="chartContainer">
            <UiPurchaseCategoriesGrid :top-categories="topCategories" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import UiHeaderDashboard from '@/components/dashboard/ui-header-dashboard.component.vue';
import UiToggle, { ToggleOption } from '@/components/shared/ui-toggle.component.vue';
import UiPurchaseCategoriesBarChart from './ui-purchase-categories-bar-chart.component.vue';
import UiPurchaseCategoriesPieChart from './ui-purchase-categories-pie-chart.component.vue';
import UiPurchaseCategoriesGrid from './ui-purchase-categories-grid.component.vue';
import UiIconButton from '@/components/shared/ui-icon-button.component.vue';
import { useAnalytics, usePdfExport } from '@/composables';
import { TopPurchasedCategory } from '@/interfaces';
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

const baseClass = 'ui-purchase-categories-analytics';

const { getMostPurchasedCategories } = useAnalytics();
const { exportChartToPdf, exportListToPdf } = usePdfExport();

const topCategories = ref<TopPurchasedCategory[]>([]);
const chartContainer = ref<HTMLElement>();
const isDownloading = ref(false);

const toggleOptions = ref<ToggleOption[]>([
  { label: 'Barras', selected: true },
  { label: 'Circular', selected: false },
  { label: 'Listado', selected: false }
]);

const selectToggle = (option: ToggleOption) => {
  toggleOptions.value = toggleOptions.value.map(item => ({
    ...item,
    selected: item.label === option.label
  }));
};

const downloadPdf = async () => {
  if (!chartContainer.value || isDownloading.value) return;
  
  try {
    isDownloading.value = true;
    
    const selectedOption = toggleOptions.value.find(option => option.selected);
    if (!selectedOption) return;
    
    if (selectedOption.label === 'Listado') {
      await exportListToPdf(chartContainer.value, topCategories.value);
    } else {
      const chartType = selectedOption.label === 'Barras' ? 'Gráfico de Barras' : 'Gráfico Circular';
      await exportChartToPdf(chartContainer.value, `${chartType} - Top Categorías Compradas`, topCategories.value);
    }
  } catch (error) {
    console.error('Error downloading PDF:', error);
  } finally {
    isDownloading.value = false;
  }
};

onMounted(async () => {
    const categories = await getMostPurchasedCategories();
    topCategories.value = categories.map((category: any) => ({
        product: {
            _id: category._id,
            name: category._id
        },
        totalUnits: category.totalUnits
    }));
});
</script>

<style lang="scss" scoped>
.ui-purchase-categories-analytics {
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
