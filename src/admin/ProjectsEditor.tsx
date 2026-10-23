import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import "./ProjectsEditor.css";

type Project = {
  id: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  technologies: string;
  startDate: string;
  endDate: string;
  status: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  imageUrl: string;
  story: string;
};

const emptyProject = (): Project => ({
  id: crypto.randomUUID(),
  title: "",
  tagline: "",
  category: "",
  description: "",
  technologies: "",
  startDate: "",
  endDate: "",
  status: "Completed",
  liveUrl: "",
  githubUrl: "",
  featured: false,
  imageUrl: "",
  story: "",
});

export default function ProjectsEditor() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const snapshot = await getDoc(doc(db, "projects", "main"));

        if (snapshot.exists()) {
          const data = snapshot.data();

          setProjects(
            Array.isArray(data.entries) ? data.entries : []
          );
        }
      } catch (error) {
        console.error("PROJECT LOAD ERROR:", error);
        setMessage("Could not load your projects.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const updateProject = (
    id: string,
    field: keyof Project,
    value: string | boolean
  ) => {
    setProjects((current) =>
      current.map((project) =>
        project.id === id
          ? { ...project, [field]: value }
          : project
      )
    );
  };

  const addProject = () => {
    setProjects((current) => [...current, emptyProject()]);
    setMessage("");
  };

  const deleteProject = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    setProjects((current) =>
      current.filter((project) => project.id !== id)
    );
  };

  const saveProjects = async () => {
    setSaving(true);
    setMessage("");

    try {
      await setDoc(
        doc(db, "projects", "main"),
        {
          entries: projects,
        },
        { merge: true }
      );

      setMessage("Projects saved successfully.");
    } catch (error) {
      console.error("PROJECT SAVE ERROR:", error);
      setMessage("Could not save your projects.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="projects-editor-page">
        <div className="projects-loading">
          Loading your projects...
        </div>
      </main>
    );
  }

  return (
    <main className="projects-editor-page">
      <section className="projects-editor-header">
        <div>
          <p className="projects-eyebrow">ADMIN CMS</p>

          <h1>
            My <span>Projects.</span>
          </h1>

          <p className="projects-subtitle">
            Build and manage the projects displayed on your
            personal portfolio.
          </p>
        </div>

        <button
          type="button"
          className="projects-add-button"
          onClick={addProject}
        >
          + ADD PROJECT
        </button>
      </section>

      {message && (
        <div className="projects-message">
          {message}
        </div>
      )}

      {projects.length === 0 && (
        <section className="projects-empty">
          <div className="projects-empty-icon">▣</div>

          <h2>No projects yet.</h2>

          <p>
            Add your first project and start building your
            portfolio.
          </p>

          <button
            type="button"
            onClick={addProject}
          >
            CREATE FIRST PROJECT
          </button>
        </section>
      )}

      <div className="projects-list">
        {projects.map((project, index) => (
          <article
            key={project.id}
            className="project-editor-card"
          >
            <div className="project-card-header">
              <div>
                <span className="project-number">
                  PROJECT {String(index + 1).padStart(2, "0")}
                </span>

                <h2>
                  {project.title || "Untitled Project"}
                </h2>
              </div>

              <button
                type="button"
                className="project-delete-button"
                onClick={() => deleteProject(project.id)}
              >
                DELETE
              </button>
            </div>

            <div className="project-form-grid">
              <div className="project-field">
                <label>Project Title</label>

                <input
                  type="text"
                  value={project.title}
                  placeholder="Example: Katembatic Track"
                  onChange={(e) =>
                    updateProject(
                      project.id,
                      "title",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="project-field">
                <label>Tagline</label>

                <input
                  type="text"
                  value={project.tagline}
                  placeholder="A short description of the project"
                  onChange={(e) =>
                    updateProject(
                      project.id,
                      "tagline",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="project-field">
                <label>Category</label>

                <input
                  type="text"
                  value={project.category}
                  placeholder="Web App, Education, Finance..."
                  onChange={(e) =>
                    updateProject(
                      project.id,
                      "category",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="project-field">
                <label>Status</label>

                <select
                  value={project.status}
                  onChange={(e) =>
                    updateProject(
                      project.id,
                      "status",
                      e.target.value
                    )
                  }
                >
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Planned">Planned</option>
                  <option value="Paused">Paused</option>
                </select>
              </div>

              <div className="project-field">
                <label>Start Date</label>

                <input
                  type="date"
                  value={project.startDate}
                  onChange={(e) =>
                    updateProject(
                      project.id,
                      "startDate",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="project-field">
                <label>End Date</label>

                <input
                  type="date"
                  value={project.endDate}
                  onChange={(e) =>
                    updateProject(
                      project.id,
                      "endDate",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="project-field full-width">
                <label>Technologies / Stack</label>

                <input
                  type="text"
                  value={project.technologies}
                  placeholder="React, TypeScript, Firebase, Node.js..."
                  onChange={(e) =>
                    updateProject(
                      project.id,
                      "technologies",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="project-field full-width">
                <label>Short Description</label>

                <textarea
                  value={project.description}
                  placeholder="Describe what this project does..."
                  rows={5}
                  onChange={(e) =>
                    updateProject(
                      project.id,
                      "description",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="project-field">
                <label>Live Website URL</label>

                <input
                  type="url"
                  value={project.liveUrl}
                  placeholder="https://example.com"
                  onChange={(e) =>
                    updateProject(
                      project.id,
                      "liveUrl",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="project-field">
                <label>GitHub URL</label>

                <input
                  type="url"
                  value={project.githubUrl}
                  placeholder="https://github.com/..."
                  onChange={(e) =>
                    updateProject(
                      project.id,
                      "githubUrl",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="project-field full-width">
                <label>Project Image URL</label>

                <input
                  type="url"
                  value={project.imageUrl}
                  placeholder="https://..."
                  onChange={(e) =>
                    updateProject(
                      project.id,
                      "imageUrl",
                      e.target.value
                    )
                  }
                />

                <small>
                  We will connect this to Firebase Storage later
                  so you can upload images directly.
                </small>
              </div>

              <div className="project-field full-width">
                <label>Detailed Project Story</label>

                <textarea
                  value={project.story}
                  placeholder="Explain the problem, your solution, your role, challenges, results, and lessons learned..."
                  rows={8}
                  onChange={(e) =>
                    updateProject(
                      project.id,
                      "story",
                      e.target.value
                    )
                  }
                />
              </div>

              <label className="project-featured">
                <input
                  type="checkbox"
                  checked={project.featured}
                  onChange={(e) =>
                    updateProject(
                      project.id,
                      "featured",
                      e.target.checked
                    )
                  }
                />

                <span>
                  Featured Project
                </span>
              </label>
            </div>
          </article>
        ))}
      </div>

      {projects.length > 0 && (
        <div className="projects-save-area">
          <button
            type="button"
            className="projects-save-button"
            onClick={saveProjects}
            disabled={saving}
          >
            {saving ? "SAVING..." : "SAVE PROJECTS"}
          </button>
        </div>
      )}
    </main>
  );
}
