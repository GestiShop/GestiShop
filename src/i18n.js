import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

const fallbackLng = ['en']
const availableLanguages = ['en', 'es', 'ca']

const resources = {
    en: {
        translation: translationEN
    },
    es: {
        translation: translationES
    },
    ca: {
        translation: translationCA
    }
}

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng,

        detection: {
            checkWhitelist: true
        },

        debug: false,

        whitelist: availableLanguages,

        interpolation: {
            escapeValue: false
        }
    })