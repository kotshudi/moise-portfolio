import { Link } from "react-router-dom";

const projects = [
  {
    id: "ksf",
    number: "01",
    category: "FINANCE",
    title: "Katembatic Solidarity Funds",
    description:
      "A financial initiative focused on helping people save, access responsible financing and build stronger financial habits.",
  },
  {
    id: "openpath",
    number: "02",
    category: "EDUCATION",
    title: "OpenPath",
    description:
      "An education initiative designed to help learners develop practical English communication skills and progress with confidence.",
  },
  {
    id: "ksh",
    number: "03",
    category: "COMMERCE",
    title: "Katembatic Shopping Hub",
    description:
      "A digital shopping initiative connecting customers with products and services through a simple online experience.",
  },
  {
    id: "ktrack",
    number: "04",
    category: "TECHNOLOGY",
    title: "Katembatic Track",
    description:
      "A student progress platform designed to organize learning progress, assignments, skills and performance.",
  },
  {
    id: "kcompass",
    number: "05",
    category: "PRODUCTIVITY",
    title: "K-COMPASS",
    description:
      "A personal productivity concept built around planning, activities, timelines and meaningful daily progress.",
  },
];

export default function Projects() {
  return (
    <main className="page">

      <section className="page-hero">
        <p className="eyebrow">MY PROJECTS</p>

        <h1>
          Ideas turned into
          <span> something real.</span>
        </h1>

        <p className="page-lead">
          A collection of businesses, educational initiatives,
          technology platforms and ideas I am developing.
        </p>
      </section>

      <section className="section">

        <div className="section-heading">
          <p className="section-label">01 — SELECTED WORK</p>

          <h2>
            What I am
            <span> building.</span>
          </h2>
        </div>

        <div className="projects-grid">

          {projects.map((project) => (
            <article className="project-card" key={project.id}>

              <span className="project-number">
                {project.number}
              </span>

              <p className="project-category">
                {project.category}
              </p>

              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <Link to={`/projects/${project.id}`}>
                Explore project →
              </Link>

            </article>
          ))}

        </div>

      </section>

    </main>
  );
}
