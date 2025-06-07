<template>
    <div :class="baseClass">
        <div v-for="(item, index) in topProducts" 
             :key="item.product._id" 
             :class="`${baseClass}__card`">
            <div :class="`${baseClass}__rank`">#{{ index + 1 }}</div>
            <div :class="`${baseClass}__content`">
                <h3 :class="`${baseClass}__text ${baseClass}__text--name`">{{ item.product.name }}</h3>
                <p :class="`${baseClass}__text ${baseClass}__text--id`">{{ item.product._id }}</p>
                <div :class="`${baseClass}__text ${baseClass}__text--clicks`">{{ item.viewCount }} Clicks</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { TopProduct } from '@/interfaces';

defineProps<{
    topProducts: TopProduct[]
}>();

const baseClass = 'ui-products-grid';
</script>

<style lang="scss" scoped>
.ui-products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    max-height: 550px;
    overflow-y: auto;
    padding-right: 0.5rem;

    &__card {
        background: white;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1);
        display: flex;
        position: relative;
        transition: transform 0.2s ease;

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.15);
        }
    }

    &__rank {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: #e8f4fd;
        color: #3498db;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        border: 1px solid #bde0fe;
    }

    &__content {
        width: 100%;
    }

    &__text {
        &--name {
            font-size: 1.25rem;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 0.5rem;
        }

        &--id {
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 1rem;
        }

        &--clicks {
            font-size: 1.2rem;
            color: #666;
        }
    }
}
</style> 