<template>
    <UiBasePersonalization @save="save" @cancel="cancel" title="Home Page">
        <template #customization>
            <section :class="`${baseClass}__form-section`">
                <p :class="`${baseClass}__subtitle`">NOMBRE DE LA TIENDA</p>
                <UiTextbox 
                    :value="homePageCustom.texts.name"
                    @input="(value: string) => homePageCustom.texts.name = value"
                    :class="`${baseClass}__textbox`"
                />
            </section>
            <section :class="`${baseClass}__form-section`">
                <p :class="`${baseClass}__subtitle`">GENERAL</p>
                <UiExpandSection title="Textos" :style="{ marginTop: '12px' }">
                    <UiTextbox 
                        :value="homePageCustom.texts.mainAction"
                        @input="(value: string) => homePageCustom.texts.mainAction = value"
                        label="Botón principal"
                        :class="`${baseClass}__textbox`"
                    />
                </UiExpandSection>
                <UiExpandSection title="Colores" :style="{ marginTop: '12px' }">
                    <UiColorPicker
                        v-model="homePageCustom.visuals.colors.primary"
                        label="Color principal"
                        :style="{ marginTop: '12px' }"
                    />
                    <UiColorPicker
                        v-model="homePageCustom.visuals.colors.secondary"
                        label="Color secundario"
                        :style="{ marginTop: '12px' }"
                    />
                </UiExpandSection>
            </section>
            <section :class="`${baseClass}__form-section`">
                <p :class="`${baseClass}__subtitle`">HIGHLIGHTS</p>
                <UiExpandSection title="Textos" :style="{ marginTop: '12px' }">
                    <UiTextbox 
                        v-for="(_, index) in homePageCustom.texts.highlights"
                        :key="index"
                        :value="homePageCustom.texts.highlights[index]"
                        @input="(value: string) => homePageCustom.texts.highlights[index] = value"
                        :class="`${baseClass}__textbox`"
                    />
                </UiExpandSection>
            </section>
        </template>
        <template #preview>
            <UiHomePagePreview 
                :texts="homePageCustom.texts" 
                :colors="homePageCustom.visuals.colors" 
            />
        </template>
    </UiBasePersonalization>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { customService } from '@/services';
import { HomePageCustom } from '@/types/home-page.types';

import UiColorPicker from '@/components/shared/ui-color-picker.component.vue';
import UiExpandSection from '@/components/shared/ui-expand-section.component.vue';
import UiTextbox from '@/components/shared/ui-textbox.component.vue';

import UiBasePersonalization from '@/components/dashboard/personalization/ui-base-personalization.component.vue';

import UiHomePagePreview from '@/components/dashboard/personalization/home-page/ui-home-page-preview.component.vue';

const baseClass = 'ui-home-page-personalization';

const router = useRouter();

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
        await customService.updateCustom('home', {
            texts: homePageCustom.value.texts,
            visuals: homePageCustom.value.visuals
        });
        window.location.reload();
    } catch (error) {
        console.error('Error saving custom data:', error);
    }
};

const cancel = async () => {
    const response = await customService.getCustom('home');
    homePageCustom.value = response as HomePageCustom;
    router.push({ name: 'Personalization' })
}

onMounted(async() => {
    const response = await customService.getCustom('home');
    homePageCustom.value = response as HomePageCustom;
});
</script>

<style lang="scss" scoped>
.ui-home-page-personalization {
    &__form-section {
        margin-bottom: 2rem;
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