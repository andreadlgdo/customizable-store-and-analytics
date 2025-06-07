<template>
    <Bar
        v-if="chartData"
        :data="chartData"
        :options="chartOptions"
    />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { TopProduct } from '@/interfaces';

const props = defineProps<{
    topProducts: TopProduct[]
}>();

const chartData = computed(() => {
    if (!props.topProducts.length) return null;

    return {
        labels: props.topProducts.map(item => item.product.name),
        datasets: [{
            label: 'Número de Vistas',
            data: props.topProducts.map(item => item.viewCount),
            backgroundColor: '#67b3b3',
            borderColor: '#67b3b3',
            borderWidth: 1
        }]
    };
});

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Vistas por Producto'
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Número de Vistas'
            }
        },
        x: {
            title: {
                display: true,
                text: 'Productos'
            }
        }
    }
};
</script> 