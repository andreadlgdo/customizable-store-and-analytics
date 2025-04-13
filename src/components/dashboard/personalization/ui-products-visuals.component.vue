<template>
    <div @click="router.push({ name: 'Personalization' })" :class="`${baseClass}__header`">
        <ui-icon-button icon="go-to" :class="`${baseClass}__icon`"/>
        <p :class="`${baseClass}__text`">Volver al menu</p>
    </div>
    <h1 :class="`${baseClass}__title`">Personalizacion de productos</h1>
    <ui-toggle @click="selectToggle" :options="options" border :class="`${baseClass}__toggle`"/>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import UiIconButton from '../../shared/ui-icon-button.component.vue';
import UiToggle from '../../shared/ui-toggle.component.vue';
import { ref } from 'vue';

const baseClass = 'ui-products-visuals';

const router = useRouter();

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
    &__header {
        display: flex;
        align-items: center;
        position: absolute;
        left: 21rem;
        cursor: pointer;
    }

    &__title {
        margin-top: 3rem;
    }

    &__text {
        &:hover {
            font-weight: 600;
        }
    }

    &__icon {
        transform: rotate(180deg);
    }

    &__toggle {
      margin-top: 16px;
    }
}
</style>