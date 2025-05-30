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
                    <UiTextbox 
                        @input="(value: string) => contactUsTexts.form[0].label = value" 
                        label="Identificador usuario" 
                        :value="contactUsTexts?.form[0].label" 
                        info="Label del campo 1" 
                        :class="`${baseClass}__textbox`" 
                    />
                    <UiTextbox 
                        @input="(value: string) => contactUsTexts.form[0].placeholder = value" 
                        :value="contactUsTexts?.form[0].placeholder" 
                        info="Placeholder del campo 1" 
                        :class="`${baseClass}__textbox`" 
                    />
                    <UiTextbox 
                        @input="(value: string) => contactUsTexts.form[1].label = value" 
                        label="Email" 
                        :value="contactUsTexts?.form[1].label" 
                        info="Label del campo 2" 
                        :class="`${baseClass}__textbox`"
                    />
                    <UiTextbox 
                        @input="(value: string) => contactUsTexts.form[1].placeholder = value" 
                        :value="contactUsTexts?.form[1].placeholder" 
                        info="Placeholder del campo 2" 
                        :class="`${baseClass}__textbox`"
                    />
                    <UiTextbox 
                        @input="(value: string) => contactUsTexts.form[2].label = value" 
                        label="Asunto" 
                        :value="contactUsTexts?.form[2].label" 
                        info="Label del campo 3" 
                        :class="`${baseClass}__textbox`"
                    />
                    <UiTextbox 
                        @input="(value: string) => contactUsTexts.form[2].placeholder = value" 
                        :value="contactUsTexts?.form[2].placeholder" 
                        info="Placeholder del campo 3" 
                        :class="`${baseClass}__textbox`"
                    />
                    <UiTextbox 
                        @input="(value: string) => contactUsTexts.form[3].label = value" 
                        label="Mensaje" 
                        :value="contactUsTexts?.form[3].label" 
                        info="Label del campo 4" 
                        :class="`${baseClass}__textbox`"
                    />
                    <UiTextbox 
                        @input="(value: string) => contactUsTexts.form[3].placeholder = value" 
                        :value="contactUsTexts?.form[3].placeholder" 
                        info="Placeholder del campo 4" 
                        :class="`${baseClass}__textbox`"
                    />
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
                    <UiTextbox 
                        value="support@gmail.com" 
                        info="Email de la empresa" 
                        :class="`${baseClass}__textbox`" 
                    />
                    <UiTextbox 
                        value="+1 (555) 123-4567" 
                        info="Telefono de la empresa" 
                        :class="`${baseClass}__textbox`" 
                    />
                    <UiTextbox 
                        value="123 Fashion St, NY 10001" 
                        info="Dirección de la empresa" 
                        :class="`${baseClass}__textbox`" 
                    />
                </UiExpandSection>
                <UiExpandSection title="Textos" :style="{ marginTop: '12px' }">
                    <UiTextbox 
                        info="Sección email" 
                        :value="contactUsTexts?.sections[0]" 
                        :class="`${baseClass}__textbox`"
                    />
                    <UiTextbox 
                        info="Sección telefono" 
                        :value="contactUsTexts?.sections[1]" 
                        :class="`${baseClass}__textbox`"
                    />
                    <UiTextbox 
                        info="Sección direccion" 
                        :value="contactUsTexts?.sections[2]" 
                        :class="`${baseClass}__textbox`"
                    />
                </UiExpandSection>
                <UiExpandSection title="Colores" :style="{ marginTop: '12px' }">
                    <UiColorPicker 
                        label="Sección email" 
                        @update:modelValue="(value: string) => colors.email.normal = value" 
                        :modelValue="colors.email.normal" 
                        info="Color primario"
                    />
                    <UiColorPicker 
                        @update:modelValue="(value: string) => colors.email.soft = value" 
                        :modelValue="colors.email.soft" 
                        info="Color secundario"
                    />
                    <UiColorPicker 
                        label="Sección telefono" 
                        @update:modelValue="(value: string) => colors.phone.normal = value" 
                        :modelValue="colors.phone.normal" 
                        info="Color primario" 
                        :style="{ marginTop: '12px' }"
                    />
                    <UiColorPicker 
                        @update:modelValue="(value: string) => colors.phone.soft = value" 
                        :modelValue="colors.phone.soft" 
                        info="Color secundario"
                    />
                    <UiColorPicker 
                        label="Sección direccion" 
                        @update:modelValue="(value: string) => colors.address.normal = value" 
                        :modelValue="colors.address.normal" 
                        info="Color primario" 
                        :style="{ marginTop: '12px' }"
                    />
                    <UiColorPicker 
                        @update:modelValue="(value: string) => colors.address.soft = value" 
                        :modelValue="colors.address.soft" 
                        info="Color secundario"
                    />
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