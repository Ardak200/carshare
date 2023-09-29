import i18n from 'i18next';
import en from './locales/en/translation.json';
import ru from './locales/ru/translation.json';
import kz from './locales/ru/translation.json';
import { initReactI18next } from 'react-i18next';

export const resources = {
    en: {
        en,
    },
    ru: {
        ru
    },
    kz: {
        kz
    }
} as const;

i18n.use(initReactI18next).init({
    lng: 'ru',
    interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
    },
    resources,
});