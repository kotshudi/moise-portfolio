import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "./firebase";

export default function ProtectedAdmin() {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setChecking(false);
    });

    return unsubscribe;
  }, []);

  if (checking) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#f8f7f3",
          color: "#171717",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 38,
              height: 38,
              border: "3px solid #e5e1d8",
              borderTopColor: "#d6ad55",
              borderRadius: "50%",
              margin: "0 auto 16px",
              animation: "adminSpin 0.8s linear infinite",
            }}
          />
          <p>Checking administrator access...</p>
        </div>

        <style>
          {`
            @keyframes adminSpin {
              to {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
