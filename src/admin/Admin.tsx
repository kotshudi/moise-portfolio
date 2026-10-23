import { Link } from "react-router-dom";
import "./Admin.css";

const sections = [
  { name: "Profile", path: "/admin/profile", icon: "◎" },
  { name: "My Story", path: "/admin/story", icon: "✦" },
  { name: "Career", path: "/admin/career", icon: "◆" },
  { name: "Education", path: "/admin/education", icon: "◇" },
  { name: "Projects", path: "/admin/projects", icon: "▣" },
  { name: "Skills", path: "/admin/skills", icon: "◈" },
  { name: "Photos", path: "/admin/media", icon: "▤" },
  { name: "Settings", path: "/admin/settings", icon: "⚙" },
];

export default function Admin() {
  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-brand-mark">MK</div>

          <div>
            <strong>MOISE KATEMBA</strong>
            <span>ADMIN</span>
          </div>
        </div>

        <nav className="admin-nav">
          <Link to="/admin" className="admin-nav-item active">
            <span>⌂</span>
            Dashboard
          </Link>

          {sections.map((section) => (
            <Link
              key={section.path}
              to={section.path}
              className="admin-nav-item"
            >
              <span>{section.icon}</span>
              {section.name}
            </Link>
          ))}
        </nav>

        <Link to="/" className="admin-public-link">
          ← View Public Website
        </Link>
      </aside>

      <section className="admin-main">
        <header className="admin-header">
          <div>
            <p>CONTROL CENTER</p>
            <h1>Welcome back, Moise.</h1>
          </div>

          <div className="admin-status">
            <span></span>
            Admin System
          </div>
        </header>

        <div className="admin-content">
          <div className="admin-intro">
            <p className="admin-label">YOUR WEBSITE</p>

            <h2>Everything in one place.</h2>

            <p>
              Manage your profile, biography, career, education, projects,
              skills and media from your private control center.
            </p>
          </div>

          <div className="admin-cards">
            {sections.map((section, index) => (
              <Link
                key={section.path}
                to={section.path}
                className="admin-card"
              >
                <span className="admin-card-icon">
                  {section.icon}
                </span>

                <div>
                  <span className="admin-card-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>{section.name}</h3>

                  <p>
                    {section.name === "Profile"
                      ? "Manage your personal information."
                      : "Edit and manage this section."}
                  </p>
                </div>

                <strong>→</strong>
              </Link>
            ))}
          </div>

          <div className="admin-notice">
            <div>
              <span className="admin-label">NEXT STAGE</span>

              <h3>Your content will become dynamic.</h3>

              <p>
                Changes made through the CMS will be stored in Firebase
                and eventually displayed automatically on the public
                website.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
