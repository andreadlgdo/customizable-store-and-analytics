import { createI18n } from 'vue-i18n';
import { AppMessages } from './locales/locales';
import es from './locales/es';
import en from './locales/en';

const messages: AppMessages = {
  es,
  en
};

const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'es',
  messages
});

export default i18n;
