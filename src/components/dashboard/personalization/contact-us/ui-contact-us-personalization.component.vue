<template>
    <div :class="baseClass">
        <UiHeaderPersonalization />
        <h1 :class="`${baseClass}__title`">Contact us Page</h1>
        <div :class="`${baseClass}__container`">
            <div :class="`${baseClass}__section ${baseClass}__section--one`">
                <div :class="`${baseClass}__form-section`">
                    <p :class="`${baseClass}__subtitle`">TITULO</p>
                    <UiTextbox 
                        @input="(value: string) => contactUsCustom.texts.title = value" 
                        :value="contactUsCustom?.texts.title" 
                        :class="`${baseClass}__textbox ${baseClass}__textbox--title`"
                    />
                </div>
                <div :class="`${baseClass}__form-section`">
                    <p :class="`${baseClass}__subtitle`">FORMULARIO</p>
                    <UiExpandSection title="Textos" :style="{ marginTop: '12px' }">
                        <template v-for="(field, index) in formFields" :key="index">
                            <UiTextbox 
                                @input="(value: string) => contactUsCustom.texts.form[index].label = value" 
                                :label="field.label" 
                                :value="contactUsCustom?.texts.form[index].label" 
                                :info="`Label del campo ${index + 1}`" 
                                :class="`${baseClass}__textbox`" 
                            />
                            <UiTextbox 
                                @input="(value: string) => contactUsCustom.texts.form[index].placeholder = value" 
                                :value="contactUsCustom?.texts.form[index].placeholder" 
                                :info="`Placeholder del campo ${index + 1}`" 
                                :class="`${baseClass}__textbox`" 
                            />
                        </template>
                        <UiTextbox 
                            @input="(value: string) => contactUsCustom.texts.form[4].action = value" 
                            label="Botón del formulario" 
                            :value="contactUsCustom?.texts.form[4].action" 
                            info="Label del botón del formulario" 
                            :class="`${baseClass}__textbox`"
                        />
                    </UiExpandSection>
                    <UiExpandSection title="Email de contacto" :style="{ marginTop: '12px' }">
                        <UiTextbox 
                            @input="(value: string) => contactUsCustom.data.form.email = value" 
                            :value="contactUsCustom?.data.form.email" 
                            info="Email al que llegara la duda del usuario" 
                            :class="`${baseClass}__textbox`" 
                        />
                    </UiExpandSection>
                </div>
                <div :class="`${baseClass}__form-section`">
                    <p :class="`${baseClass}__subtitle`">SECCIONES DE CONTACTO</p>
                    <UiExpandSection title="Datos de contacto" :style="{ marginTop: '12px' }">
                        <template v-for="(field, index) in contactFields" :key="index">
                            <UiTextbox 
                                @input="(value: string) => contactUsCustom.data.sections[index] = value" 
                                :value="contactUsCustom?.data.sections[index]" 
                                :info="field.info" 
                                :class="`${baseClass}__textbox`" 
                            />
                        </template>
                    </UiExpandSection>
                </div>
                <div :class="`${baseClass}__form-section`">
                    <UiExpandSection title="Textos" :style="{ marginTop: '12px' }">
                        <template v-for="(section, index) in sectionTexts" :key="index">
                            <UiTextbox 
                                @input="(value: string) => contactUsCustom.texts.sections[index] = value" 
                                :info="section.info" 
                                :value="contactUsCustom?.texts.sections[index]" 
                                :class="`${baseClass}__textbox`"
                            />
                        </template>
                    </UiExpandSection>
                </div>
                <div :class="`${baseClass}__form-section`">
                    <UiExpandSection title="Colores" :style="{ marginTop: '12px' }">
                        <template v-for="(section, key, index) in colorSections" :key="key">
                            <UiColorPicker 
                                :label="section.label" 
                                @update:modelValue="(value: string) => contactUsCustom.visuals.colors[index].primary = value" 
                                :modelValue="contactUsCustom?.visuals.colors[index]?.primary" 
                                :style="key !== 'email' ? { marginTop: '12px' } : {}"
                            />
                        </template>
                    </UiExpandSection>
                </div>
                <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--button`">
                    <UiButton @click="save" text="Guardar" />
                    <UiButton @click="cancel" text="Cancelar" transparent />
                </div>
            </div>
            <div :class="`${baseClass}__section ${baseClass}__section--two`">
                <p :class="`${baseClass}__subtitle`">PREVIEW</p>
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
import { customService } from '@/services';

const baseClass = 'ui-contact-us-personalization';
const contactUsCustom = ref();

const formFields = [
    { label: 'Identificador usuario' },
    { label: 'Email' },
    { label: 'Asunto' },
    { label: 'Mensaje' }
];

const contactFields = [
    { info: 'Email de la empresa' },
    { info: 'Telefono de la empresa' },
    { info: 'Dirección de la empresa' }
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

const save = async () => {
  try {
    await customService.updateCustom("contactUs", { texts: contactUsCustom.value.texts, data: contactUsCustom.value.data, visuals: contactUsCustom.value.visuals });
    window.location.reload();
  } catch (error) {
    console.error('Error saving custom data:', error);
  }
};

const cancel = async () => {
    contactUsCustom.value = await customService.getCustom("contactUs");
};

onMounted(async () => {
    contactUsCustom.value = await customService.getCustom("contactUs");
    console.log(contactUsCustom.value);
});
</script>

<style lang="scss" scoped>
.ui-contact-us-personalization {
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

        &--title {
            margin-top: 12px;
        }
    }

    &__subtitle {
        font-weight: bold;
    }

    &__form-section {
        margin-bottom: 2rem;
    }
}
</style>