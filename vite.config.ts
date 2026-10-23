import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig(({ mode }) => {
  const emulators = loadEnv(mode, process.cwd(), "VITE_").VITE_FIREBASE_EMULATORS === "true";
  return {
    plugins: [react(), tailwindcss()],
    server: {
      allowedHosts: ["terminal.local"],
      proxy: emulators ? {
        "/google.firestore.v1.Firestore": "http://127.0.0.1:8080",
        "/v1/projects": "http://127.0.0.1:8080",
        "/identitytoolkit.googleapis.com": "http://127.0.0.1:9099",
        "/securetoken.googleapis.com": "http://127.0.0.1:9099",
        "/v0": "http://127.0.0.1:9199",
      } : undefined,
    },
  };
});
