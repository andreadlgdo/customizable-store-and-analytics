<template>
    <div 
        :class="baseClass" 
        :style="containerStyle"
    >
        <UiHeader 
            :name="texts.name"
            :style="{ width: '49%' }"
            transparent
            disabled
        />
        <section
            v-if="landingImage?.imageUrl"
            :class="`${baseClass}__image`"
            :style="{ backgroundImage: `url(${landingImage?.imageUrl})` }"
        />
        <section :class="`${baseClass}__content`">
            <ui-button 
                @click="router.push('/products')" 
                :text="texts?.mainAction" 
                :class="`${baseClass}__button`" 
                colorSoft
            />
        </section>
        <div :class="`${baseClass}__info`">
            <template v-for="(highlight, index) in texts.highlights" :key="index">
                <p :class="`${baseClass}__text`">{{ highlight }}</p>
                <p v-if="index < texts.highlights.length - 1" :class="`${baseClass}__text`">|</p>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { Colors, HomePageTexts } from '../../../../types/home-page.types';
import { generalService } from '../../../../services';

import UiButton from '../../../shared/ui-button.component.vue';
import UiHeader from '../../../shared/ui-header.component.vue';

const baseClass = 'ui-home-page-preview';
const router = useRouter();

const landingImage = ref();

const props = defineProps<{
    texts: HomePageTexts;
    colors: Colors;
}>();

const containerStyle = computed(() => ({
    '--color-vibrant-primary': props.colors.secondary,
    '--color-soft-primary': props.colors.primary
}));

onMounted(async () => {
    const images = await generalService.getLandingImages();
    landingImage.value = images[0];
});
</script>

<style lang="scss" scoped>
.ui-home-page-preview {
    height: 100%;
    display: flex;
    flex-direction: column;
    
    &__image {
        flex: 1;
        width: 100%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }

    &__content {
        position: absolute;
        bottom: 120px;
        right: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        width: 100%;
    }

    &__button {
        margin: {
            bottom: 42px;
            right: 48px;
        }
        height: 3rem;
        width: 12rem;
        pointer-events: none;
    }

    &__info {
        display: flex;
        justify-content: space-evenly;
        background-color: var(--color-soft-primary);
        height: 4rem;
        padding: 14px 18px;
        width: 100%;
        box-sizing: border-box;
    }

    &__text {
        align-self: center;
        color: var(--color-vibrant-primary);
    }
}
</style>