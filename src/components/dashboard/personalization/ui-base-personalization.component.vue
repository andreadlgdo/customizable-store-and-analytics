<template>
      <div :class="baseClass">
        <UiHeaderDashboard route="Personalization" />
        <h1 :class="`${baseClass}__title`">{{ title }}</h1>
        <div :class="`${baseClass}__container`">
            <div :class="`${baseClass}__section ${baseClass}__section--one`">
                <slot name="customization" />
                <div :class="`${baseClass}__wrapper`">
                    <UiButton @click="$emit('save')" text="Guardar" />
                    <UiButton @click="$emit('cancel')" text="Cancelar" transparent />
                </div>
            </div>
            <div :class="`${baseClass}__section ${baseClass}__section--two`">
                <p :class="`${baseClass}__subtitle`">PREVIEW</p>
                <slot name="preview" />
            </div>
        </div>
      </div>
</template>

<script lang="ts" setup>
import UiButton from '@/components/shared/ui-button.component.vue';
import UiHeaderDashboard from '@/components/dashboard/ui-header-dashboard.component.vue';

const baseClass = 'ui-base-personalization';

defineProps<{
    title: string;
}>();

defineEmits<{
    (e: 'save'): void;
    (e: 'cancel'): void;
}>();
</script>

<style lang="scss" scoped>
.ui-base-personalization {
    display: flex;
    flex-direction: column;
    height: 100%;

    &__title {
        margin-top: 3rem;
    }

    &__container {
        display: flex;
        flex: 1;
        overflow: hidden;
        position: relative;
    }

    &__section {
        padding: 1rem;
        margin-bottom: 70px;

        &--one {
            flex: 1;
            border-right: 1px solid #ccc;
            overflow-y: scroll;
        }

        &--two {
            flex: 2;
        }
    }

    &__wrapper {
        display: flex;
        gap: 1rem;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: white;
        padding: 1rem;
        z-index: 10;
    }

    &__subtitle {
        font-weight: bold;
    }
}
</style>