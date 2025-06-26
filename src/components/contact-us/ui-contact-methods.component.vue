<template>
    <div :class="baseClass">
        <h2 :class="`${baseClass}__title`">
            {{ t('contactUs.legend.title') }}
        </h2>
        <div :class="`${baseClass}__cards`">
            <a 
                v-for="(method, index) in contactMethods" 
                :key="index"
                :class="[
                    `${baseClass}__card`,
                    `${baseClass}__card--${method.type}`
                ]"
                :href="method.link"
                :target="method.target"
                :style="{
                    '--primary-color': contactUsCustom?.visuals.colors[index]?.primary,
                    '--secondary-color': contactUsCustom?.visuals.colors[index]?.primary,
                    '--primary-color-rgb': hexToRgb(contactUsCustom?.visuals.colors[index]?.primary || '#000000')
                }"
            >
                <div :class="[
                    `${baseClass}__icon`,
                    `${baseClass}__icon--${method.type}`
                ]">
                    <UiIcon size="small" :src="method.icon" />
                </div>
                
                <div :class="`${baseClass}__info`">
                    <h3>{{ contactUsCustom?.texts.sections[index] }}</h3>
                    <p>{{ method.text }}</p>
                </div>
            </a>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, ComputedRef, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { ContactUsCustom, ContactMethod } from '@/types/custom-us.type';
import { customService } from '@/services';

import UiIcon from '@/components/shared/ui-icon.component.vue';

const baseClass = 'ui-contact-methods';

const { t } = useI18n();

const props = defineProps<{
    custom: ContactUsCustom;
    editMode: boolean;
}>();

const contactUsCustom = ref();

const hexToRgb = (hex: string): string => {
    hex = hex.replace('#', '');
    
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `${r}, ${g}, ${b}`;
};

const contactMethods: ComputedRef<ContactMethod[]> = computed(() => [
    {
        type: 'email',
        link: `mailto:${contactUsCustom.value?.data.sections[0]}`,
        text: contactUsCustom.value?.data.sections[0],
        icon: require('../../assets/media/icons/email.svg')
    },
    {
        type: 'phone',
        link: `tel:${contactUsCustom.value?.data.sections[1]}`,
        text: contactUsCustom.value?.data.sections[1],
        icon: require('../../assets/media/icons/phone.svg')
    },
    {
        type: 'address',
        link: 'https://maps.google.com/?q=123+Fashion+Street,+Design+District,+New+York,+NY+10001',
        text: contactUsCustom.value?.data.sections[2],
        icon: require('../../assets/media/icons/ubication.svg'),
        target: '_blank'
    }
]);

watch(() => props.custom, (newCustom) => {
  if (props.editMode && newCustom) {
    contactUsCustom.value = newCustom;
  }
}, { immediate: true });

onMounted(async () => {
    if (!props.editMode || !props.custom) {
        const customTexts = await customService.getCustom("contactUs");
        contactUsCustom.value = customTexts;
    }
});
</script>

<style lang="scss" scoped>
.ui-contact-methods {
    max-width: 700px;
    margin: 1.5rem auto;
    padding: 0;
    text-align: center;

    &__title {
        margin-bottom: 1rem;
        font-size: 1.3rem;
        position: relative;
        display: inline-block;
        
        &:after {
            content: '';
            position: absolute;
            bottom: -6px;
            left: 50%;
            transform: translateX(-50%);
            width: 40px;
            height: 2px;
            background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
            border-radius: 2px;
        }
    }

    &__cards {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
    }

    &__card {
        flex: 1;
        min-width: 180px;
        max-width: 220px;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
        border: 0;
        border-top: 3px solid transparent;
        text-decoration: none;
        color: inherit;
        transition: transform 0.3s, box-shadow 0.3s, background-color 0.3s;
        
        @media (max-width: 600px) {
            min-width: 100%;
        }
        
        &:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
        }

        &--email {
            border-top-color: var(--primary-color);
            background: linear-gradient(to bottom, 
                rgba(var(--primary-color-rgb), 0.08), 
                rgba(var(--primary-color-rgb), 0.02)
            );
            
            &:hover {
                background: linear-gradient(to bottom, 
                    rgba(var(--primary-color-rgb), 0.12), 
                    rgba(var(--primary-color-rgb), 0.04)
                );
            }
            
            h3 {
                color: var(--primary-color);
            }
        }

        &--phone {
            border-top-color: var(--primary-color);
            background: linear-gradient(to bottom, 
                rgba(var(--primary-color-rgb), 0.08), 
                rgba(var(--primary-color-rgb), 0.02)
            );
            
            &:hover {
                background: linear-gradient(to bottom, 
                    rgba(var(--primary-color-rgb), 0.12), 
                    rgba(var(--primary-color-rgb), 0.04)
                );
            }
            
            h3 {
                color: var(--primary-color);
            }
        }

        &--address {
            border-top-color: var(--primary-color);
            background: linear-gradient(to bottom, 
                rgba(var(--primary-color-rgb), 0.08), 
                rgba(var(--primary-color-rgb), 0.02)
            );
            
            &:hover {
                background: linear-gradient(to bottom, 
                    rgba(var(--primary-color-rgb), 0.12), 
                    rgba(var(--primary-color-rgb), 0.04)
                );
            }
            
            h3 {
                color: var(--primary-color);
            }
        }
    }

    &__icon {
        font-size: 1.5rem;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 0.5rem;
        transition: transform 0.2s;

        &--email {
            color: var(--primary-color);
            background: linear-gradient(135deg, 
                rgba(var(--primary-color-rgb), 0.15), 
                rgba(var(--primary-color-rgb), 0.05)
            );
            border: 1px solid rgba(var(--primary-color-rgb), 0.2);
        }

        &--phone {
            color: var(--primary-color);
            background: linear-gradient(135deg, 
                rgba(var(--primary-color-rgb), 0.15), 
                rgba(var(--primary-color-rgb), 0.05)
            );
            border: 1px solid rgba(var(--primary-color-rgb), 0.2);
        }

        &--address {
            color: var(--primary-color);
            background: linear-gradient(135deg, 
                rgba(var(--primary-color-rgb), 0.15), 
                rgba(var(--primary-color-rgb), 0.05)
            );
            border: 1px solid rgba(var(--primary-color-rgb), 0.2);
        }
    }

    &__info {
        text-align: center;
        margin-bottom: 0.5rem;
    
        h3 {
            margin-bottom: 0.15rem;
            font-size: 0.95rem;
        }
    
        p {
            margin: 0.1rem 0;
            font-size: 0.85rem;
            color: #555;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
        
            i {
                color: var(--primary-color);
            }
        }
    }

    &__card:hover &__icon {
        transform: scale(1.05);
    }
}
</style>