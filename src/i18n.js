// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./Locales/en.json"; // Adjust the path if needed
import jp from "./Locales/jp.json"; // Adjust the path if needed

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: en,
      },
      jp: {
        translation: jp,
      },
    },
    lng: "en", // Default language
    fallbackLng: "en", // Use English if translation is not available
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
  });

export default i18n;
