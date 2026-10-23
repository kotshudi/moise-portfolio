import { Link } from "react-router-dom";
import { copy, useCopy, contactEmail } from "../content";
export default function Footer() {
  const c = useCopy();
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand">MK</div>
          <p>Moise Diangelo Katemba</p>
          <span>
            {c(
              copy(
                "Educator · Entrepreneur · Developer",
                "Éducateur · Entrepreneur · Développeur",
              ),
            )}
          </span>
        </div>
        <div className="footer-links">
          <Link to="/about">{c(copy("About", "À propos"))}</Link>
          <Link to="/projects">{c(copy("Projects", "Projets"))}</Link>
          <Link to="/contact">Contact</Link>
          <a href={`mailto:${contactEmail}`}>
            {c(copy("Send an email", "Envoyer un e-mail"))} ↗
          </a>
        </div>
        <div className="footer-copy">
          © {new Date().getFullYear()} Moise Diangelo Katemba.
          <br />
          {c(copy("All rights reserved.", "Tous droits réservés."))}
          <p>
            {c(
              copy(
                "Built with purpose in Kinshasa.",
                "Créé avec conviction à Kinshasa.",
              ),
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
