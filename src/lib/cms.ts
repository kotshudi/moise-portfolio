import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import type { User } from "firebase/auth";
import { auth, db } from "../firebase/config";
import prepared from "../data/preparedContent.json";
import { validateDocument } from "./contentValidation";
export const sections = [
  "profile",
  "biography",
  "career",
  "education",
  "projects",
  "skills",
  "media",
  "settings",
] as const;
export type Section = (typeof sections)[number];
export type ContentDocument = Record<string, unknown>;
export const preparedContent = prepared as unknown as Record<
  Section,
  ContentDocument
>;
export async function isAdministrator(user: User | null): Promise<boolean> {
  if (!user) return false;
  const token = await user.getIdTokenResult();
  return (
    token.claims.admin === true ||
    (user.email?.toLowerCase() === "mozartkats01@gmail.com" &&
      user.emailVerified)
  );
}
export async function saveSection(
  section: Section,
  value: ContentDocument,
  revision: number,
) {
  if (!(await isAdministrator(auth.currentUser)))
    throw new Error(
      "Sign in with the verified administrator account to save changes.",
    );
  validateDocument(section, value);
  return runTransaction(db, async (transaction) => {
    const ref = doc(db, section, "main");
    const existing = await transaction.get(ref);
    if ((existing.data()?.revision ?? 0) !== revision)
      throw new Error(
        "This section changed in another session. Reload the saved version before saving again.",
      );
    transaction.set(
      ref,
      { ...value, revision: revision + 1, updatedAt: serverTimestamp() },
      { merge: true },
    );
  });
}
export async function applyPreparedContent() {
  if (!(await isAdministrator(auth.currentUser)))
    throw new Error("Administrator access is required.");
  await runTransaction(db, async (transaction) => {
    const refs = sections.map((section) => doc(db, section, "main"));
    const existing = await Promise.all(refs.map((ref) => transaction.get(ref)));
    const backup = Object.fromEntries(
      sections.map((section, i) => [
        section,
        existing[i].exists() ? existing[i].data() : null,
      ]),
    );
    transaction.set(doc(db, "cmsBackups", crypto.randomUUID()), {
      content: backup,
      createdAt: serverTimestamp(),
      createdBy: auth.currentUser!.uid,
    });
    sections.forEach((section, i) => {
      validateDocument(section, preparedContent[section]);
      transaction.set(refs[i], {
        ...preparedContent[section],
        revision: (existing[i].data()?.revision ?? 0) + 1,
        updatedAt: serverTimestamp(),
      });
    });
  });
}
export async function loadSection(section: Section) {
  const snapshot = await getDoc(doc(db, section, "main"));
  return snapshot.exists() ? snapshot.data() : null;
}
