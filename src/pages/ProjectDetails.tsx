import { Link, useParams } from "react-router-dom";

const projectData: Record<
  string,
  {
    category: string;
    title: string;
    description: string;
    details: string;
  }
> = {
  ksf: {
    category: "FINANCE",
    title: "Katembatic Solidarity Funds",
    description:
      "A financial initiative focused on saving, responsible financing and financial empowerment.",
    details:
      "KSF is part of the wider Katembatic ecosystem and is designed around practical financial participation and community support.",
  },

  openpath: {
    category: "EDUCATION",
    title: "OpenPath",
    description:
      "An education initiative focused on practical English development.",
    details:
      "OpenPath helps learners develop their English communication skills through structured lessons, assignments and progressive learning.",
  },

  ksh: {
    category: "COMMERCE",
    title: "Katembatic Shopping Hub",
    description:
      "A digital shopping experience for products and services.",
    details:
      "KSH is being developed as part of the Katembatic ecosystem to make shopping and product discovery easier.",
  },

  ktrack: {
    category: "TECHNOLOGY",
    title: "Katembatic Track",
    description:
      "A student progress and learning management platform.",
    details:
      "K-TRACK is designed to help educators monitor student development across multiple learning areas.",
  },

  kcompass: {
    category: "PRODUCTIVITY",
    title: "K-COMPASS",
    description:
      "A productivity and activity planning concept.",
    details:
      "K-COMPASS explores a more complete approach to personal planning, activities and daily progress.",
  },
};

export default function ProjectDetails() {
  const { projectId } = useParams();

  const project = projectData[projectId || ""];

  if (!project) {
    return (
      <main className="page">
        <section className="page-hero">
          <p className="eyebrow">PROJECT</p>
          <h1>
            Project
            <span> not found.</span>
          </h1>
          <Link to="/projects" className="button primary">
            Back to Projects
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page">

      <section className="page-hero">

        <p className="eyebrow">{project.category}</p>

        <h1>
          {project.title}
          <span>.</span>
        </h1>

        <p className="page-lead">
          {project.description}
        </p>

      </section>

      <section className="section">

        <div className="section-heading">
          <p className="section-label">
            PROJECT OVERVIEW
          </p>

          <h2>
            The idea behind
            <span> the project.</span>
          </h2>
        </div>

        <div className="story-content">
          <p>{project.details}</p>
        </div>

        <div className="about-links">
          <Link to="/projects" className="button secondary">
            ← Back to Projects
          </Link>
        </div>

      </section>

    </main>
  );
}
