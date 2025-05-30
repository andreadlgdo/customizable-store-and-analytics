<template>
    <div :class="baseClass">
        <form :class="`${baseClass}__form`"  @submit.prevent="submitForm">
            <UiTextbox
              @input="(value: string) => (contactForm.name = value)"
              :value="contactForm.name"
              :label="contactUsTexts?.form[0].label"
              :placeholder="contactUsTexts?.form[0].placeholder"
            />
            <UiTextbox
              @input="(value: string) => (contactForm.email = value)"
              :value="contactForm.email"
              :label="contactUsTexts?.form[1].label"
              :placeholder="contactUsTexts?.form[1].placeholder"
              :error="emailError"
            />
            <UiTextbox
              @input="(value: string) => (contactForm.subject = value)"
              :value="contactForm.subject"
              :label="contactUsTexts?.form[2].label"
              :placeholder="contactUsTexts?.form[2].placeholder"
            />
            <UiTextbox
              @input="(value: string) => (contactForm.message = value)"
              :value="contactForm.message"
              :label="contactUsTexts?.form[3].label"
              :placeholder="contactUsTexts?.form[3].placeholder"
              multiline
            />
            <UiButton
              @click="submitForm"
              :text="contactUsTexts?.form[4].action"
              :disabled="!isFormValid"
              :class="`${baseClass}__button`"
            />
        </form>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import UiButton from '../shared/ui-button.component.vue';
import UiTextbox from '../shared/ui-textbox.component.vue';
import { customTextsService } from '../../services';

const baseClass = 'ui-contact-form';

const { t } = useI18n();

const contactUsTexts = ref();

const contactForm = ref({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const emailError = ref('');

  const validateForm = () => {
    emailError.value = ''

    if (!/^\S+@\S+\.\S+$/.test(contactForm.value.email)) {
      emailError.value = t('contactUs.form.email.error');
      return false;
    }
    return true;
  };

  const isFormValid = computed(() => {
    return contactForm.value.name && 
           contactForm.value.email && 
           contactForm.value.subject && 
           contactForm.value.message;
  });

const submitForm = () => {
    if (validateForm()) {
      console.log('Form submitted:', contactForm.value);
      
      contactForm.value = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
      
      alert('Thank you for your message! We will get back to you soon.');
    }
  };

  onMounted(async () => {
    contactUsTexts.value = await customTextsService.getCustomTexts("contactUs");
    console.log(contactUsTexts.value);
  });
</script>

<style lang="scss" scoped>
.ui-contact-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    border-radius: 10px;
    border: 1px solid var(--color-dark-primary);
    

    &__form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    &__button {
        align-self: flex-end;
    }
}
</style>
