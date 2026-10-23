import { Link } from "react-router-dom";
import { useWords } from "../lib/useWords";
import { usePortfolio } from "../context/PortfolioContext";
export default function Footer() {
  const w = useWords();
  const { content, loading, error } = usePortfolio();
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <span className="footer-brand">MK</span>
          <p>Moise Diangelo Katemba</p>
          {!loading && !error && <span>{content.profile.title}</span>}
        </div>
        <nav aria-label={w("Footer navigation", "Navigation de pied de page")}>
          <Link to="/projects">{w("Selected work", "Projets")}</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/admin">{w("Admin access", "Accès administrateur")}</Link>
        </nav>
        <div className="footer-copy">
          <p>© {new Date().getFullYear()} Moise Diangelo Katemba.</p>
          <p>
            {w(
              "Built with purpose in Kinshasa.",
              "Créé avec conviction à Kinshasa.",
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
