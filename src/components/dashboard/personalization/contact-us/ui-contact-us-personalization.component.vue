<template>
    <UiBasePersonalization @save="save" @cancel="cancel" title="Contact us Page">
        <template #customization>
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
                <UiExpandSection title="Textos" :style="{ marginTop: '12px' }">
                    <UiTextbox 
                        @input="(value: string) => contactUsCustom.texts.subtitle = value" 
                        :value="contactUsCustom?.texts.subtitle" 
                        :info="sectionTexts[0].info" 
                        label="Titulo de la sección"
                        :class="`${baseClass}__textbox`" 
                    />
                    <template v-for="(section, index) in sectionTexts" :key="index">
                        <UiTextbox 
                            @input="(value: string) => contactUsCustom.texts.sections[index] = value" 
                            :info="section.info" 
                            :value="contactUsCustom?.texts.sections[index]" 
                            :label="index === 0 ? 'Secciones' : ''"
                            :class="`${baseClass}__textbox`"
                        />
                    </template>
                </UiExpandSection>
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
        </template>
        <template #preview>
            <UiContactUsPreview 
                :title="contactUsCustom?.texts.title" 
                :custom="contactUsCustom" 
            />
        </template>
    </UiBasePersonalization>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import { customService } from '@/services';

import UiColorPicker from '@/components/shared/ui-color-picker.component.vue';
import UiExpandSection from '@/components/shared/ui-expand-section.component.vue';
import UiTextbox from '@/components/shared/ui-textbox.component.vue';

import UiBasePersonalization from '@/components/dashboard/personalization/ui-base-personalization.component.vue';

import UiContactUsPreview from '@/components/dashboard/personalization/contact-us/ui-contact-us-preview.component.vue';

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
});
</script>

<style lang="scss" scoped>
.ui-contact-us-personalization {
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