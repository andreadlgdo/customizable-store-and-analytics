<template>
    <div :class="baseClass">
        <UiHeaderPersonalization />
        <h1 :class="`${baseClass}__title`">Contact us Page</h1>
        <div :class="`${baseClass}__container`">
            <div :class="`${baseClass}__section ${baseClass}__section--one`">
                <UiTextbox 
                    @input="(value: string) => contactUsTexts.title = value" 
                    label="Titulo" 
                    :value="contactUsTexts?.title" 
                    :class="`${baseClass}__textbox`"
                />
                <p>FORMULARIO</p>
                <UiExpandSection title="Textos" :style="{ marginTop: '12px' }">
                    <template v-for="(field, index) in formFields" :key="index">
                        <UiTextbox 
                            @input="(value: string) => contactUsTexts.form[index].label = value" 
                            :label="field.label" 
                            :value="contactUsTexts?.form[index].label" 
                            :info="`Label del campo ${index + 1}`" 
                            :class="`${baseClass}__textbox`" 
                        />
                        <UiTextbox 
                            @input="(value: string) => contactUsTexts.form[index].placeholder = value" 
                            :value="contactUsTexts?.form[index].placeholder" 
                            :info="`Placeholder del campo ${index + 1}`" 
                            :class="`${baseClass}__textbox`" 
                        />
                    </template>
                    <UiTextbox 
                        @input="(value: string) => contactUsTexts.form[4].action = value" 
                        label="Botón del formulario" 
                        :value="contactUsTexts?.form[4].action" 
                        info="Label del botón del formulario" 
                        :class="`${baseClass}__textbox`"
                    />
                </UiExpandSection>
                <UiExpandSection title="Email de contacto" :style="{ marginTop: '12px' }">
                    <UiTextbox 
                        value="support@gmail.com" 
                        info="Email al que llegara la duda del usuario" 
                        :class="`${baseClass}__textbox`" 
                    />
                </UiExpandSection>
                <p>SECCIONES DE CONTACTO</p>
                <UiExpandSection title="Datos de contacto" :style="{ marginTop: '12px' }">
                    <template v-for="(field, index) in contactFields" :key="index">
                        <UiTextbox 
                            :value="field.value" 
                            :info="field.info" 
                            :class="`${baseClass}__textbox`" 
                        />
                    </template>
                </UiExpandSection>
                <UiExpandSection title="Textos" :style="{ marginTop: '12px' }">
                    <template v-for="(section, index) in sectionTexts" :key="index">
                        <UiTextbox 
                            :info="section.info" 
                            :value="contactUsTexts?.sections[index]" 
                            :class="`${baseClass}__textbox`"
                        />
                    </template>
                </UiExpandSection>
                <UiExpandSection title="Colores" :style="{ marginTop: '12px' }">
                    <template v-for="(section, key) in colorSections" :key="key">
                        <UiColorPicker 
                            :label="section.label" 
                            @update:modelValue="(value: string) => colors[key].normal = value" 
                            :modelValue="colors[key].normal" 
                            info="Color primario"
                            :style="key !== 'email' ? { marginTop: '12px' } : {}"
                        />
                        <UiColorPicker 
                            @update:modelValue="(value: string) => colors[key].soft = value" 
                            :modelValue="colors[key].soft" 
                            info="Color secundario"
                        />
                    </template>
                </UiExpandSection>
                <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--button`">
                    <UiButton @click="save" text="Guardar" />
                    <UiButton @click="cancel" text="Cancelar" transparent />
                </div>
            </div>
            <div :class="`${baseClass}__section ${baseClass}__section--two`">
                <p>PREVIEW</p>
                <UiContactUsPreview />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import UiHeaderPersonalization from '../ui-header-personalization.component.vue';
import UiExpandSection from '../../../shared/ui-expand-section.component.vue';
import UiContactUsPreview from './ui-contact-us-preview.component.vue';
import UiTextbox from '../../../shared/ui-textbox.component.vue';
import UiButton from '../../../shared/ui-button.component.vue';
import UiColorPicker from '../../../shared/ui-color-picker.component.vue';
import { customTextsService } from '@/services';

const baseClass = 'ui-contact-us';
const contactUsTexts = ref();

const formFields = [
    { label: 'Identificador usuario' },
    { label: 'Email' },
    { label: 'Asunto' },
    { label: 'Mensaje' }
];

const contactFields = [
    { value: 'support@gmail.com', info: 'Email de la empresa' },
    { value: '+1 (555) 123-4567', info: 'Telefono de la empresa' },
    { value: '123 Fashion St, NY 10001', info: 'Dirección de la empresa' }
];

const sectionTexts = [
    { info: 'Sección email' },
    { info: 'Sección telefono' },
    { info: 'Sección direccion' }
];

const colorSections = {
    email: { label: 'Sección email' },
    phone: { label: 'Sección telefono' },
    address: { label: 'Sección direccion' }
};

const colors = ref({
    email: {
        normal: '#4285f4',
        soft: '#f2f6ff'
    },
    phone: {
        normal: '#0b9d58',
        soft: '#f1f8f3'
    },
    address: {
        normal: '#db4537',
        soft: '#fdf3f2'
    }   
});

const save = async () => {
  try {
    await customTextsService.updateCustomTexts("contactUs", contactUsTexts.value);
    window.location.reload();
  } catch (error) {
    console.error('Error saving custom texts:', error);
  }
};

const cancel = async () => {
    contactUsTexts.value = await customTextsService.getCustomTexts("contactUs");
};

onMounted(async () => {
    contactUsTexts.value = await customTextsService.getCustomTexts("contactUs");
});
</script>

<style lang="scss" scoped>
.ui-contact-us {
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
        overflow: scroll;
        margin-bottom: 70px;

        &--one {
            flex: 1;
            border-right: 1px solid #ccc;
        }

        &--two {
            flex: 2;
        }
    }

    &__wrapper {
        display: flex;
        gap: 1rem;

        &--button {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: white;
            padding: 1rem;
            z-index: 10;
        }
    }

    &__textbox {
        margin-bottom: 12px;
    }
}
</style>