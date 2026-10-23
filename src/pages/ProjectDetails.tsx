import { Link, useParams } from "react-router-dom";
import { copy, useCopy } from "../content";
import { projects } from "../data/projects";
import PageHero, { SectionHeading } from "../components/PageHero";
export default function ProjectDetails() {
  const { projectId } = useParams();
  const c = useCopy();
  const project = projects.find((item) => item.id === projectId);
  if (!project)
    return (
      <main className="page" id="main-content" tabIndex={-1}>
        <PageHero
          label="404"
          title={c(copy("Project", "Projet"))}
          accent={c(copy("not found.", "introuvable."))}
          description={c(
            copy(
              "This project is not in the portfolio.",
              "Ce projet ne figure pas dans le portfolio.",
            ),
          )}
        />
        <section className="section">
          <Link className="button primary" to="/projects">
            {c(copy("Back to projects", "Retour aux projets"))}
          </Link>
        </section>
      </main>
    );
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <main className="page" id="main-content" tabIndex={-1}>
      <PageHero
        label={c(project.category)}
        title={project.title}
        accent=""
        description={c(project.description)}
      />
      <section className="section project-overview">
        <div>
          <SectionHeading
            label={c(copy("PROJECT OVERVIEW", "PRÉSENTATION DU PROJET"))}
          >
            {c(
              copy(
                "The purpose behind the work.",
                "L’objectif derrière le projet.",
              ),
            )}
          </SectionHeading>
          <div className="story-content">
            <p>{c(project.details)}</p>
          </div>
          <Link className="text-link" to="/contact">
            {c(copy("Discuss this project", "Parlons de ce projet"))} →
          </Link>
        </div>
        <aside className="project-facts">
          <span className="status-badge">{c(project.status)}</span>
          <h2>{c(copy("Areas of focus", "Axes de travail"))}</h2>
          <ul>
            {project.features.map((feature) => (
              <li key={feature.en}>{c(feature)}</li>
            ))}
          </ul>
        </aside>
      </section>
      <section className="section project-pagination">
        <Link to="/projects">
          ← {c(copy("All projects", "Tous les projets"))}
        </Link>
        <Link to={`/projects/${next.id}`}>{next.title} →</Link>
      </section>
    </main>
  );
}
