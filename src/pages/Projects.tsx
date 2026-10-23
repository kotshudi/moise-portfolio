import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { getProjects, type Project } from "../lib/portfolioContent";

const fallbackProjects: Project[] = [
  {
    id: "ksf",
    title: "Katembatic Solidarity Funds",
    tagline: "Finance with purpose.",
    category: "FINANCE",
    description:
      "A solidarity finance initiative designed around structured contributions, responsible lending and community support.",
    technologies: "Web · Firebase · Finance",
    startDate: "",
    endDate: "",
    status: "Active",
    liveUrl: "",
    githubUrl: "",
    featured: true,
    imageUrl: "",
    story: "",
  },
  {
    id: "openpath",
    title: "OpenPath",
    tagline: "Learning that opens doors.",
    category: "EDUCATION",
    description:
      "An education initiative designed to help learners develop practical English communication skills and progress with confidence.",
    technologies: "Education · English · Digital Learning",
    startDate: "",
    endDate: "",
    status: "Active",
    liveUrl: "",
    githubUrl: "",
    featured: true,
    imageUrl: "",
    story: "",
  },
  {
    id: "ksh",
    title: "Katembatic Shopping Hub",
    tagline: "Simple digital commerce.",
    category: "COMMERCE",
    description:
      "A digital shopping initiative connecting customers with products and services through a simple online experience.",
    technologies: "Commerce · Web · Digital Services",
    startDate: "",
    endDate: "",
    status: "Concept",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    imageUrl: "",
    story: "",
  },
  {
    id: "ktrack",
    title: "Katembatic Track",
    tagline: "Progress made visible.",
    category: "TECHNOLOGY",
    description:
      "A student progress platform designed to organize learning progress, assignments, skills and performance.",
    technologies: "React · TypeScript · Firebase",
    startDate: "",
    endDate: "",
    status: "In Development",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    imageUrl: "",
    story: "",
  },
  {
    id: "kcompass",
    title: "K-COMPASS",
    tagline: "Direction for meaningful progress.",
    category: "PRODUCTIVITY",
    description:
      "A personal productivity concept built around planning, activities, timelines and meaningful daily progress.",
    technologies: "React · TypeScript · Productivity",
    startDate: "",
    endDate: "",
    status: "Concept",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    imageUrl: "",
    story: "",
  },
  {
    id: "kbb",
    title: "Katembatic Business Boost",
    tagline: "Helping businesses build their digital presence.",
    category: "SERVICE",
    description:
      "A business service initiative focused on helping local businesses establish professional websites and stronger digital identities.",
    technologies: "Web Development · Business · Digital Strategy",
    startDate: "",
    endDate: "",
    status: "Active",
    liveUrl: "",
    githubUrl: "",
    featured: true,
    imageUrl: "",
    story: "",
  },
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);

  useEffect(() => {
    let mounted = true;

    getProjects().then((data) => {
      if (mounted && data.length > 0) {
        setProjects(data);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">SELECTED WORK</p>
          <h1>Projects built with purpose.</h1>
          <p>
            A collection of initiatives, products and digital systems built
            across education, business, technology and community development.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.id}>
                {project.imageUrl && (
                  <div className="project-card-image">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="project-card-content">
                  <span className="project-category">
                    {project.category}
                  </span>

                  <h2>{project.title}</h2>

                  {project.tagline && <h3>{project.tagline}</h3>}

                  <p>{project.description}</p>

                  <Link to={`/projects/${project.id}`} className="project-link">
                    Explore project
                    <ArrowUpRight size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
