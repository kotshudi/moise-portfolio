import { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useWords } from "../lib/useWords";
import LanguageSwitcher from "./LanguageSwitcher";
export default function Navbar() {
  const w = useWords();
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [open]);
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink className="brand" to="/" onClick={() => setOpen(false)}>
          <span className="brand-mark">MK</span>
          <span>Moise Katemba</span>
        </NavLink>
        <button
          ref={button}
          className="mobile-menu-button"
          type="button"
          aria-label={
            open
              ? w("Close menu", "Fermer le menu")
              : w("Open menu", "Ouvrir le menu")
          }
          aria-expanded={open}
          aria-controls="navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
        <nav
          id="navigation"
          className={`nav-links ${open ? "open" : ""}`}
          aria-label={w("Main navigation", "Navigation principale")}
        >
          {[
            ["/about", w("About", "À propos")],
            ["/biography", w("Story", "Histoire")],
            ["/career", w("Career", "Carrière")],
            ["/education", w("Education", "Formation")],
            ["/projects", w("Work", "Projets")],
            ["/skills", w("Skills", "Compétences")],
            ["/photos", w("Photos", "Photos")],
            ["/contact", "Contact"],
          ].map(([path, label]) => (
            <NavLink key={path} to={path} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
