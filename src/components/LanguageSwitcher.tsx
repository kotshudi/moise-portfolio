import { useTranslation } from "react-i18next";
export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  return (
    <div
      className="language-switcher"
      role="group"
      aria-label={
        i18n.resolvedLanguage === "fr" ? "Langue du site" : "Site language"
      }
    >
      {["en", "fr"].map((language) => (
        <button
          type="button"
          key={language}
          lang={language}
          aria-label={language === "en" ? "English" : "Français"}
          aria-pressed={i18n.resolvedLanguage === language}
          onClick={() => {
            try { localStorage.setItem("portfolio-language", language); } catch { /* Storage is optional. */ }
            void i18n.changeLanguage(language);
          }}
        >
          {language.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
