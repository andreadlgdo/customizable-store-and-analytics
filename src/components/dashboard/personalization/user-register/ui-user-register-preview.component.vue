<template>
    <div :class="baseClass">
        <div :class="`${baseClass}__left-section`">
            <p>Aside de inicio de sesión</p>
            <div :class="`${baseClass}__wrapper`">
                <UiToggle :options="toggleOptions" :class="`${baseClass}__toggle`" :background="custom.visuals.colors.toggle.background" :selected-color="custom.visuals.colors.toggle.selected" />
                <UiTextbox :label="custom.texts.logIn.email.label" :placeholder="custom.texts.logIn.email.placeholder" :class="`${baseClass}__textbox`" :value="''" />
                <UiPassword :label="custom.texts.logIn.password.label" :placeholder="custom.texts.logIn.password.placeholder" :class="`${baseClass}__textbox`" :value="''" />
                <UiButton :text="custom.texts.logIn.action" :class="`${baseClass}__button`" :background-color="custom.visuals.colors.button" />
            </div>
        </div>
        <div :class="`${baseClass}__right-section`">
             <p>Registro de usuario</p>
             <div :class="`${baseClass}__wrapper`">
                <UiToggle :options="toggleOptions.map((option, index) => ({ ...option, selected: index === 1 }))" :class="`${baseClass}__toggle`" :background="custom.visuals.colors.toggle.background" :selected-color="custom.visuals.colors.toggle.selected" />
                <UiTextbox :label="custom.texts.signUp.name.label" :placeholder="custom.texts.signUp.name.placeholder" :class="`${baseClass}__textbox`" :value="''" />
                <UiTextbox :label="custom.texts.signUp.surname.label" :placeholder="custom.texts.signUp.surname.placeholder" :class="`${baseClass}__textbox`" :value="''" />
                <UiTextbox :label="custom.texts.signUp.email.label" :placeholder="custom.texts.signUp.email.placeholder" :class="`${baseClass}__textbox`" :value="''" />
                <UiPassword :label="custom.texts.signUp.password.label" :placeholder="custom.texts.signUp.password.placeholder" :class="`${baseClass}__textbox`" :value="''" have-conditions/>
                <UiPassword :label="custom.texts.signUp.repeatPassword.label" :placeholder="custom.texts.signUp.repeatPassword.placeholder" :class="`${baseClass}__textbox`" :value="''" />
                <UiCheckbox :text="custom.texts.signUp.acceptTerms" :value="false" :class="`${baseClass}__textbox`" />
                <UiButton :text="custom.texts.signUp.action" :class="`${baseClass}__button`" :background-color="custom.visuals.colors.button" />
             </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue';

import { UserRegisterCustom } from '../../../../types/user-register.type';

import UiToggle, { ToggleOption } from '../../../shared/ui-toggle.component.vue';
import UiTextbox from '../../../shared/ui-textbox.component.vue';
import UiButton from '../../../shared/ui-button.component.vue';
import UiPassword from '../../../shared/ui-password.component.vue';
import UiCheckbox from '../../../shared/ui-checkbox.component.vue';

const baseClass = 'ui-user-register-preview';

const props = defineProps({
    custom: {
        type: Object as PropType<UserRegisterCustom>,
        required: true
    }
});

const toggleOptions = computed<ToggleOption[]>(() =>[
  { label: props.custom.texts.toggle.logIn, selected: true },
  { label: props.custom.texts.toggle.signUp, selected: false }
]);
</script>

<style lang="scss" scoped>
.ui-user-register-preview {
    display: flex;
    gap: 2rem;
    width: 100%;
    height: 100%;

    @media (max-width: 1440px) {
        flex-direction: column;
        overflow-y: scroll;
    }

    &__left-section,
    &__right-section {
        flex: 1;
        min-width: 0;
    }

    &__wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        min-height: 92%;
        width: 400px;
        padding: 2rem;
        margin-top: 1rem;
        border: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        border-radius: 8px;

        @media (max-width: 1440px) {
            min-height: 34rem;
        }
    }

    &__toggle {
        width: 18rem;
        margin: 18px 0;
        pointer-events: none;
    }

    &__textbox {
        width: 20rem;
        margin-bottom: 18px;
        pointer-events: none;
    }

    &__button {
        width: 20rem;
        pointer-events: none;
    }
}
</style>