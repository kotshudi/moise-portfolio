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
      {(["en", "fr"] as const).map((language) => (
        <button
          key={language}
          className={i18n.resolvedLanguage === language ? "active" : ""}
          aria-pressed={i18n.resolvedLanguage === language}
          aria-label={language === "en" ? "English" : "Français"}
          lang={language}
          onClick={() => {
            void i18n.changeLanguage(language);
          }}
          type="button"
        >
          {language.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
