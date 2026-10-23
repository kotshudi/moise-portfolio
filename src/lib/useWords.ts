import { useTranslation } from "react-i18next";
export function useWords() {
  const { i18n } = useTranslation();
  return (en: string, fr: string) => (i18n.resolvedLanguage === "fr" ? fr : en);
}
