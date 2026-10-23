import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { copy, useCopy } from "./content";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RouteEffects from "./components/RouteEffects";
import PageHero from "./components/PageHero";
import Home from "./pages/Home";
import About from "./pages/About";
import Biography from "./pages/Biography";
import Career from "./pages/Career";
import Education from "./pages/Education";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
function NotFound() {
  const c = useCopy();
  return (
    <main className="page" id="main-content" tabIndex={-1}>
      <PageHero
        label="404"
        title={c(copy("Page", "Page"))}
        accent={c(copy("not found.", "introuvable."))}
        description={c(
          copy(
            "This page may have moved. You can return home or explore my projects.",
            "Cette page a peut-être été déplacée. Retournez à l’accueil ou découvrez mes projets.",
          ),
        )}
      />
      <section className="section">
        <Link to="/" className="button primary">
          {c(copy("Back to home", "Retour à l’accueil"))}
        </Link>
      </section>
    </main>
  );
}
export default function App() {
  const c = useCopy();
  return (
    <BrowserRouter>
      <a className="skip-link" href="#main-content">
        {c(copy("Skip to content", "Aller au contenu"))}
      </a>
      <RouteEffects />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/biography" element={<Biography />} />
        <Route path="/career" element={<Career />} />
        <Route path="/education" element={<Education />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
