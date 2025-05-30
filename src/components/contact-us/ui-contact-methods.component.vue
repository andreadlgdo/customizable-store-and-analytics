<template>
    <div :class="baseClass">
        <h2 :class="`${baseClass}__title`">{{ t('contactUs.legend.title') }}</h2>
        <div :class="`${baseClass}__cards`">
            <a 
                v-for="(method, index) in contactMethods" 
                :key="index"
                :class="`${baseClass}__card ${baseClass}__card--${method.type}`"
                :href="method.link"
                :target="method.target"
            >
                <div :class="`${baseClass}__icon ${baseClass}__icon--${method.type}`">
                    <UiIcon size="small" :src="method.icon" />
                </div>
                <div :class="`${baseClass}__info`">
                    <h3>{{ contactUsTexts?.sections[index] }}</h3>
                    <p>{{ method.text }}</p>
                </div>
            </a>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import UiIcon from '../shared/ui-icon.component.vue';
import { customTextsService } from '../../services';

interface ContactMethod {
    type: string;
    link: string;
    text: string;
    icon: any;
    target?: string;
}

const baseClass = 'ui-contact-methods';

const { t } = useI18n();

const contactUsTexts =  ref();

const contactMethods: ContactMethod[] = [
    {
        type: 'email',
        link: 'mailto:support@fashionstore.com',
        text: 'support@fashionstore.com',
        icon: require('../../assets/media/icons/email.svg')
    },
    {
        type: 'phone',
        link: 'tel:+15551234567',
        text: '+1 (555) 123-4567',
        icon: require('../../assets/media/icons/phone.svg')
    },
    {
        type: 'address',
        link: 'https://maps.google.com/?q=123+Fashion+Street,+Design+District,+New+York,+NY+10001',
        text: '123 Fashion St, NY 10001',
        icon: require('../../assets/media/icons/ubication.svg'),
        target: '_blank'
    }
];

onMounted(async () => {
    contactUsTexts.value = await customTextsService.getCustomTexts("contactUs");
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
            background: linear-gradient(to right, #4285f4, #0f9d58, #db4437);
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
        border-left: 0;
        border-right: 0;
        border-bottom: 0;
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
            border-top-color: #4285f4;
            background: linear-gradient(to bottom, rgba(66, 133, 244, 0.08), rgba(66, 133, 244, 0.02));
            
            &:hover {
                background: linear-gradient(to bottom, rgba(66, 133, 244, 0.12), rgba(66, 133, 244, 0.04));
            }
            
            h3 {
                color: #4285f4;
            }
        }

        &--phone {
            border-top-color: #0f9d58;
            background: linear-gradient(to bottom, rgba(15, 157, 88, 0.08), rgba(15, 157, 88, 0.02));
            
            &:hover {
                background: linear-gradient(to bottom, rgba(15, 157, 88, 0.12), rgba(15, 157, 88, 0.04));
            }
            
            h3 {
                color: #0f9d58;
            }
        }

        &--address {
            border-top-color: #db4437;
            background: linear-gradient(to bottom, rgba(219, 68, 55, 0.08), rgba(219, 68, 55, 0.02));
            
            &:hover {
                background: linear-gradient(to bottom, rgba(219, 68, 55, 0.12), rgba(219, 68, 55, 0.04));
            }
            
            h3 {
                color: #db4437;
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
            color: #4285f4;
            background: linear-gradient(135deg, rgba(66, 133, 244, 0.15), rgba(66, 133, 244, 0.05));
            border: 1px solid rgba(66, 133, 244, 0.2);
        }

        &--phone {
            color: #0f9d58;
            background: linear-gradient(135deg, rgba(15, 157, 88, 0.15), rgba(15, 157, 88, 0.05));
            border: 1px solid rgba(15, 157, 88, 0.2);
        }

        &--address {
            color: #db4437;
            background: linear-gradient(135deg, rgba(219, 68, 55, 0.15), rgba(219, 68, 55, 0.05));
            border: 1px solid rgba(219, 68, 55, 0.2);
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
                color: #db4437;
            }
        }
    }

    &__card:hover &__icon {
        transform: scale(1.05);
    }
}
</style>