import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import "./ProfileEditor.css";

type ProfileData = {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  website: string;
};

const defaultProfile: ProfileData = {
  name: "Moise Diangelo Katemba",
  title: "",
  bio: "",
  location: "Kinshasa, Democratic Republic of the Congo",
  email: "",
  phone: "",
  website: "moise.katembaticfff.com",
};

export default function ProfileEditor() {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileRef = doc(db, "profile", "main");
        const snapshot = await getDoc(profileRef);

        if (snapshot.exists()) {
          setProfile({
            ...defaultProfile,
            ...(snapshot.data() as Partial<ProfileData>),
          });
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        setMessage("Could not load profile data.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (
    field: keyof ProfileData,
    value: string
  ) => {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      await setDoc(doc(db, "profile", "main"), profile, {
        merge: true,
      });

      setMessage("Profile saved successfully.");
    } catch (error) {
      console.error("Error saving profile:", error);
      setMessage("Could not save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="profile-editor-page">
        <div className="profile-editor-loading">
          Loading profile...
        </div>
      </main>
    );
  }

  return (
    <main className="profile-editor-page">
      <div className="profile-editor-header">
        <div>
          <span className="profile-editor-eyebrow">
            ADMIN CMS / PROFILE
          </span>
          <h1>Profile</h1>
          <p>
            Manage the information displayed about you across the
            public website.
          </p>
        </div>
      </div>

      <form className="profile-editor-card" onSubmit={handleSave}>
        <div className="profile-editor-section">
          <span className="profile-editor-label">
            BASIC INFORMATION
          </span>

          <div className="profile-editor-grid">
            <div className="profile-field">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                value={profile.name}
                onChange={(e) =>
                  handleChange("name", e.target.value)
                }
                placeholder="Your full name"
              />
            </div>

            <div className="profile-field">
              <label htmlFor="title">Professional Title</label>
              <input
                id="title"
                value={profile.title}
                onChange={(e) =>
                  handleChange("title", e.target.value)
                }
                placeholder="CEO, Entrepreneur, Educator..."
              />
            </div>

            <div className="profile-field">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                value={profile.location}
                onChange={(e) =>
                  handleChange("location", e.target.value)
                }
                placeholder="City, Country"
              />
            </div>

            <div className="profile-field">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                value={profile.website}
                onChange={(e) =>
                  handleChange("website", e.target.value)
                }
                placeholder="yourdomain.com"
              />
            </div>
          </div>
        </div>

        <div className="profile-editor-section">
          <span className="profile-editor-label">
            ABOUT YOU
          </span>

          <div className="profile-field">
            <label htmlFor="bio">Short Biography</label>
            <textarea
              id="bio"
              rows={7}
              value={profile.bio}
              onChange={(e) =>
                handleChange("bio", e.target.value)
              }
              placeholder="Write a short introduction about yourself..."
            />
          </div>
        </div>

        <div className="profile-editor-section">
          <span className="profile-editor-label">
            CONTACT
          </span>

          <div className="profile-editor-grid">
            <div className="profile-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={profile.email}
                onChange={(e) =>
                  handleChange("email", e.target.value)
                }
                placeholder="your@email.com"
              />
            </div>

            <div className="profile-field">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="tel"
                value={profile.phone}
                onChange={(e) =>
                  handleChange("phone", e.target.value)
                }
                placeholder="+243..."
              />
            </div>
          </div>
        </div>

        <div className="profile-editor-actions">
          {message && (
            <span className="profile-editor-message">
              {message}
            </span>
          )}

          <button type="submit" disabled={saving}>
            {saving ? "SAVING..." : "SAVE PROFILE"}
          </button>
        </div>
      </form>
    </main>
  );
}
