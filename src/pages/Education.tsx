import { copy, useCopy } from "../content";
import PageHero, { SectionHeading } from "../components/PageHero";
export default function Education() {
  const c = useCopy();
  const studies = [
    [
      copy("IN PROGRESS", "EN COURS"),
      copy("Applied Business Management", "Gestion appliquée des entreprises"),
      copy(
        "BYU–Idaho through BYU–Pathway Worldwide. Studies in entrepreneurship, management, accounting and business decision-making.",
        "BYU–Idaho via BYU–Pathway Worldwide. Études en entrepreneuriat, gestion, comptabilité et prise de décision en entreprise.",
      ),
    ],
    [
      copy("COMPLETED · NOVEMBER 2024", "TERMINÉ · NOVEMBRE 2024"),
      copy("Entrepreneurship certificate", "Certificat en entrepreneuriat"),
      copy(
        "A foundation for evaluating business ideas, understanding customers and turning plans into practical action.",
        "Une base pour évaluer les idées d’entreprise, comprendre les clients et transformer les plans en actions concrètes.",
      ),
    ],
    [
      copy("PROFESSIONAL TRAINING", "FORMATION PROFESSIONNELLE"),
      copy("Microsoft training programme", "Programme de formation Microsoft"),
      copy(
        "Nine months of training through Bloom / Springboard, strengthening my use of Microsoft tools and digital workflows.",
        "Neuf mois de formation via Bloom / Springboard pour renforcer ma maîtrise des outils Microsoft et des méthodes de travail numériques.",
      ),
    ],
  ];
  return (
    <main className="page" id="main-content" tabIndex={-1}>
      <PageHero
        label={c(copy("EDUCATION", "FORMATION"))}
        title={c(copy("Always", "Toujours"))}
        accent={c(copy("learning.", "apprendre."))}
        description={c(
          copy(
            "Formal studies, professional training and hands-on learning that feed directly into my work.",
            "Des études, des formations professionnelles et un apprentissage pratique qui nourrissent directement mon travail.",
          ),
        )}
      />
      <section className="section">
        <SectionHeading
          label={c(
            copy("01 — STUDIES & TRAINING", "01 — ÉTUDES ET FORMATIONS"),
          )}
        >
          {c(
            copy(
              "Knowledge put into practice.",
              "Des connaissances mises en pratique.",
            ),
          )}
        </SectionHeading>
        <div className="education-grid">
          {studies.map(([label, title, description]) => (
            <article className="value-card" key={title.en}>
              <span>{c(label)}</span>
              <h3>{c(title)}</h3>
              <p>{c(description)}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section dark-section">
        <SectionHeading
          label={c(
            copy("02 — CONTINUOUS LEARNING", "02 — APPRENTISSAGE CONTINU"),
          )}
        >
          {c(copy("Learning by building.", "Apprendre en construisant."))}
        </SectionHeading>
        <div className="story-content">
          <p>
            {c(
              copy(
                "I continue developing my knowledge of cybersecurity, Python automation and web development. My projects give me a place to apply those skills, test ideas and improve through practice.",
                "Je continue à développer mes connaissances en cybersécurité, en automatisation Python et en développement web. Mes projets me permettent d’appliquer ces compétences, de tester mes idées et de progresser par la pratique.",
              ),
            )}
          </p>
        </div>
      </section>
    </main>
  );
}
