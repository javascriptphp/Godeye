import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import { useEffect } from "react";

import { translations } from "./locales/translations";
import useStore, { DEFAULT_LANGUAGE } from "@/utils/store";

// Initialize translations
const zh: { [key: string]: string | undefined } = {};
const en: { [key: string]: string | undefined } = {};

for (const key in translations) {
    if (translations.hasOwnProperty(key)) {
        zh[key] = translations[key].zh;
        en[key] = translations[key].en;
    }
}

// Initialize i18n outside of component lifecycle
i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        zh: { translation: zh },
    },
    lng: DEFAULT_LANGUAGE, // Default language
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
        escapeValue: false,
    },
});

const Internationalization = () => {
    const { systemContext } = useStore();
    const { i18n } = useTranslation();

    // Update language when systemContext changes
    useEffect(() => {
        if (
            systemContext?.language &&
            i18n.language !== systemContext.language
        ) {
            i18n.changeLanguage(systemContext.language);
        }
    }, [systemContext?.language, i18n]);

    return null;
};

export default Internationalization;
