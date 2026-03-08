import React from "react";
import { useTranslation } from "react-i18next";

const countryOptions = [
  { value: "en", label: "🇺🇸 English" },
  { value: "fr", label: "🇫🇷 Français" },
  { value: "hi", label: "🇮🇳 हिन्दी" },
  // add all countries/languages here
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);            // changes whole app text
    document.documentElement.lang = lang; // updates <html lang="">
  };

  return (
    <select
      onChange={handleChange}
      value={i18n.language}
      style={{ padding: "8px", fontSize: "16px" }}
    >
      {countryOptions.map((c) => (
        <option key={c.value} value={c.value}>
          {c.label}
        </option>
      ))}
    </select>
  );
}
