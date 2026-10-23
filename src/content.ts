import { useTranslation } from "react-i18next";

export type Bilingual = { en: string; fr: string };
export const copy = (en: string, fr: string): Bilingual => ({ en, fr });
export function useCopy() {
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage === "fr" ? "fr" : "en";
  return (value: Bilingual) => value[language];
}
export const contactEmail = "moisekatemba@katembaticfff.com";
