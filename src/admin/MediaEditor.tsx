import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import "./MediaEditor.css";

type MediaItem = {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  caption: string;
  altText: string;
  featured: boolean;
  order: number;
};

const categories = [
  "Profile",
  "Career",
  "Education",
  "Projects",
  "Events",
  "Personal",
  "Other",
];

function emptyMedia(): MediaItem {
  return {
    id: crypto.randomUUID(),
    title: "",
    imageUrl: "",
    category: "Personal",
    caption: "",
    altText: "",
    featured: false,
    order: 0,
  };
}

export default function MediaEditor() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    loadMedia();
  }, []);

  async function loadMedia() {
    try {
      setLoading(true);

      const snapshot = await getDoc(doc(db, "media", "main"));

      if (snapshot.exists()) {
        const data = snapshot.data();
        setItems(Array.isArray(data.items) ? data.items : []);
      } else {
        setItems([]);
      }
    } catch (error) {
      console.error("MEDIA LOAD ERROR:", error);
      setMessage("Unable to load media from Firebase.");
    } finally {
      setLoading(false);
    }
  }

  function addMedia() {
    const newItem = emptyMedia();

    setItems((current) => [...current, newItem]);
    setEditingId(newItem.id);
    setMessage("");
  }

  function updateMedia(
    id: string,
    field: keyof MediaItem,
    value: string | boolean | number
  ) {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  }

  function deleteMedia(id: string) {
    const confirmed = window.confirm(
      "Delete this media item from your portfolio?"
    );

    if (!confirmed) {
      return;
    }

    setItems((current) => current.filter((item) => item.id !== id));

    if (editingId === id) {
      setEditingId(null);
    }

    setMessage("Media item removed. Click Save Changes to permanently save.");
  }

  async function saveMedia() {
    try {
      setSaving(true);
      setMessage("");

      await setDoc(
        doc(db, "media", "main"),
        {
          items,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      setMessage("Media library saved successfully.");
    } catch (error) {
      console.error("MEDIA SAVE ERROR:", error);
      setMessage("Unable to save the media library.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="media-editor-page">
      <div className="media-editor-header">
        <div>
          <p className="media-eyebrow">ADMIN CMS</p>

          <h1>Photos & Media</h1>

          <p className="media-subtitle">
            Manage the images displayed throughout your personal portfolio.
            Images can live outside Firebase while their information is
            managed here.
          </p>
        </div>

        <div className="media-actions">
          <button
            type="button"
            className="media-secondary-button"
            onClick={addMedia}
          >
            + Add Photo
          </button>

          <button
            type="button"
            className="media-primary-button"
            onClick={saveMedia}
            disabled={saving}
          >
            {saving ? "SAVING..." : "SAVE CHANGES"}
          </button>
        </div>
      </div>

      {message && (
        <div className="media-message">
          {message}
        </div>
      )}

      {loading ? (
        <div className="media-loading">
          Loading your media library...
        </div>
      ) : items.length === 0 ? (
        <div className="media-empty">
          <div className="media-empty-icon">▤</div>

          <h2>No photos yet.</h2>

          <p>
            Add your first photo using an image URL. The image itself will
            remain outside Firestore.
          </p>

          <button
            type="button"
            className="media-primary-button"
            onClick={addMedia}
          >
            + Add Your First Photo
          </button>
        </div>
      ) : (
        <section className="media-list">
          {items.map((item, index) => (
            <article className="media-card" key={item.id}>
              <div className="media-preview">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.altText || item.title || "Portfolio image"}
                  />
                ) : (
                  <div className="media-no-image">
                    IMAGE PREVIEW
                  </div>
                )}
              </div>

              <div className="media-card-content">
                <div className="media-card-top">
                  <span className="media-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {item.featured && (
                    <span className="media-featured">
                      FEATURED
                    </span>
                  )}
                </div>

                {editingId === item.id ? (
                  <div className="media-form">
                    <label>
                      Title
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) =>
                          updateMedia(item.id, "title", e.target.value)
                        }
                        placeholder="Photo title"
                      />
                    </label>

                    <label>
                      Image URL
                      <input
                        type="url"
                        value={item.imageUrl}
                        onChange={(e) =>
                          updateMedia(item.id, "imageUrl", e.target.value)
                        }
                        placeholder="https://..."
                      />
                    </label>

                    <label>
                      Category
                      <select
                        value={item.category}
                        onChange={(e) =>
                          updateMedia(item.id, "category", e.target.value)
                        }
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label>
                      Caption
                      <textarea
                        value={item.caption}
                        onChange={(e) =>
                          updateMedia(item.id, "caption", e.target.value)
                        }
                        placeholder="Describe this photo..."
                        rows={3}
                      />
                    </label>

                    <label>
                      Alt Text
                      <input
                        type="text"
                        value={item.altText}
                        onChange={(e) =>
                          updateMedia(item.id, "altText", e.target.value)
                        }
                        placeholder="Accessible description"
                      />
                    </label>

                    <label>
                      Display Order
                      <input
                        type="number"
                        min="0"
                        value={item.order}
                        onChange={(e) =>
                          updateMedia(
                            item.id,
                            "order",
                            Number(e.target.value)
                          )
                        }
                      />
                    </label>

                    <label className="media-checkbox">
                      <input
                        type="checkbox"
                        checked={item.featured}
                        onChange={(e) =>
                          updateMedia(
                            item.id,
                            "featured",
                            e.target.checked
                          )
                        }
                      />

                      <span>Featured photo</span>
                    </label>

                    <div className="media-edit-actions">
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                      >
                        Done Editing
                      </button>

                      <button
                        type="button"
                        className="media-delete-button"
                        onClick={() => deleteMedia(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="media-category">
                      {item.category}
                    </p>

                    <h2>
                      {item.title || "Untitled photo"}
                    </h2>

                    <p className="media-caption">
                      {item.caption ||
                        "No caption added yet."}
                    </p>

                    <div className="media-card-actions">
                      <button
                        type="button"
                        onClick={() => setEditingId(item.id)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="media-delete-button"
                        onClick={() => deleteMedia(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

