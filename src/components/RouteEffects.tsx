import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { projects } from "../data/projects";
export default function RouteEffects() {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const previous = useRef(pathname);
  useEffect(() => {
    const labels: Record<string, string> = {
      "/": "home",
      "/about": "about",
      "/biography": "journey",
      "/career": "career",
      "/education": "education",
      "/projects": "projects",
      "/skills": "skills",
      "/contact": "contact",
    };
    const project = projects.find(
      (item) => pathname === `/projects/${item.id}`,
    );
    const title =
      project?.title ||
      (labels[pathname]
        ? t(`nav.${labels[pathname]}`)
        : i18n.resolvedLanguage === "fr"
          ? "Page introuvable"
          : "Page not found");
    document.title = `${title} | Moise Katemba`;
    document.documentElement.lang =
      i18n.resolvedLanguage === "fr" ? "fr" : "en";
    const description =
      i18n.resolvedLanguage === "fr"
        ? "Moise Diangelo Katemba : éducateur, entrepreneur et développeur à Kinshasa. Découvrez mon parcours, mes compétences et mes projets Katembatic."
        : "Moise Diangelo Katemba: educator, entrepreneur and developer in Kinshasa. Explore my experience, skills and Katembatic projects.";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", document.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", description);
    if (previous.current !== pathname) {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.getElementById("main-content")?.focus({ preventScroll: true });
      previous.current = pathname;
    }
  }, [pathname, t, i18n.resolvedLanguage]);
  return null;
}
