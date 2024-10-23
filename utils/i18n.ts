import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import {translations} from './locales/translations'

const zh: { [key: string]: string|undefined } = {};
const en: { [key: string]: string|undefined } = {};

for (const key in translations) {
  if (translations.hasOwnProperty(key)) {
    zh[key] = translations[key].zh;
    en[key] = translations[key].en;
  }
}
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: zh },
    },
    lng: 'en', // 默认语言
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

