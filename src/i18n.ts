import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

import translationEN from '../assets/locales/en/translation.json';
import translationES from '../assets/locales/es/translation.json';
import translationCA from '../assets/locales/ca/translation.json';
import { DEFAULT_LANGUAGE_CODE, LANGUAGE_LIST } from './model';
import LocalConfiguration from './utils/local-configuration';

const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
  ca: {
    translation: translationCA,
  },
} as const;

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: DEFAULT_LANGUAGE_CODE,
    lng:
      LocalConfiguration.getLocalLanguageInfo()?.languageCode ??
      DEFAULT_LANGUAGE_CODE,

    debug: false,

    supportedLngs: LANGUAGE_LIST,

    interpolation: {
      escapeValue: false,
    },
  })
  .then(console.log)
  .catch(console.error);
