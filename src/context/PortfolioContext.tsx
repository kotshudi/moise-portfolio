import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import { db } from "../firebase/config";
import type { PortfolioContent, SettingsData } from "../lib/portfolioTypes";
const keys = [
  "profile",
  "biography",
  "career",
  "education",
  "projects",
  "skills",
  "media",
  "settings",
] as const;
type State = {
  content: PortfolioContent & { settings: SettingsData };
  loading: boolean;
  error: string;
  refresh: () => void;
};
const Context = createContext<State | null>(null);
export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const [raw, setRaw] = useState<Record<string, Record<string, unknown>>>({});
  const [status, setStatus] = useState<Record<string, string>>({});
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const unsub = keys.map((key) =>
      onSnapshot(
        doc(db, key, "main"),
        (snapshot) => {
          setRaw((current) => ({
            ...current,
            [key]: snapshot.exists() ? snapshot.data() : {},
          }));
          setStatus((current) => ({
            ...current,
            [key]: snapshot.exists() ? "ready" : "missing",
          }));
        },
        () => setStatus((current) => ({ ...current, [key]: "error" })),
      ),
    );
    return () => unsub.forEach((stop) => stop());
  }, [attempt]);
  useEffect(() => {
    const settings = raw.settings;
    if (!settings || !["en", "fr"].includes(String(settings.defaultLanguage)))
      return;
    try {
      if (!localStorage.getItem("portfolio-language"))
        void i18n.changeLanguage(String(settings.defaultLanguage));
    } catch {
      /* Language switching still works without storage. */
    }
  }, [raw.settings, i18n]);
  const state = useMemo(() => {
    const pick = (key: string) => {
      const value = raw[key] || {};
      return i18n.resolvedLanguage === "fr" && value.fr
        ? { ...value, ...(value.fr as object) }
        : value;
    };
    const finished = Object.keys(status).length === keys.length;
    const error = Object.values(status).includes("error")
      ? "We couldn’t load the website content from Firebase. Please check your connection and try again."
      : finished && Object.values(status).includes("missing")
        ? "The website content has not been published from the admin dashboard yet."
        : "";
    return {
      content: {
        profile: pick("profile"),
        biography: pick("biography"),
        career: pick("career").entries || [],
        education: pick("education").entries || [],
        projects: pick("projects").entries || [],
        skills: pick("skills").entries || [],
        media: pick("media").items || [],
        settings: pick("settings"),
      } as State["content"],
      loading: !finished,
      error,
      refresh: () => {
        setStatus({});
        setAttempt((value) => value + 1);
      },
    };
  }, [raw, status, i18n.resolvedLanguage]);
  return <Context.Provider value={state}>{children}</Context.Provider>;
}
// Context and its consumer hook intentionally share the same module.
// eslint-disable-next-line react-refresh/only-export-components
export function usePortfolio() {
  const state = useContext(Context);
  if (!state) throw new Error("PortfolioProvider is required.");
  return state;
}
