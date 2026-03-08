import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          welcome: "Hello, welcome!",
          about: "About Us",
          contact: "Contact us"
        }
      },
      fr: {
        translation: {
          welcome: "Bonjour, bienvenue !",
          about: "À propos de nous",
          contact: "Contactez-nous"
        }
      },
      hi: {
        translation: {
          welcome: "नमस्ते, स्वागत है!",
          about: "हमारे बारे में",
          contact: "संपर्क करें"
        }
      },
      // 👉 add more languages here
    },
    lng: "en",        // default language
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;
