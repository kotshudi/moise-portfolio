import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">

        <NavLink to="/" className="brand" onClick={closeMenu}>
          <span className="brand-mark">MK</span>
          <span className="brand-name">Moise Katemba</span>
        </NavLink>

        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" onClick={closeMenu}>
            {t("nav.home")}
          </NavLink>

          <NavLink to="/about" onClick={closeMenu}>
            {t("nav.about")}
          </NavLink>

          <NavLink to="/biography" onClick={closeMenu}>
            {t("nav.journey")}
          </NavLink>

          <NavLink to="/career" onClick={closeMenu}>
            {t("nav.career")}
          </NavLink>

          <NavLink to="/education" onClick={closeMenu}>
            {t("nav.education")}
          </NavLink>

          <NavLink to="/projects" onClick={closeMenu}>
            {t("nav.projects")}
          </NavLink>

          <NavLink to="/skills" onClick={closeMenu}>
            {t("nav.skills")}
          </NavLink>

          <NavLink to="/contact" onClick={closeMenu}>
            {t("nav.contact")}
          </NavLink>

          <LanguageSwitcher />
        </nav>

      </div>
    </header>
  );
}
