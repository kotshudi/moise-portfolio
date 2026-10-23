import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { PortfolioProvider } from "./context/PortfolioContext";
import PortfolioView from "./components/PortfolioView";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
const Login = lazy(() => import("./admin/Login"));
const ProtectedAdmin = lazy(() => import("./admin/ProtectedAdmin"));
const Workspace = lazy(() => import("./admin/Workspace"));
function PublicLayout() {
  return (
    <PortfolioProvider>
      <a className="skip-link" href="#main-content">
        Skip to content / Aller au contenu
      </a>
      <Navbar />
      <Outlet />
      <Footer />
    </PortfolioProvider>
  );
}
export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <main className="access-status">
            <p role="status">Loading…</p>
          </main>
        }
      >
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<PortfolioView page="home" />} />
            {[
              "about",
              "biography",
              "career",
              "education",
              "projects",
              "skills",
              "contact",
              "photos",
            ].map((page) => (
              <Route
                key={page}
                path={`/${page}`}
                element={<PortfolioView page={page} />}
              />
            ))}
            <Route
              path="/projects/:projectId"
              element={<PortfolioView page="project" />}
            />
            <Route path="*" element={<PortfolioView page="404" />} />
          </Route>
          <Route path="/admin/login" element={<Login />} />
          <Route element={<ProtectedAdmin />}>
            <Route path="/admin" element={<Workspace />} />
            {[
              "profile",
              "story",
              "career",
              "education",
              "projects",
              "skills",
              "media",
              "settings",
            ].map((page) => (
              <Route
                key={page}
                path={`/admin/${page}`}
                element={<Workspace />}
              />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
