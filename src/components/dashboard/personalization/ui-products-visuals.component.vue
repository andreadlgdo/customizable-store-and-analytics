<template>
    <UiHeaderDashboard route="Personalization" />
    <h1 :class="`${baseClass}__title`">Personalizacion de productos</h1>
    <ui-toggle @click="selectToggle" :options="options" border :class="`${baseClass}__toggle`"/>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import UiToggle from '@/components/shared/ui-toggle.component.vue';

import UiHeaderDashboard from '@/components/dashboard/ui-header-dashboard.component.vue';

const baseClass = 'ui-products-visuals';

const options = ref([
  { label: 'Landing', selected: true },
  { label: 'Detalle de producto', selected: false },
  { label: 'Carrito', selected: false },
  { label: 'Lista de deseos', selected: false },
]);

const selectToggle = (option: { label: string; selected: boolean }) => {
  options.value = options.value.map(item => ({
    ...item,
    selected: item.label === option.label
  }));
};

</script>

<style lang="scss" scoped>
.ui-products-visuals {
    &__title {
        margin-top: 3rem;
    }

    &__toggle {
      margin-top: 16px;
    }
}
</style>