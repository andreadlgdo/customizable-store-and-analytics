<template>
    <UiBasePersonalization 
        @save="save" 
        @cancel="cancel" 
        title="Carrito de la compra"
    >
        <template #customization>
            <UiTextbox 
                :class="`${baseClass}__textbox`"
                :value="cartAsideCustom?.texts.title"
                label="Título"
                @input="(value: string) => cartAsideCustom.texts.title = value"
            />
            <section :class="`${baseClass}__form-section`">
                <p :class="`${baseClass}__subtitle`">CARRITO VACIO</p>
                <UiExpandSection 
                    title="Textos" 
                    :style="{ marginTop: '12px' }"
                >
                    <UiTextbox 
                        :class="`${baseClass}__textbox`"
                        :value="cartAsideCustom?.texts.empty.description"
                        info="Texto que se muestra cuando el carrito está vacío."
                        @input="(value: string) => cartAsideCustom.texts.empty.description = value"
                    />
                    <UiTextbox 
                        :class="`${baseClass}__textbox`"
                        :value="cartAsideCustom?.texts.empty.action"
                        info="Botón que te redirige a la página de productos."
                        @input="(value: string) => cartAsideCustom.texts.empty.action = value"
                    />
                </UiExpandSection>
                <UiExpandSection 
                    title="Colores" 
                    :style="{ marginTop: '12px' }"
                >
                    <UiColorPicker 
                        v-model="cartAsideCustom.visuals.colors.empty.button"
                        :class="`${baseClass}__textbox`"
                        info="Color del botón"
                    />
                </UiExpandSection>
            </section>
            <section :class="`${baseClass}__form-section`">
                <p :class="`${baseClass}__subtitle`">CARRITO CON PRODUCTOS</p>         
                <UiExpandSection 
                    title="Textos" 
                    :style="{ marginTop: '12px' }"
                >
                    <UiTextbox 
                        :class="`${baseClass}__textbox`"
                        :value="cartAsideCustom?.texts.order.totalPrice"
                        info="Etiqueta que muestra el precio total."
                        @input="(value: string) => cartAsideCustom.texts.order.totalPrice = value"
                    />
                    <UiTextbox 
                        :class="`${baseClass}__textbox`"
                        :value="cartAsideCustom?.texts.order.action"
                        info="Botón que te redirige a la tramitación del pedido."
                        @input="(value: string) => cartAsideCustom.texts.order.action = value"
                    />
                </UiExpandSection>
                <UiExpandSection 
                    title="Colores" 
                    :style="{ marginTop: '12px' }"
                >
                    <UiColorPicker 
                        v-model="cartAsideCustom.visuals.colors.order.button"
                        :class="`${baseClass}__textbox`"
                        info="Color del botón"
                    />
                    <UiColorPicker 
                        v-model="cartAsideCustom.visuals.colors.order.icon.favourite"
                        label="Iconos"
                        :class="`${baseClass}__textbox`"
                        info="Color del fondo del icono de favoritos"
                    />
                    <UiColorPicker 
                        v-model="cartAsideCustom.visuals.colors.order.icon.delete"
                        :class="`${baseClass}__textbox`"
                        info="Color del fondo del icono de borrar producto"
                    />
                </UiExpandSection>
            </section>
        </template>
        <template #preview>
            <UiCartPreview :custom="cartAsideCustom" />
        </template>
    </UiBasePersonalization>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { CartAsideCustom } from '../../../../types/cart.type';
import { customService } from '../../../../services';

import UiExpandSection from '../../../shared/ui-expand-section.component.vue';
import UiTextbox from '../../../shared/ui-textbox.component.vue';
import UiColorPicker from '../../../shared/ui-color-picker.component.vue';

import UiBasePersonalization from '../ui-base-personalization.component.vue';

import UiCartPreview from './ui-cart-preview.component.vue';

const baseClass = 'ui-cart-aside-personalization';

const cartAsideCustom = ref<CartAsideCustom>({
    texts: {
        title: '',
        empty: {
            description: '',
            action: ''
        },
        order: {
            totalPrice: '',
            action: ''
        }
    },
    visuals: {
        colors: {
            empty: {
                button: '#000000'
            },
            order: {
                button: '#000000',
                icon: {
                    favourite: '#000000',
                    delete: '#000000'
                }
            }
        }
    }
});

const save = async () => {
    cartAsideCustom.value = await customService.updateCustom('cart-aside', {
        texts: cartAsideCustom.value.texts,
        visuals: cartAsideCustom.value.visuals
    }) as CartAsideCustom;
    window.location.reload();
};

const cancel = async () => {
    cartAsideCustom.value = await customService.getCustom('cart-aside') as CartAsideCustom;
};

onMounted(async () => {
    cartAsideCustom.value = await customService.getCustom('cart-aside') as CartAsideCustom;
});
</script>

<style lang="scss" scoped>
.ui-cart-aside-personalization {
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

