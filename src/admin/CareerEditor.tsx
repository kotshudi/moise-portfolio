import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import "./CareerEditor.css";

type CareerEntry = {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string;
};

const emptyCareer: CareerEntry = {
  id: "",
  company: "",
  position: "",
  location: "",
  startDate: "",
  endDate: "",
  description: "",
  achievements: "",
};

export default function CareerEditor() {
  const [careers, setCareers] = useState<CareerEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadCareer = async () => {
      try {
        const snapshot = await getDoc(doc(db, "career", "main"));

        if (snapshot.exists()) {
          const data = snapshot.data();

          setCareers(
            Array.isArray(data.entries)
              ? (data.entries as CareerEntry[])
              : []
          );
        }
      } catch (error) {
        console.error("Error loading career:", error);
        setMessage("Could not load career information.");
      } finally {
        setLoading(false);
      }
    };

    loadCareer();
  }, []);

  const updateCareer = (
    id: string,
    field: keyof CareerEntry,
    value: string
  ) => {
    setCareers((current) =>
      current.map((career) =>
        career.id === id
          ? { ...career, [field]: value }
          : career
      )
    );
  };

  const addCareer = () => {
    setMessage("");

    setCareers((current) => [
      ...current,
      {
        ...emptyCareer,
        id: crypto.randomUUID(),
      },
    ]);
  };

  const deleteCareer = (id: string) => {
    setCareers((current) =>
      current.filter((career) => career.id !== id)
    );

    setMessage("");
  };

  const saveCareer = async () => {
    setSaving(true);
    setMessage("");

    try {
      await setDoc(doc(db, "career", "main"), {
        entries: careers,
      });

      setMessage("Career information saved successfully.");
    } catch (error) {
      console.error("Error saving career:", error);
      setMessage("Could not save career information.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="career-editor-page">
        <div className="career-editor-loading">
          Loading career information...
        </div>
      </main>
    );
  }

  return (
    <main className="career-editor-page">
      <header className="career-editor-header">
        <div>
          <span className="career-editor-eyebrow">
            ADMIN CMS / CAREER
          </span>

          <h1>Career</h1>

          <p>
            Add and manage your professional experience.
          </p>
        </div>

        <button
          type="button"
          className="career-add-button"
          onClick={addCareer}
        >
          + ADD POSITION
        </button>
      </header>

      {careers.length === 0 && (
        <div className="career-empty">
          <div className="career-empty-icon">◆</div>

          <h2>No career entries yet.</h2>

          <p>
            Add your first professional position to begin building
            your career timeline.
          </p>

          <button
            type="button"
            onClick={addCareer}
            className="career-primary-button"
          >
            ADD YOUR FIRST POSITION
          </button>
        </div>
      )}

      <div className="career-list">
        {careers.map((career, index) => (
          <section className="career-card" key={career.id}>
            <div className="career-card-header">
              <div>
                <span className="career-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h2>
                  {career.position || "New Position"}
                </h2>
              </div>

              <button
                type="button"
                className="career-delete-button"
                onClick={() => deleteCareer(career.id)}
              >
                DELETE
              </button>
            </div>

            <div className="career-grid">
              <div className="career-field">
                <label>Company / Organization</label>

                <input
                  value={career.company}
                  onChange={(e) =>
                    updateCareer(
                      career.id,
                      "company",
                      e.target.value
                    )
                  }
                  placeholder="Company or organization"
                />
              </div>

              <div className="career-field">
                <label>Position / Role</label>

                <input
                  value={career.position}
                  onChange={(e) =>
                    updateCareer(
                      career.id,
                      "position",
                      e.target.value
                    )
                  }
                  placeholder="Your position"
                />
              </div>

              <div className="career-field">
                <label>Location</label>

                <input
                  value={career.location}
                  onChange={(e) =>
                    updateCareer(
                      career.id,
                      "location",
                      e.target.value
                    )
                  }
                  placeholder="Kinshasa, DRC"
                />
              </div>

              <div className="career-field">
                <label>Start Date</label>

                <input
                  value={career.startDate}
                  onChange={(e) =>
                    updateCareer(
                      career.id,
                      "startDate",
                      e.target.value
                    )
                  }
                  placeholder="October 2024"
                />
              </div>

              <div className="career-field">
                <label>End Date</label>

                <input
                  value={career.endDate}
                  onChange={(e) =>
                    updateCareer(
                      career.id,
                      "endDate",
                      e.target.value
                    )
                  }
                  placeholder="Present"
                />
              </div>
            </div>

            <div className="career-field career-full">
              <label>Description</label>

              <textarea
                rows={5}
                value={career.description}
                onChange={(e) =>
                  updateCareer(
                    career.id,
                    "description",
                    e.target.value
                  )
                }
                placeholder="Describe your responsibilities and role..."
              />
            </div>

            <div className="career-field career-full">
              <label>Key Achievements</label>

              <textarea
                rows={5}
                value={career.achievements}
                onChange={(e) =>
                  updateCareer(
                    career.id,
                    "achievements",
                    e.target.value
                  )
                }
                placeholder="List your major achievements..."
              />
            </div>
          </section>
        ))}
      </div>

      {careers.length > 0 && (
        <div className="career-editor-footer">
          {message && (
            <span className="career-message">
              {message}
            </span>
          )}

          <button
            type="button"
            className="career-save-button"
            onClick={saveCareer}
            disabled={saving}
          >
            {saving ? "SAVING..." : "SAVE CAREER"}
          </button>
        </div>
      )}
    </main>
  );
}
