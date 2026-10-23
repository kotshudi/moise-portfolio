import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { copy, useCopy } from "../content";
import LanguageSwitcher from "./LanguageSwitcher";
export default function Navbar() {
  const { t } = useTranslation();
  const c = useCopy();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const closeMenu = () => setMenuOpen(false);
  useEffect(() => {
    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [menuOpen]);
  const links = [
    ["/", "home"],
    ["/about", "about"],
    ["/biography", "journey"],
    ["/career", "career"],
    ["/education", "education"],
    ["/projects", "projects"],
    ["/skills", "skills"],
    ["/contact", "contact"],
  ];
  return (
    <header
      className={`navbar ${pathname === "/" ? "navbar-home" : "navbar-page"}`}
    >
      <div className="navbar-inner">
        <NavLink to="/" className="brand" onClick={closeMenu}>
          <span className="brand-mark">MK</span>
          <span className="brand-name">Moise Katemba</span>
        </NavLink>
        <button
          ref={menuButton}
          type="button"
          className={`mobile-menu-button ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={c(
            menuOpen
              ? copy("Close navigation", "Fermer le menu")
              : copy("Open navigation", "Ouvrir le menu"),
          )}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          id="primary-navigation"
          aria-label={c(copy("Main navigation", "Navigation principale"))}
          className={`nav-links ${menuOpen ? "open" : ""}`}
        >
          {links.map(([path, key]) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              onClick={closeMenu}
            >
              {t(`nav.${key}`)}
            </NavLink>
          ))}
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
