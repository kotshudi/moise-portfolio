import { Link } from "react-router-dom";
import { copy, useCopy } from "../content";
import PageHero, { SectionHeading } from "../components/PageHero";
import profilePhoto from "../assets/images/moise-profile.png";
export default function About() {
  const c = useCopy();
  const values = [
    [
      copy("Learning", "Apprendre"),
      copy(
        "I develop my skills through business studies, professional training and the practical work of building projects.",
        "Je développe mes compétences grâce aux études commerciales, aux formations professionnelles et à la réalisation de projets.",
      ),
    ],
    [
      copy("Building", "Construire"),
      copy(
        "I turn ideas into websites, teaching materials and tools that respond to practical needs.",
        "Je transforme des idées en sites web, en supports pédagogiques et en outils qui répondent à des besoins concrets.",
      ),
    ],
    [
      copy("Serving", "Servir"),
      copy(
        "Teaching and community service keep my work connected to the people it is intended to help.",
        "L’enseignement et le service communautaire gardent mon travail proche des personnes auxquelles il est destiné.",
      ),
    ],
  ];
  return (
    <main className="page about-page" id="main-content" tabIndex={-1}>
      <PageHero
        label="MOISE DIANGELO KATEMBA"
        title={c(copy("More than", "Plus qu’un"))}
        accent={c(copy("a résumé.", "curriculum vitæ."))}
        description={c(
          copy(
            "An educator, entrepreneur and developer bringing together people, learning and practical technology.",
            "Un éducateur, entrepreneur et développeur qui rapproche les personnes, l’apprentissage et la technologie.",
          ),
        )}
      />
      <section className="section about-profile">
        <div className="about-photo">
          <img src={profilePhoto} alt="Moise Diangelo Katemba" loading="lazy" />
        </div>
        <div className="about-content">
          <p className="section-label">
            01 — {c(copy("ABOUT ME", "À PROPOS"))}
          </p>
          <h2>
            {c(
              copy(
                "I believe a person’s work should",
                "Je crois que le travail doit",
              ),
            )}
            <span> {c(copy("mean something.", "avoir du sens."))}</span>
          </h2>
          <p>
            {c(
              copy(
                "I am based in Kinshasa, D.R. Congo. My experience spans school teaching, private English tutoring, data entry, missionary service and the development of digital projects.",
                "Je suis basé à Kinshasa, en R.D. Congo. Mon expérience couvre l’enseignement scolaire, les cours particuliers d’anglais, la saisie de données, le service missionnaire et le développement de projets numériques.",
              ),
            )}
          </p>
          <p>
            {c(
              copy(
                "Within Katembatic FFF, founded by my father, I contribute to initiatives in education, finance and business. I also study Applied Business Management through BYU–Idaho and BYU–Pathway Worldwide, putting what I learn into practice.",
                "Au sein de Katembatic FFF, fondé par mon père, je contribue à des initiatives dans l’éducation, la finance et les affaires. J’étudie également la gestion appliquée des entreprises via BYU–Idaho et BYU–Pathway Worldwide, en mettant mes apprentissages en pratique.",
              ),
            )}
          </p>
          <div className="about-links">
            <Link className="button primary" to="/biography">
              {c(copy("Read my story", "Lire mon histoire"))}
            </Link>
            <Link className="button secondary" to="/career">
              {c(copy("Explore my career", "Mon parcours professionnel"))}
            </Link>
          </div>
        </div>
      </section>
      <section className="section about-values">
        <SectionHeading
          label={c(copy("02 — WHAT DRIVES ME", "02 — CE QUI ME MOTIVE"))}
        >
          {c(copy("Learn. Build. Serve.", "Apprendre. Construire. Servir."))}
        </SectionHeading>
        <div className="values-grid">
          {values.map(([title, description], i) => (
            <article className="value-card" key={title.en}>
              <span>0{i + 1}</span>
              <h3>{c(title)}</h3>
              <p>{c(description)}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="about-cta">
        <h2>
          {c(copy("Have something in mind?", "Vous avez une idée en tête ?"))}
        </h2>
        <Link className="button secondary" to="/contact">
          {c(copy("Let’s talk", "Parlons-en"))} ↗
        </Link>
      </section>
    </main>
  );
}
