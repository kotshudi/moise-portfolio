import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import "./StoryEditor.css";

type StoryData = {
  headline: string;
  introduction: string;
  journey: string;
  mission: string;
  vision: string;
  values: string;
};

const defaultStory: StoryData = {
  headline: "",
  introduction: "",
  journey: "",
  mission: "",
  vision: "",
  values: "",
};

export default function StoryEditor() {
  const [story, setStory] = useState<StoryData>(defaultStory);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadStory = async () => {
      try {
        const storyRef = doc(db, "biography", "main");
        const snapshot = await getDoc(storyRef);

        if (snapshot.exists()) {
          setStory({
            ...defaultStory,
            ...(snapshot.data() as Partial<StoryData>),
          });
        }
      } catch (error) {
        console.error("Error loading story:", error);
        setMessage("Could not load your story.");
      } finally {
        setLoading(false);
      }
    };

    loadStory();
  }, []);

  const handleChange = (
    field: keyof StoryData,
    value: string
  ) => {
    setStory((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      await setDoc(
        doc(db, "biography", "main"),
        story,
        { merge: true }
      );

      setMessage("Your story was saved successfully.");
    } catch (error) {
      console.error("Error saving story:", error);
      setMessage("Could not save your story.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="story-editor-page">
        <div className="story-editor-loading">
          Loading your story...
        </div>
      </main>
    );
  }

  return (
    <main className="story-editor-page">
      <header className="story-editor-header">
        <span className="story-editor-eyebrow">
          ADMIN CMS / MY STORY
        </span>

        <h1>My Story</h1>

        <p>
          Tell your story, explain your journey and define
          the mission and vision behind your work.
        </p>
      </header>

      <section className="story-editor-card">
        <div className="story-editor-section">
          <span className="story-editor-label">
            INTRODUCTION
          </span>

          <div className="story-field">
            <label htmlFor="headline">
              Story Headline
            </label>

            <input
              id="headline"
              value={story.headline}
              onChange={(e) =>
                handleChange("headline", e.target.value)
              }
              placeholder="Building a life of purpose..."
            />
          </div>

          <div className="story-field">
            <label htmlFor="introduction">
              Introduction
            </label>

            <textarea
              id="introduction"
              rows={6}
              value={story.introduction}
              onChange={(e) =>
                handleChange(
                  "introduction",
                  e.target.value
                )
              }
              placeholder="Introduce yourself and who you are..."
            />
          </div>
        </div>

        <div className="story-editor-section">
          <span className="story-editor-label">
            YOUR JOURNEY
          </span>

          <div className="story-field">
            <label htmlFor="journey">
              My Journey
            </label>

            <textarea
              id="journey"
              rows={10}
              value={story.journey}
              onChange={(e) =>
                handleChange("journey", e.target.value)
              }
              placeholder="Tell the story of your education, work, challenges, growth and experiences..."
            />
          </div>
        </div>

        <div className="story-editor-grid">
          <div className="story-editor-section">
            <span className="story-editor-label">
              MISSION
            </span>

            <div className="story-field">
              <label htmlFor="mission">
                Mission
              </label>

              <textarea
                id="mission"
                rows={7}
                value={story.mission}
                onChange={(e) =>
                  handleChange(
                    "mission",
                    e.target.value
                  )
                }
                placeholder="What drives your work?"
              />
            </div>
          </div>

          <div className="story-editor-section">
            <span className="story-editor-label">
              VISION
            </span>

            <div className="story-field">
              <label htmlFor="vision">
                Vision
              </label>

              <textarea
                id="vision"
                rows={7}
                value={story.vision}
                onChange={(e) =>
                  handleChange(
                    "vision",
                    e.target.value
                  )
                }
                placeholder="What future are you trying to create?"
              />
            </div>
          </div>
        </div>

        <div className="story-editor-section">
          <span className="story-editor-label">
            VALUES
          </span>

          <div className="story-field">
            <label htmlFor="values">
              Core Values
            </label>

            <textarea
              id="values"
              rows={7}
              value={story.values}
              onChange={(e) =>
                handleChange("values", e.target.value)
              }
              placeholder="Describe the principles that guide you..."
            />
          </div>
        </div>

        <div className="story-editor-actions">
          {message && (
            <span className="story-editor-message">
              {message}
            </span>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "SAVING..." : "SAVE MY STORY"}
          </button>
        </div>
      </section>
    </main>
  );
}
