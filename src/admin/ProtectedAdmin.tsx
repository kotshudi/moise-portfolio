import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { auth } from "../firebase/config";
import { isAdministrator } from "../lib/cms";
export default function ProtectedAdmin() {
  const [status, setStatus] = useState("checking");
  const location = useLocation();
  useEffect(() => {
    let generation = 0;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const current = ++generation;
      if (!user) { setStatus("signed-out"); return; }
      setStatus("checking");
      void isAdministrator(user)
        .then((allowed) => { if (current === generation) setStatus(allowed ? "allowed" : "denied"); })
        .catch(() => { if (current === generation) setStatus("error"); });
    });
    return () => { ++generation; unsubscribe(); };
  }, []);
  if (status === "checking")
    return (
      <main className="access-status">
        <p role="status">Checking administrator access…</p>
      </main>
    );
  if (status === "signed-out")
    return (
      <Navigate to="/admin/login" state={{ from: location.pathname }} replace />
    );
  if (status !== "allowed")
    return (
      <main className="access-status">
        <h1>Administrator access required</h1>
        <p>
          {status === "error"
            ? "Couldn’t verify your session. Please sign in again."
            : "Use the verified owner account or an account with the Firebase admin claim. Signing in alone does not grant editing access."}
        </p>
        <button
          type="button"
          className="button primary"
          onClick={() => void signOut(auth)}
        >
          Sign out
        </button>
      </main>
    );
  return <Outlet />;
}
