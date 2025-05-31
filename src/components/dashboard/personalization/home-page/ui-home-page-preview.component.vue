<template>
    <div :class="baseClass" :style="{ '--color-vibrant-primary': colors.secondary, '--color-soft-primary': colors.primary }">
        <UiHeader :name="texts.name" disabled/>
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
            <p :class="`${baseClass}__text`">{{ texts.highlights[0] }}</p>
            <p :class="`${baseClass}__text`">|</p>
            <p :class="`${baseClass}__text`">{{ texts.highlights[1] }}</p>
            <p :class="`${baseClass}__text`">|</p>
            <p :class="`${baseClass}__text`">{{  texts.highlights[2] }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import UiButton from '../../../shared/ui-button.component.vue';
import { generalService } from '@/services';
import UiHeader from '../../../shared/ui-header.component.vue'
import { onMounted, ref, PropType } from 'vue';
import { useRouter } from 'vue-router';

const baseClass = 'ui-home-page-preview';

const router = useRouter();

defineProps({
    texts: {
        type: Object,
        required: true
    },
    colors: {
      type: Object as PropType<{ primary: string, secondary: string }>,
      required: true
    }
});

const landingImage = ref();

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
      margin-bottom: 42px;
      margin-right: 48px;
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

    &__tab {
      color: var(--color-vibrant-primary);
    }
}
</style>