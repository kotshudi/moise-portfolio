import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import "./SkillsEditor.css";

type Skill = {
  id: string;
  name: string;
  category: string;
  level: number;
  description: string;
};

const createSkill = (): Skill => ({
  id: crypto.randomUUID(),
  name: "",
  category: "Technical",
  level: 80,
  description: "",
});

export default function SkillsEditor() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const snapshot = await getDoc(doc(db, "skills", "main"));

        if (snapshot.exists()) {
          const data = snapshot.data();

          setSkills(
            Array.isArray(data.entries) ? data.entries : []
          );
        }
      } catch (error) {
        console.error("SKILLS LOAD ERROR:", error);
        setMessage("Could not load your skills.");
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

  const updateSkill = (
    id: string,
    field: keyof Skill,
    value: string | number
  ) => {
    setSkills((current) =>
      current.map((skill) =>
        skill.id === id
          ? { ...skill, [field]: value }
          : skill
      )
    );
  };

  const addSkill = () => {
    setSkills((current) => [...current, createSkill()]);
    setMessage("");
  };

  const deleteSkill = (id: string) => {
    if (!window.confirm("Delete this skill?")) return;

    setSkills((current) =>
      current.filter((skill) => skill.id !== id)
    );
  };

  const saveSkills = async () => {
    setSaving(true);
    setMessage("");

    try {
      await setDoc(
        doc(db, "skills", "main"),
        {
          entries: skills,
        },
        { merge: true }
      );

      setMessage("Skills saved successfully.");
    } catch (error) {
      console.error("SKILLS SAVE ERROR:", error);
      setMessage("Could not save your skills.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="skills-editor-page">
        <div className="skills-loading">
          Loading your skills...
        </div>
      </main>
    );
  }

  return (
    <main className="skills-editor-page">
      <section className="skills-editor-header">
        <div>
          <p className="skills-eyebrow">ADMIN CMS</p>

          <h1>
            My <span>Skills.</span>
          </h1>

          <p className="skills-subtitle">
            Manage the technical, professional, and personal
            skills displayed on your portfolio.
          </p>
        </div>

        <button
          type="button"
          className="skills-add-button"
          onClick={addSkill}
        >
          + ADD SKILL
        </button>
      </section>

      {message && (
        <div className="skills-message">
          {message}
        </div>
      )}

      {skills.length === 0 && (
        <section className="skills-empty">
          <div className="skills-empty-icon">◈</div>

          <h2>No skills yet.</h2>

          <p>
            Add your first skill to start building your
            professional profile.
          </p>

          <button
            type="button"
            onClick={addSkill}
          >
            CREATE FIRST SKILL
          </button>
        </section>
      )}

      <div className="skills-list">
        {skills.map((skill, index) => (
          <article
            key={skill.id}
            className="skill-editor-card"
          >
            <div className="skill-card-header">
              <div>
                <span className="skill-number">
                  SKILL {String(index + 1).padStart(2, "0")}
                </span>

                <h2>
                  {skill.name || "Untitled Skill"}
                </h2>
              </div>

              <button
                type="button"
                className="skill-delete-button"
                onClick={() => deleteSkill(skill.id)}
              >
                DELETE
              </button>
            </div>

            <div className="skill-form-grid">
              <div className="skill-field">
                <label>Skill Name</label>

                <input
                  type="text"
                  value={skill.name}
                  placeholder="Example: React"
                  onChange={(e) =>
                    updateSkill(
                      skill.id,
                      "name",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="skill-field">
                <label>Category</label>

                <select
                  value={skill.category}
                  onChange={(e) =>
                    updateSkill(
                      skill.id,
                      "category",
                      e.target.value
                    )
                  }
                >
                  <option value="Technical">Technical</option>
                  <option value="Business">Business</option>
                  <option value="Leadership">Leadership</option>
                  <option value="Communication">Communication</option>
                  <option value="Education">Education</option>
                  <option value="Creative">Creative</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="skill-field skill-level-field">
                <label>
                  Proficiency: {skill.level}%
                </label>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={skill.level}
                  onChange={(e) =>
                    updateSkill(
                      skill.id,
                      "level",
                      Number(e.target.value)
                    )
                  }
                />

                <div className="skill-level-scale">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Expert</span>
                </div>
              </div>

              <div className="skill-field full-width">
                <label>Description</label>

                <textarea
                  rows={4}
                  value={skill.description}
                  placeholder="Describe your experience with this skill..."
                  onChange={(e) =>
                    updateSkill(
                      skill.id,
                      "description",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          </article>
        ))}
      </div>

      {skills.length > 0 && (
        <div className="skills-save-area">
          <button
            type="button"
            className="skills-save-button"
            onClick={saveSkills}
            disabled={saving}
          >
            {saving ? "SAVING..." : "SAVE SKILLS"}
          </button>
        </div>
      )}
    </main>
  );
}
