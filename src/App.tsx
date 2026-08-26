function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="text-xl font-bold tracking-tight">
          Moise<span className="text-amber-400">.</span>
        </div>

        <div className="hidden gap-8 text-sm text-slate-300 md:flex">
          <a href="#about" className="hover:text-white">About</a>
          <a href="#projects" className="hover:text-white">Projects</a>
          <a href="#experience" className="hover:text-white">Experience</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </div>
      </nav>

      <section className="mx-auto flex min-h-[80vh] max-w-6xl items-center px-6 py-20">
        <div className="max-w-4xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
            Educator • Entrepreneur • Technology Builder
          </p>

          <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl">
            I build ideas into
            <span className="block text-amber-400">
              useful solutions.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
            I'm Moise Katemba. I work across education, business,
            technology, and community-focused projects to create practical
            solutions that can grow and make an impact.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-lg bg-amber-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-300"
            >
              View my work
            </a>

            <a
              href="#contact"
              className="rounded-lg border border-slate-700 px-6 py-3 font-semibold text-white transition hover:border-slate-500"
            >
              Contact me
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="border-t border-slate-800 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
            About
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            More than a title.
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            My work combines education, entrepreneurship, technology,
            and project development. I enjoy turning ideas into systems,
            platforms, and services that solve real problems.
          </p>
        </div>
      </section>

      <section id="projects" className="border-t border-slate-800 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
            Selected projects
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            Things I'm building.
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                name: "KSF",
                description:
                  "A community-focused financial initiative built around savings and access to responsible funding.",
              },
              {
                name: "OpenPath",
                description:
                  "An education initiative focused on English language development and practical skills.",
              },
              {
                name: "KSH",
                description:
                  "A digital shopping concept designed to connect products and customers more easily.",
              },
              {
                name: "K-TRACK",
                description:
                  "A student progress platform for tracking learning, assignments, and performance.",
              },
            ].map((project) => (
              <article
                key={project.name}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-7 transition hover:-translate-y-1 hover:border-slate-700"
              >
                <h3 className="text-2xl font-bold text-amber-400">
                  {project.name}
                </h3>

                <p className="mt-4 leading-7 text-slate-300">
                  {project.description}
                </p>

                <button className="mt-6 text-sm font-semibold text-white hover:text-amber-400">
                  View project →
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="border-t border-slate-800 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
            Experience
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            Education, work & development.
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 p-6">
              <h3 className="font-bold">Education</h3>
              <p className="mt-3 text-slate-400">
                Applied Business Management and continuous professional
                development.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 p-6">
              <h3 className="font-bold">Teaching</h3>
              <p className="mt-3 text-slate-400">
                English education, tutoring, curriculum support, and
                student development.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 p-6">
              <h3 className="font-bold">Technology</h3>
              <p className="mt-3 text-slate-400">
                Building web applications and digital systems for real-world
                projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-slate-800 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
            Contact
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            Let's build something useful.
          </h2>

          <p className="mt-5 max-w-2xl text-slate-300">
            Interested in working together, discussing a project, or simply
            connecting?
          </p>

          <a
            href="mailto:contact@katembaticfff.com"
            className="mt-8 inline-block rounded-lg bg-amber-400 px-6 py-3 font-semibold text-slate-950 hover:bg-amber-300"
          >
            Get in touch
          </a>
        </div>
      </section>

      <footer className="border-t border-slate-800 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 text-sm text-slate-500 sm:flex-row">
          <span>© 2026 Moise Katemba</span>
          <span>Built with purpose.</span>
        </div>
      </footer>
    </main>
  )
}

export default App