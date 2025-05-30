<template>
    <div :class="baseClass">
        <h1 :class="`${baseClass}__title`">
            {{ title }}
        </h1>
        <UiContactForm />
        <UiContactMethods />
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import UiContactForm from '../../../contact-us/ui-contact-form.component.vue';
import UiContactMethods from '../../../contact-us/ui-contact-methods.component.vue';
import { customService } from '@/services';

const baseClass = 'ui-contact-us-preview';

const title = ref('');

onMounted(async () => {
    const customTexts = await customService.getCustomTexts("contactUs");
    title.value = customTexts.title;
});
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