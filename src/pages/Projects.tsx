import { useState } from "react";
import { Link } from "react-router-dom";
import { copy, useCopy } from "../content";
import { projects } from "../data/projects";
import PageHero from "../components/PageHero";
export default function Projects() {
  const c = useCopy();
  const [filter, setFilter] = useState("all");
  const items = projects.filter(
    (project) =>
      filter === "all" ||
      (filter === "client" ? project.id === "glies" : project.id !== "glies"),
  );
  return (
    <main className="page" id="main-content" tabIndex={-1}>
      <PageHero
        label={c(copy("MY PROJECTS", "MES PROJETS"))}
        title={c(copy("Ideas with", "Des idées avec"))}
        accent={c(copy("a practical purpose.", "un objectif concret."))}
        description={c(
          copy(
            "Education, business and technology projects I am building, with a clear view of what each one aims to do.",
            "Des projets d’éducation, d’entreprise et de technologie que je développe, avec une vision claire de leur objectif.",
          ),
        )}
      />
      <section className="section">
        <div
          className="project-filters"
          role="group"
          aria-label={c(copy("Filter projects", "Filtrer les projets"))}
        >
          {[
            ["all", copy("All work", "Tous les projets")],
            ["own", copy("Katembatic projects", "Projets Katembatic")],
            ["client", copy("Client work", "Projets clients")],
          ].map(([key, label]) => (
            <button
              type="button"
              key={key as string}
              aria-pressed={filter === key}
              onClick={() => setFilter(key as string)}
            >
              {c(label as ReturnType<typeof copy>)}
            </button>
          ))}
        </div>
        <p className="results-count" aria-live="polite">
          {items.length}{" "}
          {c(
            items.length === 1
              ? copy("project", "projet")
              : copy("projects", "projets"),
          )}
        </p>
        <div className="projects-grid">
          {items.map((project) => (
            <article className="project-card" key={project.id}>
              <p className="project-category">{c(project.category)}</p>
              <span className="status-badge">{c(project.status)}</span>
              <h2>{project.title}</h2>
              <p>{c(project.description)}</p>
              <Link className="text-link" to={`/projects/${project.id}`}>
                {c(copy("Explore project", "Découvrir le projet"))}{" "}
                <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
