import { Link } from "react-router-dom";
import { copy, useCopy } from "../content";
import profilePhoto from "../assets/images/moise-profile.png";
import mainPhoto from "../assets/images/moise-main.jpg";
export default function Home() {
  const c = useCopy();
  const pockets = [
    {
      path: "/biography",
      title: copy("My story", "Mon histoire"),
      description: copy(
        "The experiences and lessons that shaped my direction.",
        "Les expériences et les leçons qui ont façonné mon parcours.",
      ),
    },
    {
      path: "/career",
      title: copy("Career", "Carrière"),
      description: copy(
        "Teaching, administration, entrepreneurship and service.",
        "Enseignement, administration, entrepreneuriat et service.",
      ),
    },
    {
      path: "/education",
      title: copy("Education", "Formation"),
      description: copy(
        "Business studies, technology training and learning by doing.",
        "Études commerciales, formation technologique et apprentissage par la pratique.",
      ),
    },
    {
      path: "/projects",
      title: copy("Projects", "Projets"),
      description: copy(
        "Practical tools for education, business and community needs.",
        "Des outils concrets pour l’éducation, les entreprises et la communauté.",
      ),
    },
  ];
  return (
    <main className="home-page" id="main-content" tabIndex={-1}>
      <section className="hero-section">
        <div className="hero-background">
          <img src={mainPhoto} alt="" fetchPriority="high" />
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">MOISE DIANGELO KATEMBA</p>
          <h1>
            {c(copy("Building with", "Construire avec"))}
            <span>{c(copy("purpose.", "conviction."))}</span>
          </h1>
          <h2>
            {c(
              copy(
                "Educator · Entrepreneur · Developer",
                "Éducateur · Entrepreneur · Développeur",
              ),
            )}
          </h2>
          <p className="hero-description">
            {c(
              copy(
                "Based in Kinshasa, I teach, build digital tools and develop projects that connect education, business and community.",
                "Basé à Kinshasa, j’enseigne, je crée des outils numériques et je développe des projets qui relient l’éducation, les entreprises et la communauté.",
              ),
            )}
          </p>
          <div className="hero-actions">
            <Link to="/projects" className="button primary">
              {c(copy("Explore my work", "Découvrir mes projets"))} ↗
            </Link>
            <Link to="/contact" className="button secondary">
              {c(copy("Let’s connect", "Échangeons"))}
            </Link>
          </div>
        </div>
        <div className="hero-profile">
          <div className="hero-profile-frame">
            <img
              src={profilePhoto}
              alt="Moise Diangelo Katemba"
              width="400"
              height="510"
            />
          </div>
          <div className="hero-profile-caption">
            <strong>MOISE KATEMBA</strong>
            <span>
              {c(copy("Kinshasa, D.R. Congo", "Kinshasa, R.D. Congo"))}
            </span>
          </div>
        </div>
      </section>
      <section className="home-introduction section">
        <p className="section-label">
          01 — {c(copy("WHO I AM", "QUI JE SUIS"))}
        </p>
        <div className="intro-grid">
          <h2>
            {c(copy("A journey shaped by", "Un parcours guidé par"))}
            <span>
              {c(
                copy(
                  "service, learning and creation.",
                  "le service, l’apprentissage et la création.",
                ),
              )}
            </span>
          </h2>
          <div>
            <p className="about-text">
              {c(
                copy(
                  "My work moves between the classroom and the tools I build. Teaching helps me understand people’s needs; entrepreneurship and technology give me ways to respond to them.",
                  "Mon travail fait le lien entre la salle de classe et les outils que je crée. L’enseignement m’aide à comprendre les besoins des personnes ; l’entrepreneuriat et la technologie me donnent les moyens d’y répondre.",
                ),
              )}
            </p>
            <Link to="/about" className="text-link">
              {c(copy("More about me", "En savoir plus"))} →
            </Link>
          </div>
        </div>
      </section>
      <section className="home-pockets section">
        <p className="section-label">
          02 — {c(copy("ENTER MY WORLD", "DÉCOUVREZ MON UNIVERS"))}
        </p>
        <div className="pocket-grid">
          {pockets.map((pocket, index) => (
            <Link to={pocket.path} className="pocket-card" key={pocket.path}>
              <span>0{index + 1}</span>
              <h3>{c(pocket.title)}</h3>
              <p>{c(pocket.description)}</p>
              <strong>{c(copy("Explore", "Découvrir"))} →</strong>
            </Link>
          ))}
        </div>
      </section>
      <section className="home-statement">
        <div className="statement-inner">
          <p className="eyebrow">
            {c(copy("MY PHILOSOPHY", "MA PHILOSOPHIE"))}
          </p>
          <h2>
            {c(copy("Don’t just imagine", "Ne vous contentez pas d’imaginer"))}
            <span>
              {" "}
              {c(copy("what could exist.", "ce qui pourrait exister."))}
            </span>
          </h2>
          <p>
            {c(
              copy(
                "Learn. Build. Serve. Improve.",
                "Apprendre. Construire. Servir. Améliorer.",
              ),
            )}
          </p>
          <Link to="/contact" className="button primary">
            {c(copy("Start a conversation", "Parlons-en"))} ↗
          </Link>
        </div>
      </section>
    </main>
  );
}
