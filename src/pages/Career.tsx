import { copy, useCopy } from "../content";
import PageHero, { SectionHeading } from "../components/PageHero";
export default function Career() {
  const c = useCopy();
  const roles = [
    [
      copy("EDUCATION", "ÉDUCATION"),
      copy(
        "Teacher · Graceland International English School",
        "Enseignant · Graceland International English School",
      ),
      copy(
        "Teach school subjects, prepare lesson materials and support pupils’ understanding. Alongside classroom teaching, I tutor English learners of different ages and levels.",
        "J’enseigne différentes matières, je prépare des supports pédagogiques et j’accompagne les élèves. En parallèle, je donne des cours d’anglais à des apprenants d’âges et de niveaux variés.",
      ),
    ],
    [
      copy("DATA & ADMINISTRATION", "DONNÉES ET ADMINISTRATION"),
      copy(
        "Data entry & indexing · Springboard / Bloom",
        "Saisie de données et indexation · Springboard / Bloom",
      ),
      copy(
        "Work with digital records and indexing tasks, applying attention to detail, consistency and organised remote working habits.",
        "Je travaille sur des dossiers numériques et des tâches d’indexation qui demandent précision, régularité et organisation dans le travail à distance.",
      ),
    ],
    [
      copy("ENTREPRENEURSHIP", "ENTREPRENEURIAT"),
      copy(
        "Project development · Katembatic FFF",
        "Développement de projets · Katembatic FFF",
      ),
      copy(
        "Contribute to education, finance and business initiatives, lead KSF and develop websites and digital tools through projects such as KBB and OpenPath.",
        "Je contribue aux initiatives d’éducation, de finance et d’entreprise, je dirige KSF et je développe des sites et des outils numériques à travers KBB et OpenPath notamment.",
      ),
    ],
    [
      copy("SERVICE & LEADERSHIP", "SERVICE ET LEADERSHIP"),
      copy(
        "Missionary service & team coordination",
        "Service missionnaire et coordination d’équipe",
      ),
      copy(
        "Full-time missionary service in Ghana from March 2022 to April 2024 included district leadership and training. My service also includes EnglishConnect teaching and BYU–Pathway support.",
        "Mon service missionnaire à plein temps au Ghana, de mars 2022 à avril 2024, comprenait la direction d’un district et la formation. Mon service inclut également l’enseignement EnglishConnect et l’accompagnement BYU–Pathway.",
      ),
    ],
  ];
  return (
    <main className="page" id="main-content" tabIndex={-1}>
      <PageHero
        label={c(copy("CAREER", "CARRIÈRE"))}
        title={c(copy("Experience with", "Une expérience portée par"))}
        accent={c(copy("responsibility.", "la responsabilité."))}
        description={c(
          copy(
            "A professional journey across teaching, administration, entrepreneurship and service.",
            "Un parcours professionnel entre enseignement, administration, entrepreneuriat et service.",
          ),
        )}
      />
      <section className="section">
        <SectionHeading label={c(copy("01 — EXPERIENCE", "01 — EXPÉRIENCE"))}>
          {c(copy("Where I contribute.", "Mes domaines de contribution."))}
        </SectionHeading>
        <div className="timeline">
          {roles.map(([label, title, body]) => (
            <article className="timeline-item" key={title.en}>
              <span className="timeline-label">{c(label)}</span>
              <h3>{c(title)}</h3>
              <p>{c(body)}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
