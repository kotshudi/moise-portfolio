import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowUpRight,
  ArrowLeft,
  Mail,
  Check,
  Copy,
  GraduationCap,
  Code2,
  BriefcaseBusiness,
  MapPin,
  ShoppingBag,
  Wallet,
  CalendarDays,
  Play,
  School,
  BookOpen,
  Globe,
} from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import { safeImage, safeLink } from "../lib/contentValidation";
import { useWords } from "../lib/useWords";
function ProjectSymbol({ id }: { id: string }) {
  const Icon =
    (
      {
        kbb: Globe,
        openpath: BookOpen,
        ksf: Wallet,
        ksh: ShoppingBag,
        ktrack: GraduationCap,
        kcompass: CalendarDays,
        kstream: Play,
        glies: School,
      } as Record<string, typeof Globe>
    )[id] || Code2;
  return <Icon size={36} strokeWidth={1.5} aria-hidden="true" />;
}
function Paragraphs({ text = "" }: { text?: string }) {
  return (
    <>
      {text
        .split(/\n\s*\n/)
        .filter(Boolean)
        .map((line, i) => (
          <p key={i}>{line}</p>
        ))}
    </>
  );
}
function Hero({
  label,
  title,
  lead,
}: {
  label: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="page-hero">
      <div className="content-width">
        <p className="eyebrow">{label}</p>
        <h1>{title}</h1>
        {lead && <p className="page-lead">{lead}</p>}
      </div>
    </section>
  );
}
function DateRange({ start, end }: { start: string; end: string }) {
  const w = useWords();
  const { i18n } = useTranslation();
  const format = (value: string) => {
    if (!value) return "";
    if (/^\d{4}$/.test(value)) return value;
    const date = new Date(
      `${value.length === 7 ? value + "-01" : value}T12:00:00Z`,
    );
    return Number.isNaN(date.valueOf())
      ? value
      : new Intl.DateTimeFormat(
          i18n.resolvedLanguage === "fr" ? "fr-FR" : "en-GB",
          { month: "short", year: "numeric", timeZone: "UTC" },
        ).format(date);
  };
  if (!start && !end) return null;
  return (
    <span className="timeline-date">
      {start && format(start)}
      {start && " — "}
      {end ? format(end) : w("Present", "Aujourd’hui")}
    </span>
  );
}
export default function PortfolioView({ page }: { page: string }) {
  const { content: c, loading, error, refresh } = usePortfolio();
  const w = useWords();
  const { projectId } = useParams();
  const { pathname } = useLocation();
  const [filter, setFilter] = useState("all");
  const [copyState, setCopyState] = useState("");
  useEffect(() => {
    if (!loading && !error) {
      document.title = `${page === "home" ? c.profile.name : page === "project" ? c.projects.find((p) => p.id === projectId)?.title || w("Project", "Projet") : { about: w("About", "À propos"), biography: w("My story", "Mon histoire"), career: w("Career", "Carrière"), education: w("Education", "Formation"), projects: w("Work", "Projets"), skills: w("Skills", "Compétences"), contact: "Contact", photos: w("Photos", "Photos") }[page] || "404"} | Moise Katemba`;
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", c.settings.seoDescription);
    }
  }, [c, loading, error, page, projectId, w]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.getElementById("main-content")?.focus({ preventScroll: true });
  }, [pathname]);
  if (error)
    return (
      <main id="main-content" className="page status-page" tabIndex={-1}>
        <p className="eyebrow">MOISE KATEMBA</p>
        <h1>{w("Content unavailable", "Contenu indisponible")}</h1>
        <p>
          {w(
            error,
            "Le contenu Firebase est indisponible. Vérifiez votre connexion ou publiez le contenu depuis l’espace administratif.",
          )}
        </p>
        <button className="button primary" onClick={refresh}>
          {w("Try again", "Réessayer")}
        </button>
        <Link className="text-link" to="/admin">
          {w("Administrator access", "Accès administrateur")}
        </Link>
      </main>
    );
  if (loading)
    return (
      <main
        id="main-content"
        className="page status-page"
        tabIndex={-1}
        aria-busy="true"
      >
        <p role="status">
          {w("Loading Moise’s website…", "Chargement du site de Moise…")}
        </p>
      </main>
    );
  const portrait = safeImage(c.settings.portrait);
  const projects = c.projects.filter(
    (p) =>
      filter === "all" ||
      (filter === "client" ? p.id === "glies" : p.id !== "glies"),
  );
  const projectCards = (items: typeof c.projects) => (
    <div className="projects-grid">
      {items.map((p) => (
        <article className="project-card" key={p.id}>
          <div className="project-cover" data-project={p.id}>
            {safeImage(p.imageUrl) ? (
              <img src={safeImage(p.imageUrl)} alt="" loading="lazy" />
            ) : (
              <ProjectSymbol id={p.id} />
            )}
            <span className="status-badge">{p.status}</span>
          </div>
          <p className="project-category">{p.category}</p>
          <h2>{p.title}</h2>
          <p>{p.description}</p>
          <Link className="text-link" to={`/projects/${p.id}`}>
            {w("Explore the project", "Découvrir le projet")}
            <ArrowUpRight size={17} />
          </Link>
        </article>
      ))}
    </div>
  );
  let body;
  if (page === "home")
    body = (
      <>
        <section className="hero-section">
          <div className="hero-content">
            <p className="eyebrow hero-greeting">
              {w("HELLO, I’M", "BONJOUR, JE SUIS")}
            </p>
            <h1>{c.profile.name}</h1>
            <p className="hero-position">{c.profile.title}</p>
            <h2 className="hero-headline">
              {c.settings.heroTitle} <span>{c.settings.heroAccent}</span>
            </h2>
            <p className="hero-description">{c.profile.bio}</p>
            <div className="hero-actions">
              <Link className="button primary" to="/projects">
                {w("Explore my work", "Découvrir mes projets")}
                <ArrowUpRight size={17} />
              </Link>
              <Link className="button secondary" to="/contact">
                {w("Let’s connect", "Échangeons")}
              </Link>
            </div>
            <p className="hero-location">
              <MapPin size={15} aria-hidden="true" />
              {c.profile.location}
            </p>
          </div>
          {portrait && (
            <div className="hero-portrait">
              <img src={portrait} alt={c.profile.name} fetchPriority="high" />
              <div className="portrait-note">
                <span className="portrait-dot" aria-hidden="true" />
                <span>
                  {w(
                    "Learning. Building. Giving back.",
                    "Apprendre. Créer. Transmettre.",
                  )}
                </span>
              </div>
            </div>
          )}
        </section>
        <section
          className="practice-strip"
          aria-label={w("Explore my work", "Découvrir mon travail")}
        >
          <Link to="/career">
            <GraduationCap size={24} />
            <span>
              <strong>{w("Education", "Enseignement")}</strong>
              <small>
                {w("Helping people grow", "Accompagner la progression")}
              </small>
            </span>
            <ArrowUpRight size={18} />
          </Link>
          <Link to="/projects">
            <BriefcaseBusiness size={24} />
            <span>
              <strong>{w("Entrepreneurship", "Entrepreneuriat")}</strong>
              <small>
                {w(
                  "Turning ideas into action",
                  "Transformer les idées en actions",
                )}
              </small>
            </span>
            <ArrowUpRight size={18} />
          </Link>
          <Link to="/skills">
            <Code2 size={24} />
            <span>
              <strong>{w("Technology", "Technologie")}</strong>
              <small>
                {w("Building practical tools", "Créer des outils utiles")}
              </small>
            </span>
            <ArrowUpRight size={18} />
          </Link>
        </section>
        <section className="section intro-grid">
          <div>
            <p className="section-label">{w("MY APPROACH", "MA DÉMARCHE")}</p>
            <h2>{c.biography.headline}</h2>
          </div>
          <div className="prose">
            <Paragraphs text={c.biography.introduction} />
            <Link to="/biography" className="text-link">
              {w("Read my story", "Lire mon histoire")}
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>
        <section className="section selected-work">
          <div className="section-heading">
            <div>
              <p className="section-label">
                {w("SELECTED WORK", "PROJETS À DÉCOUVRIR")}
              </p>
              <h2>
                {w(
                  "Purpose put into practice.",
                  "Des convictions mises en pratique.",
                )}
              </h2>
            </div>
            <Link className="text-link" to="/projects">
              {w("View all work", "Tous les projets")}
              <ArrowUpRight size={17} />
            </Link>
          </div>
          {projectCards(c.projects.filter((p) => p.featured))}
        </section>
        <section className="home-statement">
          <p className="eyebrow">{w("WHAT GUIDES ME", "CE QUI ME GUIDE")}</p>
          <h2>{c.settings.philosophy}</h2>
          <Link className="button primary" to="/contact">
            {w("Start a conversation", "Parlons-en")}
            <ArrowUpRight size={17} />
          </Link>
        </section>
      </>
    );
  else if (page === "about")
    body = (
      <>
        <Hero
          label={w("ABOUT", "À PROPOS")}
          title={c.profile.title}
          lead={c.profile.location}
        />
        <section className="section about-profile">
          {portrait && (
            <img
              className="about-portrait"
              src={portrait}
              alt={c.profile.name}
              loading="lazy"
            />
          )}
          <div className="prose">
            <p className="section-label">{c.profile.name}</p>
            <h2>{c.biography.headline}</h2>
            <Paragraphs text={c.profile.bio} />
            <Paragraphs text={c.biography.introduction} />
            <Link className="text-link" to="/career">
              {w("Explore my experience", "Mon expérience")}
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>
        <section className="section values-grid">
          {[
            [w("Mission", "Mission"), c.biography.mission],
            [w("Vision", "Vision"), c.biography.vision],
            [w("Values", "Valeurs"), c.biography.values],
          ].map(([title, text]) => (
            <article className="value-card" key={title}>
              <h2>{title}</h2>
              <p className="pre-line">{text}</p>
            </article>
          ))}
        </section>
      </>
    );
  else if (page === "biography")
    body = (
      <>
        <Hero
          label={w("MY STORY", "MON HISTOIRE")}
          title={c.biography.headline}
          lead={c.biography.introduction}
        />
        <section className="section story-layout">
          <div className="prose">
            <Paragraphs text={c.biography.journey} />
          </div>
          <aside className="story-aside">
            <p className="section-label">{w("MY PURPOSE", "MON OBJECTIF")}</p>
            <p>{c.biography.mission}</p>
            <Link className="text-link" to="/career">
              {w("Professional experience", "Parcours professionnel")}
              <ArrowUpRight size={17} />
            </Link>
          </aside>
        </section>
      </>
    );
  else if (page === "career" || page === "education") {
    const education = page === "education";
    body = (
      <>
        <Hero
          label={
            education ? w("EDUCATION", "FORMATION") : w("CAREER", "CARRIÈRE")
          }
          title={
            education
              ? w(
                  "Knowledge put into practice.",
                  "Des connaissances mises en pratique.",
                )
              : w(
                  "Experience with responsibility.",
                  "Une expérience portée par la responsabilité.",
                )
          }
          lead={
            education
              ? w(
                  "Business studies, professional training and continuous learning.",
                  "Études commerciales, formation professionnelle et apprentissage continu.",
                )
              : w(
                  "Teaching, operations, entrepreneurship and service.",
                  "Enseignement, opérations, entrepreneuriat et service.",
                )
          }
        />
        <section className="section">
          <div className="timeline">
            {education
              ? c.education.map((e) => (
                  <article className="timeline-item" key={e.id}>
                    <p className="section-label">{e.institution}</p>
                    <h2>{e.program}</h2>
                    <DateRange start={e.startDate} end={e.endDate} />
                    <p className="muted">{e.location}</p>
                    <div className="prose">
                      <Paragraphs text={e.description} />
                      <Paragraphs text={e.achievements} />
                    </div>
                  </article>
                ))
              : c.career.map((e) => (
                  <article className="timeline-item" key={e.id}>
                    <p className="section-label">{e.company}</p>
                    <h2>{e.position}</h2>
                    <DateRange start={e.startDate} end={e.endDate} />
                    <p className="muted">{e.location}</p>
                    <div className="prose">
                      <Paragraphs text={e.description} />
                      <Paragraphs text={e.achievements} />
                    </div>
                  </article>
                ))}
          </div>
        </section>
      </>
    );
  } else if (page === "projects")
    body = (
      <>
        <Hero
          label={w("MY WORK", "MES PROJETS")}
          title={w(
            "Ideas with a practical purpose.",
            "Des idées avec un objectif concret.",
          )}
          lead={w(
            "A selection of Katembatic initiatives and client work, with an honest view of each project’s stage.",
            "Une sélection d’initiatives Katembatic et de projets clients, avec une présentation claire de leur avancement.",
          )}
        />
        <section className="section">
          <div
            className="project-filters"
            role="group"
            aria-label={w("Filter projects", "Filtrer les projets")}
          >
            {[
              ["all", w("All work", "Tous les projets")],
              ["own", w("Katembatic", "Katembatic")],
              ["client", w("Client work", "Projets clients")],
            ].map(([key, label]) => (
              <button
                type="button"
                key={key}
                aria-pressed={filter === key}
                onClick={() => setFilter(key)}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="sr-only" aria-live="polite">
            {projects.length} {w("results", "résultats")}
          </p>
          {projectCards(projects)}
        </section>
      </>
    );
  else if (page === "project") {
    const p = c.projects.find((p) => p.id === projectId);
    body = p ? (
      <>
        <Hero label={p.category} title={p.title} lead={p.tagline} />
        <section className="section project-overview">
          <div className="prose">
            <h2>{w("The project", "Le projet")}</h2>
            <Paragraphs text={p.description} />
            <Paragraphs text={p.story} />
            <div className="hero-actions">
              {safeLink(p.liveUrl) && (
                <a
                  className="button primary"
                  href={safeLink(p.liveUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {w("Visit website", "Visiter le site")}
                  <ArrowUpRight size={17} />
                </a>
              )}
              {safeLink(p.githubUrl) && (
                <a
                  className="button secondary"
                  href={safeLink(p.githubUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                  <ArrowUpRight size={17} />
                </a>
              )}
            </div>
          </div>
          <aside className="project-facts">
            {safeImage(p.imageUrl) && (
              <img src={safeImage(p.imageUrl)} alt={p.title} />
            )}
            <p className="section-label">
              {w("PROJECT STATUS", "ÉTAT DU PROJET")}
            </p>
            <p>{p.status}</p>
            <p className="section-label">
              {w("TOOLS & FOCUS", "OUTILS ET AXES DE TRAVAIL")}
            </p>
            <p>{p.technologies}</p>
            <DateRange start={p.startDate} end={p.endDate} />
          </aside>
        </section>
        <section className="section back-link">
          <Link className="text-link" to="/projects">
            <ArrowLeft size={16} />
            {w("All projects", "Tous les projets")}
          </Link>
          <Link className="text-link" to="/contact">
            {w("Discuss this project", "Parlons de ce projet")}
            <ArrowUpRight size={17} />
          </Link>
        </section>
      </>
    ) : (
      <Hero
        label={w("NOT FOUND", "INTROUVABLE")}
        title={w("Project not found.", "Projet introuvable.")}
      />
    );
  } else if (page === "skills")
    body = (
      <>
        <Hero
          label={w("SKILLS", "COMPÉTENCES")}
          title={w("What I bring to the work.", "Ce que je peux apporter.")}
          lead={w(
            "Skills developed through study, practice and real responsibilities.",
            "Des compétences développées par les études, la pratique et des responsabilités concrètes.",
          )}
        />
        <section className="section skills-grid">
          {c.skills.map((s) => (
            <article className="skill-card" key={s.id}>
              <p className="section-label">{s.category}</p>
              <h2>{s.name}</h2>
              <p>{s.description}</p>
            </article>
          ))}
        </section>
      </>
    );
  else if (page === "photos")
    body = (
      <>
        <Hero
          label="PHOTOS"
          title={w("Moments from the journey.", "Des moments du parcours.")}
        />
        <section className="section photo-grid">
          {[...c.media]
            .sort((a, b) => a.order - b.order)
            .filter((p) => safeImage(p.imageUrl))
            .map((p) => (
              <figure key={p.id}>
                <a
                  href={safeImage(p.imageUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={safeImage(p.imageUrl)}
                    alt={p.altText}
                    loading="lazy"
                  />
                </a>
                <figcaption>
                  <h2>{p.title}</h2>
                  <p>{p.caption}</p>
                </figcaption>
              </figure>
            ))}
        </section>
      </>
    );
  else if (page === "contact")
    body = (
      <>
        <Hero
          label="CONTACT"
          title={w(
            "Let’s make something useful.",
            "Créons quelque chose d’utile.",
          )}
          lead={w(
            "For education, business websites, collaboration and professional opportunities.",
            "Pour l’enseignement, les sites d’entreprise, les collaborations et les opportunités professionnelles.",
          )}
        />
        <section className="section contact-feature">
          <div>
            <h2>
              {w(
                "A conversation starts here.",
                "La conversation commence ici.",
              )}
            </h2>
            <a className="email-link" href={`mailto:${c.profile.email}`}>
              {c.profile.email}
            </a>
            <div className="hero-actions">
              <a className="button primary" href={`mailto:${c.profile.email}`}>
                <Mail size={17} />
                {w("Send an email", "Envoyer un e-mail")}
              </a>
              <button
                className="button secondary"
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(c.profile.email);
                    setCopyState("copied");
                  } catch {
                    setCopyState("manual");
                  }
                }}
              >
                {copyState === "copied" ? (
                  <Check size={17} />
                ) : (
                  <Copy size={17} />
                )}{" "}
                {w("Copy address", "Copier l’adresse")}
              </button>
            </div>
            <p role="status" className="copy-status">
              {copyState === "copied"
                ? w("Email address copied.", "Adresse e-mail copiée.")
                : copyState === "manual"
                  ? w(
                      "Select the address above to copy it manually.",
                      "Sélectionnez l’adresse ci-dessus pour la copier manuellement.",
                    )
                  : ""}
            </p>
            {c.profile.phone && (
              <p>
                <a href={`tel:${c.profile.phone.replace(/[^+\d]/g, "")}`}>
                  {c.profile.phone}
                </a>
              </p>
            )}
          </div>
          <aside className="contact-card">
            <p className="section-label">{w("BASED IN", "BASÉ À")}</p>
            <h2>{c.profile.location}</h2>
            <p>
              {w(
                "Local and remote collaboration.",
                "Collaboration locale et à distance.",
              )}
            </p>
            <hr />
            <p className="section-label">{w("LANGUAGES", "LANGUES")}</p>
            <p>
              {w("English · French · Lingala", "Anglais · Français · Lingala")}
            </p>
            {safeLink(c.profile.website) && (
              <a
                className="text-link"
                href={safeLink(c.profile.website)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Katembatic FFF
                <ArrowUpRight size={17} />
              </a>
            )}
          </aside>
        </section>
      </>
    );
  else
    body = (
      <>
        <Hero
          label={w("NOT FOUND", "INTROUVABLE")}
          title={w("Page not found.", "Page introuvable.")}
        />
        <section className="section">
          <Link to="/" className="button primary">
            {w("Return home", "Retour à l’accueil")}
          </Link>
        </section>
      </>
    );
  return (
    <main
      id="main-content"
      className={page === "home" ? "home-page" : "page"}
      tabIndex={-1}
    >
      {body}
    </main>
  );
}
