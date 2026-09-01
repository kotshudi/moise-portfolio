import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (language: "en" | "fr") => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="language-switcher" aria-label="Language selector">
      <button
        className={i18n.language === "en" ? "active" : ""}
        onClick={() => changeLanguage("en")}
        type="button"
      >
        EN
      </button>

      <span>•</span>

      <button
        className={i18n.language === "fr" ? "active" : ""}
        onClick={() => changeLanguage("fr")}
        type="button"
      >
        FR
      </button>
    </div>
  );
}
