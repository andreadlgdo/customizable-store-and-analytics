<template>
    <div :class="baseClass">
        <h1 :class="`${baseClass}__title`">
            {{ title }}
        </h1>
        <UiContactForm :editMode="true" :customTexts="custom?.texts" />
        <UiContactMethods :editMode="true" :custom="custom" />
    </div>
</template>

<script lang="ts" setup>
import UiContactForm from '../../../contact-us/ui-contact-form.component.vue';
import UiContactMethods from '../../../contact-us/ui-contact-methods.component.vue';

const baseClass = 'ui-contact-us-preview';

defineProps<{
    title: string;
    custom?: {
        texts: {
            form: Array<{
                label: string;
                placeholder: string;
                action?: string;
            }>;
            subtitle: string;
            sections: string[];
        }
        visuals: {
            colors: Array<{
                primary: string;
            }>;
        },
        data: {
            sections: string[];
        }
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