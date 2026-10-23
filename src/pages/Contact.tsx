import { useState } from "react";
import { copy, useCopy, contactEmail } from "../content";
import PageHero from "../components/PageHero";
export default function Contact() {
  const c = useCopy();
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      setFailed(false);
    } catch {
      setFailed(true);
      setCopied(false);
    }
  }
  return (
    <main className="page" id="main-content" tabIndex={-1}>
      <PageHero
        label="CONTACT"
        title={c(copy("Let’s build", "Construisons"))}
        accent={c(copy("something meaningful.", "quelque chose d’utile."))}
        description={c(
          copy(
            "For teaching opportunities, a business website, a project collaboration or a professional conversation, get in touch.",
            "Pour une opportunité d’enseignement, un site d’entreprise, une collaboration ou un échange professionnel, contactez-moi.",
          ),
        )}
      />
      <section className="section contact-page">
        <div className="contact-feature">
          <div>
            <p className="section-label">
              {c(copy("START A CONVERSATION", "COMMENÇONS LA CONVERSATION"))}
            </p>
            <h2>
              {c(
                copy(
                  "A good idea starts with a hello.",
                  "Une bonne idée commence par un bonjour.",
                ),
              )}
            </h2>
            <a className="email-link" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
            <div className="about-links">
              <a className="button primary" href={`mailto:${contactEmail}`}>
                {c(copy("Send an email", "Envoyer un e-mail"))} ↗
              </a>
              <button
                className="button secondary"
                type="button"
                onClick={copyEmail}
              >
                {c(copy("Copy email", "Copier l’adresse"))}
              </button>
            </div>
            <p className="copy-status" role="status">
              {failed
                ? c(
                    copy(
                      "Please select the email address above and copy it manually.",
                      "Sélectionnez l’adresse ci-dessus et copiez-la manuellement.",
                    ),
                  )
                : copied
                  ? c(copy("Email address copied.", "Adresse e-mail copiée."))
                  : ""}
            </p>
          </div>
          <aside className="contact-card">
            <span>{c(copy("BASED IN", "BASÉ À"))}</span>
            <h3>{c(copy("Kinshasa, D.R. Congo", "Kinshasa, R.D. Congo"))}</h3>
            <p>
              {c(
                copy(
                  "Local and remote collaboration.",
                  "Collaboration locale et à distance.",
                ),
              )}
            </p>
            <hr />
            <span>{c(copy("LANGUAGES", "LANGUES"))}</span>
            <p>
              {c(
                copy(
                  "English · French · Lingala",
                  "Anglais · Français · Lingala",
                ),
              )}
            </p>
          </aside>
        </div>
        <div className="contact-grid">
          {[
            copy(
              "Education & English tutoring",
              "Enseignement et cours d’anglais",
            ),
            copy(
              "Business websites & digital tools",
              "Sites d’entreprise et outils numériques",
            ),
            copy(
              "Projects & professional opportunities",
              "Projets et opportunités professionnelles",
            ),
          ].map((title, i) => (
            <article className="contact-card" key={title.en}>
              <span>0{i + 1}</span>
              <h3>{c(title)}</h3>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
