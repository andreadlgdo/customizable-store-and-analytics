<template>
    <div :class="baseClass">
        <form :class="`${baseClass}__form`"  @submit.prevent="submitForm">
            <UiTextbox
              @input="value => (contactForm.name = value)"
              :value="contactForm.name"
              :label="t('contactUs.form.name.label')"
              :placeholder="t('contactUs.form.name.placeholder')"
            />
            <UiTextbox
              @input="value => (contactForm.email = value)"
              :value="contactForm.email"
              :label="t('contactUs.form.email.label')"
              :placeholder="t('contactUs.form.email.placeholder')"
              :error="emailError"
            />
            <UiTextbox
              @input="value => (contactForm.subject = value)"
              :value="contactForm.subject"
              :label="t('contactUs.form.subject.label')"
              :placeholder="t('contactUs.form.subject.placeholder')"
            />
            <UiTextbox
              @input="value => (contactForm.message = value)"
              :value="contactForm.message"
              :label="t('contactUs.form.message.label')"
              :placeholder="t('contactUs.form.message.placeholder')"
              multiline
            />
            <UiButton
              @click="submitForm"
              :text="t('contactUs.form.action')"
              :disabled="!isFormValid"
              :class="`${baseClass}__button`"
            />
        </form>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import UiButton from '../shared/ui-button.component.vue';
import UiTextbox from '../shared/ui-textbox.component.vue';

const baseClass = 'ui-contact-form';

const { t } = useI18n();

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
