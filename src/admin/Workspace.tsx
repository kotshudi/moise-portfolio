import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronUp,
  ChevronDown,
  LogOut,
  Plus,
  Save,
  Trash2,
  Upload,
  RefreshCw,
} from "lucide-react";
import { auth, storage } from "../firebase/config";
import {
  applyPreparedContent,
  loadSection,
  preparedContent,
  saveSection,
  sections,
} from "../lib/cms";
import type { ContentDocument, Section } from "../lib/cms";
import { safeImage } from "../lib/contentValidation";
import "./Workspace.css";
const titles: Record<Section, string> = {
  profile: "Profile",
  biography: "My story",
  career: "Career",
  education: "Education",
  projects: "Projects",
  skills: "Skills",
  media: "Photos",
  settings: "Website settings",
};
const paths: Record<Section, string> = {
  profile: "profile",
  biography: "story",
  career: "career",
  education: "education",
  projects: "projects",
  skills: "skills",
  media: "media",
  settings: "settings",
};
const labels: Record<string, string> = {
  name: "Full name",
  title: "Title",
  bio: "Professional introduction",
  location: "Location",
  email: "Public contact email",
  phone: "Public phone (optional)",
  website: "Website",
  headline: "Headline",
  introduction: "Introduction",
  journey: "My journey",
  mission: "Mission",
  vision: "Vision",
  values: "Values",
  company: "Organisation",
  position: "Role",
  startDate: "Start date",
  endDate: "End date (leave empty if ongoing)",
  description: "Description",
  achievements: "Responsibilities and contributions",
  institution: "Institution",
  program: "Programme / qualification",
  tagline: "Tagline",
  category: "Category",
  technologies: "Tools and focus",
  status: "Project stage",
  liveUrl: "Live website (optional)",
  githubUrl: "GitHub link (optional)",
  featured: "Feature this entry",
  imageUrl: "Image URL",
  story: "Project story",
  caption: "Caption",
  altText: "Image description for accessibility",
  heroTitle: "Home headline",
  heroAccent: "Highlighted headline",
  philosophy: "Guiding statement",
  seoDescription: "Search description",
  portrait: "Main portrait URL",
  defaultLanguage: "Default site language",
};
const descriptions: Record<Section, string> = {
  profile: "Your public identity and contact details.",
  biography: "Your story, mission, vision and values.",
  career: "Your actual work and service experience.",
  education: "Studies, completed training and ongoing learning.",
  projects: "Project descriptions, stages and working links.",
  skills: "Practical capabilities, without invented ratings.",
  media: "Images, captions and accessible descriptions.",
  settings: "Home-page wording, portrait and search description.",
};
function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}
function mergePrepared(section: Section, saved: ContentDocument | null) {
  const fallback = clone(preparedContent[section]);
  if (!saved) return fallback;
  const result = {
    ...fallback,
    ...saved,
    fr: { ...(fallback.fr as object), ...(saved.fr as object) },
  };
  delete (result as ContentDocument).updatedAt;
  delete (result as ContentDocument).revision;
  return result;
}
const initialRows = (section: Section) => {
  const key = section === "media" ? "items" : "entries";
  return (preparedContent[section][key] as ContentDocument[])[0];
};
export default function Workspace() {
  const location = useLocation();
  const section = sections.find(
    (key) => location.pathname === `/admin/${paths[key]}`,
  );
  const [data, setData] = useState<ContentDocument | null>(null);
  const [revision, setRevision] = useState(0);
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(true);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState("");
  const [failure, setFailure] = useState("");
  const [savedSections, setSavedSections] = useState<string[]>([]);
  const [applying, setApplying] = useState(false);
  const loadId = useRef(0);
  useEffect(() => {
    const listener = (event: BeforeUnloadEvent) => {
      if (dirty) {
        event.preventDefault();
      }
    };
    window.addEventListener("beforeunload", listener);
    return () => window.removeEventListener("beforeunload", listener);
  }, [dirty]);
  useEffect(() => {
    const id = ++loadId.current;
    // Reset the editor when React Router selects a different Firebase document.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessage("");
    setFailure("");
    setDirty(false);
    setLoading(true);
    setData(null);
    if (!section) {
      setData(null);
      Promise.all(
        sections.map(async (key) => ({ key, value: await loadSection(key) })),
      )
        .then((rows) => {
          if (id === loadId.current)
            setSavedSections(rows.filter((r) => r.value).map((r) => r.key));
        })
        .catch(() => {
          if (id === loadId.current)
            setFailure(
              "Couldn’t read the saved content. Check your connection and retry.",
            );
        })
        .finally(() => {
          if (id === loadId.current) setLoading(false);
        });
      return () => {
        loadId.current = id + 1;
      };
    }
    setLoading(true);
    loadSection(section)
      .then((saved) => {
        if (id !== loadId.current) return;
        setData(mergePrepared(section, saved));
        setRevision(typeof saved?.revision === "number" ? saved.revision : 0);
        if (!saved)
          setMessage(
            "Your prepared content is ready to review. Save to publish this section to Firebase.",
          );
      })
      .catch(() => {
        if (id === loadId.current)
          setFailure(
            "Couldn’t load the saved section. Your changes have not been overwritten.",
          );
      })
      .finally(() => {
        if (id === loadId.current) setLoading(false);
      });
    return () => {
      loadId.current = id + 1;
    };
  }, [section, loadAttempt]);
  function navigateAway(event: React.MouseEvent) {
    if (saving || applying) {
      event.preventDefault();
      return;
    }
    if (dirty && !window.confirm("Discard unsaved changes in this section?"))
      event.preventDefault();
  }
  function update(patch: ContentDocument) {
    if (!data) return;
    setDirty(true);
    setMessage("");
    setFailure("");
    setData(
      language === "fr"
        ? { ...data, fr: { ...(data.fr as ContentDocument), ...patch } }
        : { ...data, ...patch },
    );
  }
  async function save() {
    if (!data || !section || saving) return;
    const request = loadId.current;
    setSaving(true);
    setFailure("");
    setMessage("");
    try {
      await saveSection(section, data, revision);
      if (request !== loadId.current) return;
      setRevision((v) => v + 1);
      setDirty(false);
      setMessage(
        "Saved to Firebase. The public website now uses this content.",
      );
    } catch (e) {
      if (request !== loadId.current) return;
      setFailure(
        e instanceof Error
          ? e.message
          : "Couldn’t save. Your edits are still available here.",
      );
    } finally {
      setSaving(false);
    }
  }
  async function apply() {
    if (
      !window.confirm(
        "Publish the prepared English and French profile across all sections? Your existing Firebase content will be backed up before replacement.",
      )
    )
      return;
    setApplying(true);
    setFailure("");
    setMessage("");
    try {
      await applyPreparedContent();
      setSavedSections([...sections]);
      setMessage(
        "Your complete profile is published in English and French. A backup of the previous content was saved.",
      );
    } catch (e) {
      setFailure(
        e instanceof Error
          ? e.message
          : "Couldn’t publish the prepared content. No partial import was saved.",
      );
    } finally {
      setApplying(false);
    }
  }
  async function upload(
    file: File,
    field: string,
    callback: (url: string) => void,
  ) {
    setFailure("");
    if (
      !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
      file.size > 8 * 1024 * 1024
    ) {
      setFailure("Choose a JPEG, PNG or WebP image smaller than 8 MB.");
      return;
    }
    setSaving(true);
    try {
      const ext = file.type.split("/")[1];
      const imageRef = ref(
        storage,
        `portfolio/${auth.currentUser!.uid}/${crypto.randomUUID()}.${ext}`,
      );
      await uploadBytes(imageRef, file, { contentType: file.type });
      callback(await getDownloadURL(imageRef));
      setMessage(
        `${labels[field] || "Image"} uploaded. Save the section to publish it.`,
      );
    } catch {
      setFailure(
        "Image upload failed. Check that Firebase Storage is enabled and its rules have been deployed.",
      );
    } finally {
      setSaving(false);
    }
  }
  const current = (language === "fr" ? data?.fr : data) as
    | ContentDocument
    | undefined;
  function fields(
    value: ContentDocument,
    onChange: (patch: ContentDocument) => void,
    prefix: string,
  ) {
    return Object.entries(value)
      .filter(
        ([key]) =>
          !(key === "defaultLanguage" && language === "fr") &&
          !["fr", "id", "level", "order", "revision", "updatedAt"].includes(
            key,
          ),
      )
      .map(([key, raw]) => {
        if (Array.isArray(raw) || typeof raw === "object") return null;
        const id = `${prefix}-${key}`;
        if (typeof raw === "boolean")
          return (
            <label className="cms-checkbox" key={key} htmlFor={id}>
              <input
                id={id}
                type="checkbox"
                checked={raw}
                onChange={(e) => onChange({ [key]: e.target.checked })}
              />
              {labels[key] || key}
            </label>
          );
        const isImage = key === "imageUrl" || key === "portrait";
        const long = [
          "bio",
          "introduction",
          "journey",
          "mission",
          "vision",
          "values",
          "description",
          "achievements",
          "story",
          "seoDescription",
        ].includes(key);
        return (
          <div
            className={`cms-field ${long || isImage ? "wide" : ""}`}
            key={key}
          >
            <label htmlFor={id}>{labels[key] || key}</label>
            {long ? (
              <textarea
                id={id}
                rows={key === "journey" ? 10 : 4}
                value={String(raw ?? "")}
                onChange={(e) => onChange({ [key]: e.target.value })}
              />
            ) : key === "defaultLanguage" ? (
              <select
                id={id}
                value={String(raw)}
                onChange={(e) => onChange({ [key]: e.target.value })}
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            ) : (
              <input
                id={id}
                type={
                  key === "email" ? "email" : key === "phone" ? "tel" : "text"
                }
                value={String(raw ?? "")}
                onChange={(e) => onChange({ [key]: e.target.value })}
              />
            )}{" "}
            {isImage && (
              <div className="cms-image-row">
                {safeImage(raw) && (
                  <img src={safeImage(raw)} alt="Selected image preview" />
                )}
                <label className="cms-upload">
                  <Upload size={16} /> Upload image
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    disabled={saving}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file)
                        void upload(file, key, (url) =>
                          onChange({ [key]: url }),
                        );
                      e.target.value = "";
                    }}
                  />
                </label>
              </div>
            )}
          </div>
        );
      });
  }
  const arrayKey = section === "media" ? "items" : "entries";
  const rows =
    current && Array.isArray(current[arrayKey])
      ? (current[arrayKey] as ContentDocument[])
      : null;
  function setRows(list: ContentDocument[]) {
    if (!data) return;
    const otherLocale = (language === "fr" ? data : data.fr) as ContentDocument;
    const otherRows = Array.isArray(otherLocale[arrayKey])
      ? (otherLocale[arrayKey] as ContentDocument[])
      : [];
    const translated = list.map((item, index) => {
      const existing = otherRows.find((other) => other.id === item.id);
      const value =
        existing ||
        Object.fromEntries(
          Object.entries(item).map(([key, value]) => [
            key,
            key === "id"
              ? value
              : typeof value === "string"
                ? ""
                : typeof value === "boolean"
                  ? false
                  : 0,
          ]),
        );
      return section === "media" ? { ...value, order: index } : value;
    });
    const ordered =
      section === "media"
        ? list.map((item, index) => ({ ...item, order: index }))
        : list;
    setDirty(true);
    setFailure("");
    setMessage("");
    setData(
      language === "fr"
        ? {
            ...data,
            [arrayKey]: translated,
            fr: { ...(data.fr as ContentDocument), [arrayKey]: ordered },
          }
        : {
            ...data,
            [arrayKey]: ordered,
            fr: { ...(data.fr as ContentDocument), [arrayKey]: translated },
          },
    );
  }
  return (
    <div className="cms-shell">
      <aside className="cms-sidebar">
        <Link to="/admin" className="cms-brand" onClick={navigateAway}>
          <span>MK</span>
          <strong>
            Moise Katemba<small>Content studio</small>
          </strong>
        </Link>
        <nav aria-label="Admin navigation">
          <NavLink end to="/admin" onClick={navigateAway}>
            Overview
          </NavLink>
          {sections.map((key) => (
            <NavLink
              key={key}
              to={`/admin/${paths[key]}`}
              onClick={navigateAway}
            >
              {titles[key]}
            </NavLink>
          ))}
        </nav>
        <Link className="cms-site-link" to="/" onClick={navigateAway}>
          <ArrowUpRight size={16} /> View website
        </Link>
        <button
          disabled={saving || applying}
          className="cms-logout"
          type="button"
          onClick={() => {
            if (!dirty || window.confirm("Discard unsaved edits and sign out?"))
              void signOut(auth);
          }}
        >
          <LogOut size={16} /> Sign out
        </button>
      </aside>
      <main className="cms-main" id="main-content">
        <header className="cms-header">
          <div>
            <p className="cms-eyebrow">MOISE KATEMBA · FIREBASE</p>
            <h1>{section ? titles[section] : "Your work, in your words."}</h1>
            <p>
              {section
                ? descriptions[section]
                : "Manage your professional website and publish directly to Firebase."}
            </p>
          </div>
          {section && (
            <button
              className="cms-primary"
              type="button"
              disabled={loading || saving || !data}
              onClick={() => void save()}
            >
              <Save size={16} />
              {saving ? "Saving…" : "Save & publish"}
            </button>
          )}
        </header>
        {failure && (
          <div className="cms-alert error" role="alert">
            <p>{failure}</p>
            <button
              className="cms-secondary"
              type="button"
              disabled={loading || saving || applying}
              onClick={() => {
                if (
                  !dirty ||
                  window.confirm(
                    "Reload saved content and discard your unsaved changes?",
                  )
                )
                  setLoadAttempt((v) => v + 1);
              }}
            >
              <RefreshCw size={16} /> Reload saved content
            </button>
          </div>
        )}
        {message && (
          <p className="cms-alert" role="status">
            {message}
          </p>
        )}
        {!section ? (
          <>
            <section className="cms-welcome">
              <div>
                <p className="cms-eyebrow">READY FOR YOU</p>
                <h2>A complete professional profile.</h2>
                <p>
                  Your teaching, service, studies, skills and Katembatic work
                  have been written in English and French. Review individual
                  sections or publish the prepared profile together.
                </p>
                <button
                  className="cms-primary"
                  type="button"
                  disabled={applying || loading || !!failure}
                  onClick={() => void apply()}
                >
                  <RefreshCw size={16} />
                  {applying ? "Publishing…" : "Publish prepared profile"}
                </button>
                <p className="cms-note">
                  The import is atomic and saves a private backup of existing
                  content.
                </p>
              </div>
              <img
                src="/images/moise-professional.jpeg"
                alt="Moise Diangelo Katemba"
              />
            </section>
            <section className="cms-sections">
              {sections.map((key) => (
                <Link
                  key={key}
                  className="cms-section-card"
                  to={`/admin/${paths[key]}`}
                >
                  <span
                    className={`cms-badge ${savedSections.includes(key) ? "saved" : ""}`}
                  >
                    {loading
                      ? "Checking saved content…"
                      : failure
                        ? "Connection unavailable"
                        : savedSections.includes(key)
                          ? "Saved in Firebase"
                          : "Prepared for review"}
                  </span>
                  <h2>{titles[key]}</h2>
                  <p>{descriptions[key]}</p>
                  <span className="cms-edit-link">
                    Review section <ArrowUpRight size={16} />
                  </span>
                </Link>
              ))}
            </section>
          </>
        ) : loading ? (
          <p role="status">Loading your saved content…</p>
        ) : data && current ? (
          <fieldset
            className="cms-edit-fields"
            disabled={saving}
            aria-busy={saving}
          >
            <legend className="sr-only">{titles[section]} editor</legend>
            <div className="cms-toolbar">
              <div
                className="cms-language"
                role="group"
                aria-label="Content language"
              >
                {["en", "fr"].map((locale) => (
                  <button
                    key={locale}
                    type="button"
                    aria-pressed={language === locale}
                    onClick={() => setLanguage(locale)}
                  >
                    {locale === "en" ? "English" : "Français"}
                  </button>
                ))}
              </div>
              <span className="cms-save-state">
                {saving
                  ? "Publishing changes…"
                  : dirty
                    ? "Unsaved changes"
                    : "Ready to edit"}
              </span>
            </div>
            {rows ? (
              <>
                <div className="cms-entry-actions">
                  <button
                    className="cms-secondary"
                    type="button"
                    onClick={() => {
                      const example = initialRows(section);
                      const entry = Object.fromEntries(
                        Object.entries(example).map(([key, value]) => [
                          key,
                          key === "id"
                            ? crypto.randomUUID()
                            : typeof value === "boolean"
                              ? false
                              : typeof value === "number"
                                ? 0
                                : "",
                        ]),
                      );
                      setRows([...rows, entry]);
                    }}
                  >
                    <Plus size={16} /> Add{" "}
                    {section === "media" ? "photo" : "entry"}
                  </button>
                </div>
                {rows.length === 0 && (
                  <p className="cms-note">
                    This section has no entries. Add an entry, then save to
                    publish it.
                  </p>
                )}
                {rows.map((row, index) => (
                  <section className="cms-editor-card" key={String(row.id)}>
                    <header>
                      <h2>
                        {String(
                          row.title ||
                            row.name ||
                            row.position ||
                            row.program ||
                            "New entry",
                        )}
                      </h2>
                      <div className="cms-row-actions">
                        <button
                          type="button"
                          aria-label="Move entry up"
                          disabled={index === 0}
                          onClick={() => {
                            const list = [...rows];
                            [list[index - 1], list[index]] = [
                              list[index],
                              list[index - 1],
                            ];
                            setRows(list);
                          }}
                        >
                          <ChevronUp size={17} />
                        </button>
                        <button
                          type="button"
                          aria-label="Move entry down"
                          disabled={index === rows.length - 1}
                          onClick={() => {
                            const list = [...rows];
                            [list[index + 1], list[index]] = [
                              list[index],
                              list[index + 1],
                            ];
                            setRows(list);
                          }}
                        >
                          <ChevronDown size={17} />
                        </button>
                        <button
                          type="button"
                          aria-label="Remove entry from draft"
                          onClick={() =>
                            setRows(rows.filter((_, i) => i !== index))
                          }
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </header>
                    <div className="cms-fields">
                      {fields(
                        row,
                        (patch) =>
                          setRows(
                            rows.map((item, i) =>
                              i === index ? { ...item, ...patch } : item,
                            ),
                          ),
                        String(row.id),
                      )}
                    </div>
                  </section>
                ))}
              </>
            ) : (
              <section className="cms-editor-card">
                <div className="cms-fields">
                  {fields(current, update, section)}
                </div>
              </section>
            )}
            <div className="cms-bottom-actions">
              <Link to="/admin" onClick={navigateAway}>
                <ArrowLeft size={16} /> Overview
              </Link>
              <button
                className="cms-primary"
                disabled={saving}
                type="button"
                onClick={() => void save()}
              >
                <Save size={16} />
                {saving ? "Saving…" : "Save & publish"}
              </button>
            </div>
          </fieldset>
        ) : null}
      </main>
    </div>
  );
}
