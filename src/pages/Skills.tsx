import { copy, useCopy } from "../content";
import PageHero, { SectionHeading } from "../components/PageHero";
export default function Skills() {
  const c = useCopy();
  const skills = [
    [
      copy("Teaching & learning", "Enseignement et apprentissage"),
      copy(
        "English tutoring, lesson preparation, classroom teaching and learner support.",
        "Cours d’anglais, préparation des leçons, enseignement scolaire et accompagnement des apprenants.",
      ),
    ],
    [
      copy("Business & organisation", "Gestion et organisation"),
      copy(
        "Project planning, budgeting, reporting and entrepreneurial problem-solving.",
        "Planification de projets, budgets, rapports et résolution de problèmes entrepreneuriaux.",
      ),
    ],
    [
      copy("Web development", "Développement web"),
      copy(
        "React, TypeScript and JavaScript interfaces, with Firebase and Express project experience.",
        "Interfaces React, TypeScript et JavaScript, avec une expérience de projets Firebase et Express.",
      ),
    ],
    [
      copy("Data & administration", "Données et administration"),
      copy(
        "Data entry, indexing, Microsoft tools, spreadsheets and careful record management.",
        "Saisie de données, indexation, outils Microsoft, feuilles de calcul et gestion rigoureuse des dossiers.",
      ),
    ],
    [
      copy("Python & automation", "Python et automatisation"),
      copy(
        "Practical scripts for reporting, data processing and preparing digital assets.",
        "Scripts pratiques pour les rapports, le traitement de données et la préparation de ressources numériques.",
      ),
    ],
    [
      copy("Communication & leadership", "Communication et leadership"),
      copy(
        "Training, team coordination and communication in English, French and Lingala.",
        "Formation, coordination d’équipe et communication en anglais, français et lingala.",
      ),
    ],
  ];
  return (
    <main className="page" id="main-content" tabIndex={-1}>
      <PageHero
        label={c(copy("SKILLS", "COMPÉTENCES"))}
        title={c(copy("What I bring", "Ce que je peux"))}
        accent={c(copy("to the work.", "apporter."))}
        description={c(
          copy(
            "Human skills, business knowledge and technical practice, developed through study and real responsibilities.",
            "Des compétences humaines, commerciales et techniques développées par les études et des responsabilités concrètes.",
          ),
        )}
      />
      <section className="section">
        <SectionHeading
          label={c(copy("01 — CAPABILITIES", "01 — SAVOIR-FAIRE"))}
        >
          {c(
            copy(
              "Skills built through practice.",
              "Des compétences issues de la pratique.",
            ),
          )}
        </SectionHeading>
        <div className="skills-grid">
          {skills.map(([title, description], i) => (
            <article className="skill-card" key={title.en}>
              <span className="project-number">0{i + 1}</span>
              <div>
                <h3>{c(title)}</h3>
                <p>{c(description)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
