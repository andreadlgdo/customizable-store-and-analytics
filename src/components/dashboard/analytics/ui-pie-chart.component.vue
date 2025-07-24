<template>
    <Pie
        v-if="chartData"
        :data="chartData"
        :options="pieChartOptions"
    />
    <div v-else class="no-data-message">
        No hay datos de productos para mostrar
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Pie } from 'vue-chartjs';
import { TopProduct } from '@/interfaces';

const props = defineProps<{
    topProducts: TopProduct[],
    title: string
}>();

const pieColors = [
    '#67b3b3', // soft teal
    '#FFD6E0', // pastel pink
    '#D6FFE0', // pastel mint
    '#D6E6FF', // pastel blue
    '#FFFFD6', // pastel yellow
    '#FFD6F0', // pastel rose
    '#E6D6FF', // pastel purple
    '#D6F0FF', // pastel sky blue
    '#FFE6D6', // pastel peach
    '#D6FFE6'  // pastel green
];

const chartData = computed(() => {
    if (!props.topProducts.length) return null;

    return {
        labels: props.topProducts.map(item => item.product.name),
        datasets: [{
            label: 'Número de Vistas',
            data: props.topProducts.map(item => item.viewCount),
            backgroundColor: pieColors,
            borderColor: pieColors.map(color => color + '99'), // Adding transparency to borders
            borderWidth: 1
        }]
    };
});

const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'right' as const,
        },
        title: {
            display: true,
            text: props.title
        }
    }
};
</script>

<style scoped>
.no-data-message {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    color: #666;
    font-size: 2rem;
    font-weight: 700;
}
</style> 