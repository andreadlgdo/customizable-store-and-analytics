<template>
    <div :class="baseClass">
        <h1 :class="`${baseClass}__title`">
            {{ t('contactUs.title') }}
        </h1>
        <UiContactForm />
        <UiContactMethods />
    </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

import UiContactForm from '../../../contact-us/ui-contact-form.component.vue';
import UiContactMethods from '../../../contact-us/ui-contact-methods.component.vue';

const baseClass = 'ui-contact-us-preview';

const { t } = useI18n();
</script>

<style lang="scss" scoped>
.ui-contact-us-preview {
    &__title {
        margin-bottom: 1.5rem;
        text-align: center;
    }
}
</style>