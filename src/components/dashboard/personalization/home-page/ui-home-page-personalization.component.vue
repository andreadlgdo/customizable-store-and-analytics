<template>
    <div :class="baseClass">
        <UiHeaderPersonalization />
        <h1 :class="`${baseClass}__title`">Home Page</h1>
        <div :class="`${baseClass}__container`">
            <div :class="`${baseClass}__section ${baseClass}__section--one`">
                <p :class="`${baseClass}__subtitle`">NOMBRE DE LA TIENDA</p>
                <UiTextbox 
                    @input="(value:string) => homePageCustom.texts.name = value"
                    :value="homePageCustom?.texts.name" 
                    :class="`${baseClass}__textbox`"
                />
                <p :class="`${baseClass}__subtitle`">GENERAL</p>
                <UiExpandSection title="Textos" :style="{ marginTop: '12px' }">
                <UiTextbox 
                    @input="(value:string) => homePageCustom.texts.mainAction = value"
                    label="Botón principal"
                    :value="homePageCustom?.texts.mainAction" 
                    :class="`${baseClass}__textbox`"
                />
                </UiExpandSection>
                <UiExpandSection title="Colores" :style="{ marginTop: '12px' }">
                    <UiColorPicker
                        label="Color principal"
                        @update:modelValue="(value:string) => homePageCustom.visuals.colors.primary = value"
                        :modelValue="homePageCustom?.visuals?.colors?.primary"
                        :style="{ marginTop: '12px' }"
                    />
                    <UiColorPicker
                        label="Color secundario"
                        @update:modelValue="(value:string) => homePageCustom.visuals.colors.secondary = value"
                        :modelValue="homePageCustom?.visuals?.colors?.secondary"
                        :style="{ marginTop: '12px' }"
                    />
                </UiExpandSection>
                <p :class="`${baseClass}__subtitle`">HIGHLIGHTS</p>
                <UiExpandSection title="Textos" :style="{ marginTop: '12px' }">
                    <UiTextbox 
                        @input="(value:string) => homePageCustom.texts.highlights[0] = value"
                        :value="homePageCustom?.texts.highlights[0]" 
                        :class="`${baseClass}__textbox`"
                    />
                    <UiTextbox 
                        @input="(value:string) => homePageCustom.texts.highlights[1] = value"
                        :value="homePageCustom?.texts.highlights[1]" 
                        :class="`${baseClass}__textbox`"
                    />
                    <UiTextbox 
                        @input="(value:string) => homePageCustom.texts.highlights[2] = value"
                        :value="homePageCustom?.texts.highlights[2]" 
                        :class="`${baseClass}__textbox`"
                    />
                </UiExpandSection>
                <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--button`">
                    <UiButton @click="save" text="Guardar" />
                    <UiButton @click="cancel" text="Cancelar" transparent />
                </div>
            </div>
            <div :class="`${baseClass}__section ${baseClass}__section--two`">
                <p :class="`${baseClass}__subtitle`">PREVIEW</p>
                <UiHomePagePreview :texts="homePageCustom?.texts" :colors="homePageCustom?.visuals.colors" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import UiColorPicker from '../../../shared/ui-color-picker.component.vue';
import UiButton from '../../../shared/ui-button.component.vue';
import UiTextbox from '../../../shared/ui-textbox.component.vue';
import UiHeaderPersonalization from '../ui-header-personalization.component.vue';
import UiHomePagePreview from './ui-home-page-preview.component.vue';
import UiExpandSection from '../../../shared/ui-expand-section.component.vue';
import { ref, onMounted } from 'vue';
import { CustomResponse, customService } from '@/services';

interface HomePageTexts {
    name: string;
    mainAction: string;
    highlights: string[];
}

interface Visuals {
    colors: {
        primary: string;
        secondary: string;
    };
}

interface HomePageCustom extends Omit<CustomResponse, 'texts' | 'visuals'> {
    texts: HomePageTexts;
    visuals: Visuals;
}

const baseClass = 'ui-home-page-personalization';

const homePageCustom = ref<HomePageCustom>({
    _id: '',
    page: '',
    texts: {
        name: '',
        mainAction: '',
        highlights: ['', '', '']
    },
    visuals: {
        colors: {
            primary: '',
            secondary: ''
        }
    }
});

const save = async () => {
  try {
    await customService.updateCustom("home", { texts: homePageCustom.value.texts, visuals: homePageCustom.value.visuals });
    window.location.reload();
  } catch (error) {
    console.error('Error saving custom data:', error);
  }
};

const cancel = async () => {
    const response = await customService.getCustom('home');
    homePageCustom.value = response as HomePageCustom;
}

onMounted(async() => {
    const response = await customService.getCustom('home');
    homePageCustom.value = response as HomePageCustom;
});
</script>

<style lang="scss" scoped>
.ui-home-page-personalization {
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
    }

    &__subtitle {
        font-weight: bold;
        margin-bottom: 8px;
    }
}
</style>