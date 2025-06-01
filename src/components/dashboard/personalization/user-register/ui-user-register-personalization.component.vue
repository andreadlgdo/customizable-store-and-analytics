<template>
    <UiBasePersonalization @save="save" @cancel="cancel" title="User Register">
        <template #customization>
            <section :class="`${baseClass}__form-section`">
                <p :class="`${baseClass}__subtitle`">SELECTOR</p>
                <UiExpandSection title="Textos" :style="{ marginTop: '12px' }">
                    <UiTextbox
                        @input="(value: string) => userRegisterCustom.texts.toggle.logIn = value"
                        info="Label de la sección de inicio de sesión del usuario"
                        :value="userRegisterCustom.texts.toggle.logIn"
                        :class="`${baseClass}__textbox`"
                    />
                    <UiTextbox
                        @input="(value: string) => userRegisterCustom.texts.toggle.signUp = value"
                        info="Label de la sección de registro del usuario"
                        :value="userRegisterCustom.texts.toggle.signUp"
                        :class="`${baseClass}__textbox`"
                    />
                </UiExpandSection>
                <UiExpandSection title="Colores" :style="{ marginTop: '12px' }">
                    <UiColorPicker
                        @update:modelValue="(value: string) => userRegisterCustom.visuals.colors.toggle.background = value" 
                        label="Color de fondo"
                        :modelValue="userRegisterCustom?.visuals.colors.toggle.background"
                        :class="`${baseClass}__textbox`"
                    />
                    <UiColorPicker
                        @update:modelValue="(value: string) => userRegisterCustom.visuals.colors.toggle.selected = value" 
                        label="Color de selección"
                        :modelValue="userRegisterCustom?.visuals.colors.toggle.selected"
                        :class="`${baseClass}__textbox`"
                    />
                </UiExpandSection>
            </section>
            <section :class="`${baseClass}__form-section`">
                <p :class="`${baseClass}__subtitle`">FORMULARIOS</p>
                <UiExpandSection title="Colores" :style="{ marginTop: '12px' }">
                    <UiColorPicker
                        @update:modelValue="(value: string) => userRegisterCustom.visuals.colors.button = value" 
                        label="Color de fondo de los botones"
                        :modelValue="userRegisterCustom?.visuals.colors.button"
                        :class="`${baseClass}__textbox`"
                    />
                </UiExpandSection>
            </section>
            <section :class="`${baseClass}__form-section`">
                <p :class="`${baseClass}__subtitle`">FORMULARIO DE INICIO DE SESION</p>
                <UiExpandSection title="Textos" :style="{ marginTop: '12px' }">
                    <UiTextbox
                        @input="(value: string) => userRegisterCustom.texts.logIn.email.label = value"
                        label="Correo electrónico"
                        :value="userRegisterCustom.texts.logIn.email.label"
                        info="Label para el campo de correo electrónico"
                        :class="`${baseClass}__textbox`"
                    />
                    <UiTextbox
                        @input="(value: string) => userRegisterCustom.texts.logIn.email.placeholder = value"
                        :value="userRegisterCustom.texts.logIn.email.placeholder"
                        info="Placeholder para el campo de correo electrónico"
                        :class="`${baseClass}__textbox`"
                    />
                    <UiTextbox
                        @input="(value: string) => userRegisterCustom.texts.logIn.password.label = value"
                        label="Contraseña"
                        :value="userRegisterCustom.texts.logIn.password.label"
                        info="Label para el campo de la contraseña"
                        :class="`${baseClass}__textbox`"
                    />
                    <UiTextbox
                        @input="(value: string) => userRegisterCustom.texts.logIn.password.placeholder = value"
                        :value="userRegisterCustom.texts.logIn.password.placeholder"
                        info="Placeholder para el campo de la contraseña"
                        :class="`${baseClass}__textbox`"
                    />
                    <UiTextbox
                        @input="(value: string) => userRegisterCustom.texts.logIn.action = value"
                        label="Botón"
                        :value="userRegisterCustom.texts.logIn.action"
                        info="Botón para iniciar sesión"
                        :class="`${baseClass}__textbox`"
                    />
                </UiExpandSection>
            </section>
            <section :class="`${baseClass}__form-section`">
                <p :class="`${baseClass}__subtitle`">FORMULARIO DE REGISTRO</p>
                <UiExpandSection title="Textos" :style="{ marginTop: '12px' }">
                    <UiTextbox
                        @input="(value: string) => userRegisterCustom.texts.signUp.name.label = value"
                        label="Nombre"
                        :value="userRegisterCustom.texts.signUp.name.label"
                        info="Label para el campo del nombre"
                        :class="`${baseClass}__textbox`"
                    />
                    <UiTextbox
                        @input="(value: string) => userRegisterCustom.texts.signUp.name.placeholder = value"
                        :value="userRegisterCustom.texts.signUp.name.placeholder"
                        info="Placeholder para el campo del nombre"
                        :class="`${baseClass}__textbox`"
                    />
                    <UiTextbox
                        @input="(value: string) => userRegisterCustom.texts.signUp.surname.label = value"
                        label="Apellido"
                        :value="userRegisterCustom.texts.signUp.surname.label"
                        info="Label para el campo del apellido"
                        :class="`${baseClass}__textbox`"
                    />
                    <UiTextbox
                        @input="(value: string) => userRegisterCustom.texts.signUp.surname.placeholder = value"
                        :value="userRegisterCustom.texts.signUp.surname.placeholder"
                        info="Placeholder para el campo del apellido"
                        :class="`${baseClass}__textbox`"
                    />
                    <UiTextbox
                        @input="(value: string) => userRegisterCustom.texts.signUp.email.label = value"
                        label="Correo electrónico"
                        :value="userRegisterCustom.texts.signUp.email.label"
                        info="Label para el campo de correo electrónico"
                        :class="`${baseClass}__textbox`"
                    />
                    <UiTextbox
                        @input="(value: string) => userRegisterCustom.texts.signUp.email.placeholder = value"
                        :value="userRegisterCustom.texts.signUp.email.placeholder"
                        info="Placeholder para el campo de correo electrónico"
                        :class="`${baseClass}__textbox`"
                    />
                    <UiTextbox
                        @input="(value: string) => userRegisterCustom.texts.signUp.password.label = value"
                        label="Contraseña"
                        :value="userRegisterCustom.texts.signUp.password.label"
                        info="Label para el campo de la contraseña"
                        :class="`${baseClass}__textbox`"
                    />
                    <UiTextbox
                        @input="(value: string) => userRegisterCustom.texts.signUp.password.placeholder = value"
                        :value="userRegisterCustom.texts.signUp.password.placeholder"
                        info="Placeholder para el campo de la contraseña"
                        :class="`${baseClass}__textbox`"
                    />
                    <UiTextbox
                        @input="(value: string) => userRegisterCustom.texts.signUp.repeatPassword.label = value"
                        label="Repetir contraseña"
                        :value="userRegisterCustom.texts.signUp.repeatPassword.label"
                        info="Label para el campo de la repetición de la contraseña"
                        :class="`${baseClass}__textbox`"
                    />
                    <UiTextbox
                        @input="(value: string) => userRegisterCustom.texts.signUp.repeatPassword.placeholder = value"
                        :value="userRegisterCustom.texts.signUp.repeatPassword.placeholder"
                        info="Placeholder para el campo de la repetición de la contraseña"
                        :class="`${baseClass}__textbox`"
                    />
                    <UiTextbox
                        @input="(value: string) => userRegisterCustom.texts.signUp.acceptTerms = value"
                        label="Checkbox"
                        :value="userRegisterCustom.texts.signUp.acceptTerms"
                        info="Texto para el checkbox"
                        :class="`${baseClass}__textbox`"
                    />
                    <UiTextbox
                        @input="(value: string) => userRegisterCustom.texts.signUp.action = value"
                        label="Botón"
                        :value="userRegisterCustom.texts.signUp.action"
                        info="Botón para realizar el registro"
                        :class="`${baseClass}__textbox`"
                    />
                </UiExpandSection>
            </section>
        </template>
        <template #preview>
            <UiUserRegisterPreview :custom="userRegisterCustom" />
        </template>
    </UiBasePersonalization>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

import { UserRegisterCustom } from '../../../../types/user-register.type';
import { customService } from '../../../../services';

import UiBasePersonalization from '../ui-base-personalization.component.vue';
import UiColorPicker from '../../../shared/ui-color-picker.component.vue';
import UiExpandSection from '../../../shared/ui-expand-section.component.vue';
import UiTextbox from '../../../shared/ui-textbox.component.vue';
import UiUserRegisterPreview from './ui-user-register-preview.component.vue';

const baseClass = 'ui-user-register-personalization';

const userRegisterCustom = ref<UserRegisterCustom>({
    texts: {
        toggle: {
            logIn: '',
            signUp: ''
        },
        logIn: {
            email: {
                label: '',
                placeholder: ''
            },
            password: {
                label: '',
                placeholder: ''
            },
            action: ''
        },
        signUp: {
            name: {
                label: '',
                placeholder: ''
            },
            surname: {
                label: '',
                placeholder: ''
            },
            email: {
                label: '',
                placeholder: ''
            },
            password: {
                label: '',
                placeholder: ''
            },
            repeatPassword: {
                label: '',
                placeholder: ''
            },
            acceptTerms: '',
            action: ''
        }
    },
    visuals: {
        colors: {
            toggle: {
                background: '',
                selected: ''
            },
            button: ''
        }
    }
});

const cancel = async () => {
    userRegisterCustom.value = await customService.getCustom('register') as UserRegisterCustom;
}

const save = async () => {
    await customService.updateCustom('register', { texts: userRegisterCustom.value.texts, visuals: userRegisterCustom.value.visuals });
}

onMounted(async () => {
    userRegisterCustom.value = await customService.getCustom('register') as UserRegisterCustom;
});
</script>

<style lang="scss" scoped>
.ui-user-register-personalization {
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