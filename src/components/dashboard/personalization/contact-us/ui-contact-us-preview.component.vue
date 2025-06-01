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
import { ContactUsCustom } from '../../../../types/custom-us.type';

import UiContactForm from '../../../contact-us/ui-contact-form.component.vue';
import UiContactMethods from '../../../contact-us/ui-contact-methods.component.vue';

const baseClass = 'ui-contact-us-preview';

defineProps<{
    title: string;
    custom: ContactUsCustom
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