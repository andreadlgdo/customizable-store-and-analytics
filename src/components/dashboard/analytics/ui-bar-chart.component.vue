<template>
    <Bar
        v-if="chartData"
        :data="chartData"
        :options="chartOptions"
    />
    <div v-else class="no-data-message">
        No hay datos de productos para mostrar
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { TopProduct } from '@/interfaces';

const props = defineProps<{
    topProducts: TopProduct[], 
    title: string
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
            text: props.title
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