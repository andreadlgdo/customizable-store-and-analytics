<template>
    <div :class="baseClass">
        <form :class="`${baseClass}__form`"  @submit.prevent="submitForm">
            <UiTextbox
              :value="contactForm.name"
              :label="contactUsTexts?.form[0].label"
              :placeholder="contactUsTexts?.form[0].placeholder"
              @input="(value: string) => (contactForm.name = value)"
            />
            <UiTextbox
              :value="contactForm.email"
              :label="contactUsTexts?.form[1].label"
              :placeholder="contactUsTexts?.form[1].placeholder"
              :error="emailError"
              @input="(value: string) => (contactForm.email = value)"
            />
            <UiTextbox
              :value="contactForm.subject"
              :label="contactUsTexts?.form[2].label"
              :placeholder="contactUsTexts?.form[2].placeholder"
              @input="(value: string) => (contactForm.subject = value)"
            />
            <UiTextbox
              :value="contactForm.message"
              :label="contactUsTexts?.form[3].label"
              :placeholder="contactUsTexts?.form[3].placeholder"
              multiline
              @input="(value: string) => (contactForm.message = value)"
            />
            <UiButton
              :text="contactUsTexts?.form[4].action"
              :disabled="!isFormValid"
              :class="`${baseClass}__button`"
              @click="submitForm"
            />
        </form>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { ContactUsTexts, ContactForm} from '../../types/custom-us.type';
import { customService } from '../../services';

import UiButton from '../shared/ui-button.component.vue';
import UiTextbox from '../shared/ui-textbox.component.vue';

const baseClass = 'ui-contact-form';

const { t } = useI18n();

const props = defineProps<{
    customTexts: ContactUsTexts;
    editMode: boolean;
}>();

const contactUsTexts = ref();

const contactForm = ref<ContactForm>({
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
  return Boolean(
    contactForm.value.name &&
    contactForm.value.email &&
    contactForm.value.subject &&
    contactForm.value.message
  );
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

watch(() => props.customTexts, (newTexts) => {
  if (props.editMode && newTexts) {
    contactUsTexts.value = newTexts;
  }
}, { immediate: true });

onMounted(async () => {
  if (!props.editMode || !props.customTexts) {
    const customTexts = await customService.getCustomTexts("contactUs");
    contactUsTexts.value = customTexts;
  }
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
