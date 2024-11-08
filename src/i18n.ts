import { createI18n } from 'vue-i18n';
import { AppMessages } from './locales/locales';
import es from './locales/es';
import en from './locales/en';
import fr from './locales/fr';

const messages: AppMessages = {
  es,
  en,
  fr
};

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'es',
  fallbackLocale: 'es',
  messages
});

export default i18n;
