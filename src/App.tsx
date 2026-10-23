import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Admin from "./admin/Admin";
import Login from "./admin/Login";
import ProtectedAdmin from "./admin/ProtectedAdmin";
import ProfileEditor from "./admin/ProfileEditor";
import CareerEditor from "./admin/CareerEditor";
import EducationEditor from "./admin/EducationEditor";
import ProjectsEditor from "./admin/ProjectsEditor";
import SkillsEditor from "./admin/SkillsEditor";
import MediaEditor from "./admin/MediaEditor";
import StoryEditor from "./admin/StoryEditor";

import About from "./pages/About";
import Biography from "./pages/Biography";
import Career from "./pages/Career";
import Education from "./pages/Education";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function NotFound() {
  return (
    <main className="page">
      <section className="page-hero">
        <p className="eyebrow">404</p>
        <h1>
          Page
          <span> not found.</span>
        </h1>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />

        <Route
          path="/about"
          element={
            <PublicLayout>
              <About />
            </PublicLayout>
          }
        />

        <Route
          path="/biography"
          element={
            <PublicLayout>
              <Biography />
            </PublicLayout>
          }
        />

        <Route
          path="/career"
          element={
            <PublicLayout>
              <Career />
            </PublicLayout>
          }
        />

        <Route
          path="/education"
          element={
            <PublicLayout>
              <Education />
            </PublicLayout>
          }
        />

        <Route
          path="/projects"
          element={
            <PublicLayout>
              <Projects />
            </PublicLayout>
          }
        />

        <Route
          path="/projects/:projectId"
          element={
            <PublicLayout>
              <ProjectDetails />
            </PublicLayout>
          }
        />

        <Route
          path="/skills"
          element={
            <PublicLayout>
              <Skills />
            </PublicLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <PublicLayout>
              <Contact />
            </PublicLayout>
          }
        />

        <Route
          path="/admin/login"
          element={<Login />}
        />

        <Route element={<ProtectedAdmin />}>

          <Route
            path="/admin"
            element={<Admin />}
          />

          <Route
            path="/admin/profile"
            element={<ProfileEditor />}
          />

          <Route
            path="/admin/story"
            element={<StoryEditor />}
          />

          <Route
            path="/admin/career"
            element={<CareerEditor />}
          />

          <Route
            path="/admin/education"
            element={<EducationEditor />}
          />

          <Route
            path="/admin/projects"
            element={<ProjectsEditor />}
          />

          <Route path="/admin/skills" element={<SkillsEditor />} />

          <Route path="/admin/media" element={<MediaEditor />} />

          <Route
            path="/admin/settings"
            element={<AdminSection title="Website Settings" />}
          />

        </Route>

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

function AdminSection({ title }: { title: string }) {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8f7f3",
        padding: "60px 6%",
        color: "#171717",
      }}
    >
      <p
        style={{
          margin: "0 0 8px",
          color: "#b08a38",
          fontSize: "10px",
          fontWeight: 800,
          letterSpacing: "0.18em",
        }}
      >
        ADMIN CMS
      </p>

      <h1
        style={{
          margin: 0,
          fontSize: "clamp(36px, 5vw, 64px)",
          letterSpacing: "-0.05em",
        }}
      >
        {title}
      </h1>

      <p
        style={{
          maxWidth: 650,
          marginTop: 18,
          color: "#686868",
          lineHeight: 1.7,
        }}
      >
        This section is ready for the dynamic Firebase content management
        system.
      </p>
    </main>
  );
}






