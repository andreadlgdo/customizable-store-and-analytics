import { createI18n } from 'vue-i18n';
import esMessages from './locales/es.json';
import enMessages from './locales/en.json';

const messages = {
  es: esMessages,
  en: enMessages
};

const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'es',
  messages
});

export default i18n;
