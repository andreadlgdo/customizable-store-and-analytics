<template>
    <div :class="baseClass">
        <h1 :class="`${baseClass}__title`">
            {{ title }}
        </h1>
        <UiContactForm :editMode="true" :customTexts="customTexts" />
        <UiContactMethods />
    </div>
</template>

<script lang="ts" setup>
import UiContactForm from '../../../contact-us/ui-contact-form.component.vue';
import UiContactMethods from '../../../contact-us/ui-contact-methods.component.vue';

const baseClass = 'ui-contact-us-preview';

defineProps<{
    title: string;
    customTexts?: {
        form: Array<{
            label: string;
            placeholder: string;
            action?: string;
        }>;
        sections: string[];
    };
}>();
</script>

<style lang="scss" scoped>
.ui-contact-us-preview {
    overflow: scroll;
    height: 100%;
    
    &__title {
        margin-bottom: 1.5rem;
        text-align: center;
    }
}
</style>