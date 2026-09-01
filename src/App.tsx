import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Biography from "./pages/Biography";
import Career from "./pages/Career";
import Education from "./pages/Education";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/biography" element={<Biography />} />

        <Route path="/career" element={<Career />} />

        <Route path="/education" element={<Education />} />

        <Route path="/projects" element={<Projects />} />

        <Route
          path="/projects/:projectId"
          element={<ProjectDetails />}
        />

        <Route path="/skills" element={<Skills />} />

        <Route path="/contact" element={<Contact />} />

        <Route
          path="*"
          element={
            <main className="page">
              <section className="page-hero">
                <p className="eyebrow">404</p>
                <h1>
                  Page
                  <span> not found.</span>
                </h1>
              </section>
            </main>
          }
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}
