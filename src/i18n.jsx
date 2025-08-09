import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en/common.json';
import es from './locales/es/common.json';
import de from './locales/de/common.json';
import it from './locales/it/common.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { common: en },
            es: { common: es },
            de: { common: de },
            it: { common: it },
        },
        fallbackLng: 'en',
        ns: ['common'],
        defaultNS: 'common',
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['path', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'querystring'],
            caches: ['cookie']
        }
    });

export default i18n;
