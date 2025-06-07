<template>
    <div :class="baseClass">
        <h1 :class="`${baseClass}__title`">Productos</h1>
    </div>
</template>

<script lang="ts" setup>
const baseClass = 'ui-products-analytics';
</script>

<style lang="scss" scoped>
.ui-products-analytics {
    &__title {
        font-size: 2rem;
        font-weight: 700;
    }
}
</style>