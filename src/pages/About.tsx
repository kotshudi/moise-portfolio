import { Link } from "react-router-dom";
import profilePhoto from "../assets/images/moise-profile.png";

export default function About() {
  return (
    <main className="page about-page">

      <section className="page-hero">
        <div>
          <p className="eyebrow">MOISE DIANGELO KATEMBA</p>

          <h1>
            More than a
            <span> résumé.</span>
          </h1>

          <p className="page-lead">
            A story of learning, service, teaching, entrepreneurship
            and building ideas into something real.
          </p>
        </div>
      </section>


      <section className="section about-profile">

        <div className="about-photo">
          <img
            src={profilePhoto}
            alt="Moise Diangelo Katemba"
          />
        </div>

        <div className="about-content">

          <p className="section-label">
            01 — ABOUT ME
          </p>

          <h2>
            I believe a person's work should
            <span> mean something.</span>
          </h2>

          <p>
            My journey has moved across education, technology,
            entrepreneurship and service. Each experience has
            taught me something different about people, leadership,
            responsibility and the importance of creating useful
            solutions.
          </p>

          <p>
            I enjoy learning new skills, helping others develop,
            designing digital platforms and turning ideas into
            practical projects.
          </p>

          <div className="about-links">

            <Link to="/biography" className="button primary">
              Read My Biography
            </Link>

            <Link to="/career" className="button secondary">
              Explore My Career
            </Link>

          </div>

        </div>

      </section>


      <section className="section about-values">

        <div className="section-heading">

          <p className="section-label">
            02 — WHAT DRIVES ME
          </p>

          <h2>
            Learn.
            <span> Build.</span>
            Serve.
          </h2>

        </div>

        <div className="values-grid">

          <article className="value-card">
            <span>01</span>
            <h3>Learning</h3>
            <p>
              I continuously develop my knowledge through formal
              education, professional training and practical work.
            </p>
          </article>

          <article className="value-card">
            <span>02</span>
            <h3>Building</h3>
            <p>
              I turn ideas into projects, platforms and systems
              designed to solve practical problems.
            </p>
          </article>

          <article className="value-card">
            <span>03</span>
            <h3>Serving</h3>
            <p>
              Teaching and helping people grow have remained important
              parts of my journey.
            </p>
          </article>

        </div>

      </section>


      <section className="about-cta">

        <p className="eyebrow">KEEP EXPLORING</p>

        <h2>
          There is much more
          <span> to the story.</span>
        </h2>

        <Link to="/biography" className="button primary">
          Enter My Story →
        </Link>

      </section>

    </main>
  );
}
