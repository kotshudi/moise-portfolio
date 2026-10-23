import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import profilePhoto from "../assets/images/Moise professional pic.jpeg";
import mainPhoto from "../assets/images/moise-profile.png";

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="home-page">

      <section className="hero-section">

        <div className="hero-background">
          <img src={mainPhoto} alt="" />
        </div>

        <div className="hero-overlay"></div>

        <div className="hero-content">

          <p className="eyebrow">
            MOISE DIANGELO KATEMBA
          </p>

          <h1>
            Building with
            <span> purpose.</span>
          </h1>

          <h2>{t("hero.title")}</h2>

          <p className="hero-description">
            {t("hero.description")}
          </p>

          <div className="hero-actions">

            <Link to="/about" className="button primary">
              Discover My Story
            </Link>

            <Link to="/projects" className="button secondary">
              Explore My Work
            </Link>

          </div>

        </div>

        <div className="hero-profile">

          <div className="hero-profile-frame">
            <img
              src={profilePhoto}
              alt="Moise Diangelo Katemba"
            />
          </div>

          <div className="hero-profile-caption">
            <strong>MOISE KATEMBA</strong>
            <span>Educator · Entrepreneur · Builder</span>
          </div>

        </div>

      </section>


      <section className="home-introduction section">

        <div className="section-label">
         WHO I AM
        </div>

        <div className="intro-grid">

          <h2>
            A journey shaped by
            <span> service, learning and creation.</span>
          </h2>

          <div>

            <p className="about-text">
              I am an educator, entrepreneur and technology enthusiast
              passionate about building meaningful solutions and helping
              people grow.
            </p>

            <Link to="/about" className="text-link">
              More about me →
            </Link>

          </div>

        </div>

      </section>


      <section className="home-pockets section">

        <div className="section-label">
          ENTER MY WORLD
        </div>

        <div className="pocket-grid">

          <Link to="/biography" className="pocket-card">

            <h3>My Story</h3>
            <p>
              The experiences, challenges, people and moments
              that shaped who I am.
            </p>
            <strong>Open story →</strong>
          </Link>

          <Link to="/career" className="pocket-card">
  
            <h3>Career</h3>
            <p>
              My professional journey, responsibilities,
              experience and ambitions.
            </p>
            <strong>Explore career →</strong>
          </Link>

          <Link to="/education" className="pocket-card">
  
            <h3>Education</h3>
            <p>
              Academic studies, professional training,
              certificates and continuous learning.
            </p>
            <strong>View education →</strong>
          </Link>

          <Link to="/projects" className="pocket-card">

            <h3>Projects</h3>
            <p>
              Businesses, platforms and ideas that I am
              building for the future.
            </p>
            <strong>See projects →</strong>
          </Link>

        </div>

      </section>


      <section className="home-statement">

        <div className="statement-inner">

          <p className="eyebrow">
            MY PHILOSOPHY
          </p>

          <h2>
            Don't just imagine
            <span> what could exist.</span>
          </h2>

          <p>
            Learn. Build. Serve. Improve.
          </p>

        </div>

      </section>

    </main>
  );
}
