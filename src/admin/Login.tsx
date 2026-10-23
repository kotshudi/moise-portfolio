import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { auth } from "../firebase/config";
import "./Workspace.css";
export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <main className="cms-login">
      <section className="cms-login-story">
        <Link to="/" className="cms-brand">
          <span>MK</span>
          <strong>Moise Katemba</strong>
        </Link>
        <div>
          <p className="cms-eyebrow">YOUR CONTENT STUDIO</p>
          <h1>
            Keep your story
            <br />
            moving forward.
          </h1>
          <p>Manage your profile, experience and projects in one place.</p>
        </div>
        <p>Powered by your existing Firebase project.</p>
      </section>
      <section className="cms-login-form">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            setError("");
            try {
              await signInWithEmailAndPassword(auth, email.trim(), password);
              setPassword("");
              const from = (location.state as { from?: string } | null)?.from;
              navigate(from?.startsWith("/admin") ? from : "/admin", {
                replace: true,
              });
            } catch (e) {
              setError(
                e instanceof FirebaseError &&
                  e.code === "auth/too-many-requests"
                  ? "Too many sign-in attempts. Please wait before trying again."
                  : "Unable to sign in. Check your email, password and connection.",
              );
            } finally {
              setLoading(false);
            }
          }}
        >
          <p className="cms-eyebrow">ADMINISTRATOR ACCESS</p>
          <h2>Welcome back.</h2>
          <p>Sign in with your Firebase administrator account.</p>
          <label htmlFor="admin-email">Email address</label>
          <input
            id="admin-email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <p className="cms-alert error" role="alert">
              {error}
            </p>
          )}
          <button className="cms-primary" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
          <Link className="cms-back" to="/">
            ← Back to website
          </Link>
        </form>
      </section>
    </main>
  );
}
