import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand">MK</div>
          <p>Moise Diangelo Katemba</p>
          <span>Educator · Entrepreneur · Developer</span>
        </div>

        <div className="footer-links">
          <Link to="/about">{t("nav.about")}</Link>
          <Link to="/career">{t("nav.career")}</Link>
          <Link to="/projects">{t("nav.projects")}</Link>
          <Link to="/contact">{t("nav.contact")}</Link>
        </div>

        <div className="footer-copy">
          © {new Date().getFullYear()} Moise Diangelo Katemba.
          <br />
          {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
