import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import "./EducationEditor.css";

type EducationEntry = {
  id: string;
  institution: string;
  program: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string;
};

const createEmptyEducation = (): EducationEntry => ({
  id: crypto.randomUUID(),
  institution: "",
  program: "",
  location: "",
  startDate: "",
  endDate: "",
  description: "",
  achievements: "",
});

export default function EducationEditor() {
  const [education, setEducation] = useState<EducationEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadEducation = async () => {
      try {
        const educationRef = doc(db, "education", "main");
        const snapshot = await getDoc(educationRef);

        if (snapshot.exists()) {
          const data = snapshot.data();

          if (Array.isArray(data.entries)) {
            setEducation(data.entries as EducationEntry[]);
          }
        }
      } catch (error) {
        console.error("Error loading education:", error);
        setMessage("Could not load education data.");
      } finally {
        setLoading(false);
      }
    };

    loadEducation();
  }, []);

  const updateEducation = (
    id: string,
    field: keyof EducationEntry,
    value: string
  ) => {
    setEducation((current) =>
      current.map((entry) =>
        entry.id === id
          ? {
              ...entry,
              [field]: value,
            }
          : entry
      )
    );
  };

  const addEducation = () => {
    setEducation((current) => [
      ...current,
      createEmptyEducation(),
    ]);
  };

  const deleteEducation = (id: string) => {
    setEducation((current) =>
      current.filter((entry) => entry.id !== id)
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      await setDoc(
        doc(db, "education", "main"),
        {
          entries: education,
        },
        {
          merge: true,
        }
      );

      setMessage("Education saved successfully.");
    } catch (error) {
      console.error("Error saving education:", error);
      setMessage(
        "Could not save education. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="education-editor-page">
        <div className="education-editor-loading">
          Loading education...
        </div>
      </main>
    );
  }

  return (
    <main className="education-editor-page">
      <header className="education-editor-header">
        <div>
          <span className="education-editor-eyebrow">
            ADMIN CMS / EDUCATION
          </span>

          <h1>Education</h1>

          <p>
            Manage your academic background, programs,
            certificates and educational achievements.
          </p>
        </div>

        <button
          type="button"
          className="education-add-button"
          onClick={addEducation}
        >
          + ADD EDUCATION
        </button>
      </header>

      <div className="education-editor-list">
        {education.length === 0 ? (
          <div className="education-empty">
            <span>◇</span>

            <h2>No education entries yet.</h2>

            <p>
              Add your first institution, program or
              qualification.
            </p>

            <button
              type="button"
              onClick={addEducation}
            >
              ADD FIRST ENTRY
            </button>
          </div>
        ) : (
          education.map((entry, index) => (
            <section
              className="education-editor-card"
              key={entry.id}
            >
              <div className="education-card-header">
                <div>
                  <span className="education-card-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h2>
                    {entry.institution ||
                      "New Education Entry"}
                  </h2>
                </div>

                <button
                  type="button"
                  className="education-delete-button"
                  onClick={() =>
                    deleteEducation(entry.id)
                  }
                >
                  DELETE
                </button>
              </div>

              <div className="education-editor-grid">
                <div className="education-field">
                  <label htmlFor={`institution-${entry.id}`}>
                    Institution
                  </label>

                  <input
                    id={`institution-${entry.id}`}
                    value={entry.institution}
                    onChange={(e) =>
                      updateEducation(
                        entry.id,
                        "institution",
                        e.target.value
                      )
                    }
                    placeholder="University, school or institution"
                  />
                </div>

                <div className="education-field">
                  <label htmlFor={`program-${entry.id}`}>
                    Program / Degree
                  </label>

                  <input
                    id={`program-${entry.id}`}
                    value={entry.program}
                    onChange={(e) =>
                      updateEducation(
                        entry.id,
                        "program",
                        e.target.value
                      )
                    }
                    placeholder="Applied Business Management..."
                  />
                </div>

                <div className="education-field">
                  <label htmlFor={`location-${entry.id}`}>
                    Location
                  </label>

                  <input
                    id={`location-${entry.id}`}
                    value={entry.location}
                    onChange={(e) =>
                      updateEducation(
                        entry.id,
                        "location",
                        e.target.value
                      )
                    }
                    placeholder="Kinshasa, DRC"
                  />
                </div>

                <div className="education-field">
                  <label htmlFor={`start-${entry.id}`}>
                    Start Date
                  </label>

                  <input
                    id={`start-${entry.id}`}
                    value={entry.startDate}
                    onChange={(e) =>
                      updateEducation(
                        entry.id,
                        "startDate",
                        e.target.value
                      )
                    }
                    placeholder="2024"
                  />
                </div>

                <div className="education-field">
                  <label htmlFor={`end-${entry.id}`}>
                    End Date
                  </label>

                  <input
                    id={`end-${entry.id}`}
                    value={entry.endDate}
                    onChange={(e) =>
                      updateEducation(
                        entry.id,
                        "endDate",
                        e.target.value
                      )
                    }
                    placeholder="Present"
                  />
                </div>
              </div>

              <div className="education-editor-section">
                <span className="education-editor-label">
                  DESCRIPTION
                </span>

                <div className="education-field">
                  <textarea
                    rows={5}
                    value={entry.description}
                    onChange={(e) =>
                      updateEducation(
                        entry.id,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Describe your studies, focus areas and experience..."
                  />
                </div>
              </div>

              <div className="education-editor-section">
                <span className="education-editor-label">
                  ACHIEVEMENTS
                </span>

                <div className="education-field">
                  <textarea
                    rows={4}
                    value={entry.achievements}
                    onChange={(e) =>
                      updateEducation(
                        entry.id,
                        "achievements",
                        e.target.value
                      )
                    }
                    placeholder="Certificates, awards, projects, accomplishments..."
                  />
                </div>
              </div>
            </section>
          ))
        )}
      </div>

      {education.length > 0 && (
        <div className="education-editor-actions">
          {message && (
            <span className="education-editor-message">
              {message}
            </span>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
          >
            {saving
              ? "SAVING..."
              : "SAVE EDUCATION"}
          </button>
        </div>
      )}
    </main>
  );
}
