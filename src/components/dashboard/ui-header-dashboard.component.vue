<template>
     <div @click="router.push({ name: route })" :class="baseClass">
        <ui-icon-button icon="go-to" :class="`${baseClass}__icon`"/>
        <p :class="`${baseClass}__text`">Volver al menu</p>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import UiIconButton from '@/components/shared/ui-icon-button.component.vue';

const baseClass = 'ui-header-dashboard';

const router = useRouter();

defineProps<{
    route: string;
}>();
</script>

<style lang="scss" scoped>
.ui-header-dashboard {
    display: flex;
    align-items: center;
    position: absolute;
    left: 21rem;
    cursor: pointer;

    &__icon {
        transform: rotate(180deg);
    }

    &__text {
        &:hover {
         font-weight: 600;
        }
    }
}
</style>
