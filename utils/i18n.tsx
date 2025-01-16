import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { translations } from "./locales/translations";
import useStore, { DEFAULT_LANGUAGE } from "@/utils/store";

const Internationalization = () => {
    const zh: { [key: string]: string | undefined } = {};
    const en: { [key: string]: string | undefined } = {};
    const { systemContext } = useStore();

    for (const key in translations) {
        if (translations.hasOwnProperty(key)) {
            zh[key] = translations[key].zh;
            en[key] = translations[key].en;
        }
    }
    i18n.use(initReactI18next).init({
        resources: {
            en: { translation: en },
            zh: { translation: zh },
        },
        lng: systemContext?.language, // 默认语言
        fallbackLng: DEFAULT_LANGUAGE,
        interpolation: {
            escapeValue: false,
        },
    });
    return "";
};
export default Internationalization;
