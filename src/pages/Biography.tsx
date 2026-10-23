import { copy, useCopy } from "../content";
import PageHero, { SectionHeading } from "../components/PageHero";
import photo from "../assets/images/moise-1.jpg";
export default function Biography() {
  const c = useCopy();
  const milestones = [
    [
      copy("EARLY YEARS", "LES DÉBUTS"),
      copy(
        "Learning with the resources I had",
        "Apprendre avec les moyens disponibles",
      ),
      copy(
        "Teaching myself the piano helped me develop patience and curiosity. It taught me that limited resources can change the way I learn without ending the desire to create.",
        "Apprendre le piano par moi-même m’a aidé à développer la patience et la curiosité. Cette expérience m’a appris que des moyens limités peuvent changer ma manière d’apprendre sans éteindre mon envie de créer.",
      ),
    ],
    [
      copy("2020–2022", "2020–2022"),
      copy("Learning to teach and lead", "Apprendre à enseigner et à diriger"),
      copy(
        "As a seminary teacher, I prepared lessons and worked with groups of more than forty students. That experience strengthened my interest in helping people understand and grow.",
        "En tant qu’instructeur de séminaire, je préparais les leçons et travaillais avec des groupes de plus de quarante élèves. Cette expérience a renforcé mon intérêt pour l’apprentissage et le développement des autres.",
      ),
    ],
    [
      copy("2022–2024", "2022–2024"),
      copy("Service in Ghana", "Le service au Ghana"),
      copy(
        "I served as a full-time missionary in the Ghana Accra West Mission, including responsibilities as a district leader. Working with people from different backgrounds helped me develop communication, discipline and leadership.",
        "J’ai servi comme missionnaire à plein temps dans la mission de Ghana Accra Ouest, notamment comme dirigeant de district. Travailler avec des personnes de différents horizons m’a aidé à développer ma communication, ma discipline et mon leadership.",
      ),
    ],
    [
      copy("TODAY", "AUJOURD’HUI"),
      copy(
        "Connecting teaching, business and technology",
        "Relier l’enseignement, les affaires et la technologie",
      ),
      copy(
        "Back in Kinshasa, I teach, tutor and continue my studies while developing Katembatic projects. I want the skills I gain to become useful tools and opportunities for others.",
        "De retour à Kinshasa, j’enseigne, je donne des cours particuliers et je poursuis mes études tout en développant les projets Katembatic. Je souhaite transformer mes compétences en outils et en opportunités utiles aux autres.",
      ),
    ],
  ];
  return (
    <main className="page" id="main-content" tabIndex={-1}>
      <PageHero
        label={c(copy("MY STORY", "MON HISTOIRE"))}
        title={c(copy("The journey behind", "Le parcours derrière"))}
        accent={c(copy("the work.", "mes projets."))}
        description={c(
          copy(
            "Learning independently, serving others and building a direction one experience at a time.",
            "Apprendre par soi-même, servir les autres et construire son parcours, une expérience à la fois.",
          ),
        )}
      />
      <section className="section story-intro">
        <div>
          <SectionHeading
            label={c(copy("01 — MY JOURNEY", "01 — MON PARCOURS"))}
          >
            {c(
              copy(
                "Curiosity became a way forward.",
                "La curiosité est devenue un chemin.",
              ),
            )}
          </SectionHeading>
          <p className="about-text">
            {c(
              copy(
                "My path has not stayed inside one profession. Education, service, business and technology each taught me something about responsibility. Together, they shape how I work: understand the need, keep learning and make something useful.",
                "Mon parcours ne se limite pas à un seul métier. L’éducation, le service, les affaires et la technologie m’ont chacun appris quelque chose sur la responsabilité. Ensemble, ils guident ma façon de travailler : comprendre le besoin, continuer à apprendre et créer quelque chose d’utile.",
              ),
            )}
          </p>
        </div>
        <img
          src={photo}
          alt={c(copy("Moise Katemba", "Moise Katemba"))}
          loading="lazy"
        />
      </section>
      <section className="section dark-section">
        <SectionHeading label={c(copy("02 — MILESTONES", "02 — ÉTAPES CLÉS"))}>
          {c(
            copy(
              "Experiences that shaped my direction.",
              "Les expériences qui ont façonné mon parcours.",
            ),
          )}
        </SectionHeading>
        <div className="timeline">
          {milestones.map(([label, title, body]) => (
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
