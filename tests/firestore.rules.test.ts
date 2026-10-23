import { before, after, test } from "node:test";
import { readFileSync } from "node:fs";
import {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
  type RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
let env: RulesTestEnvironment;
before(async () => {
  env = await initializeTestEnvironment({
    projectId: "demo-moises-portfolio",
    firestore: {
      host: "127.0.0.1",
      port: 8080,
      rules: readFileSync("firestore.rules", "utf8"),
    },
  });
});
after(async () => {
  await env?.cleanup();
});
test("anonymous visitors can read public content but cannot write it or read backups", async () => {
  const db = env.unauthenticatedContext().firestore();
  await assertSucceeds(getDoc(doc(db, "profile", "main")));
  await assertFails(setDoc(doc(db, "profile", "main"), { revision: 1 }));
  await assertFails(getDoc(doc(db, "cmsBackups", "private")));
});
test("unrelated and unverified accounts cannot change content", async () => {
  for (const token of [
    { email: "other@example.com", email_verified: true },
    { email: "mozartkats01@gmail.com", email_verified: false },
  ]) {
    const db = env.authenticatedContext(crypto.randomUUID(), token).firestore();
    await assertFails(setDoc(doc(db, "projects", "main"), { revision: 1 }));
  }
});
test("verified owner and admin claim can publish, but cannot write unrelated collections", async () => {
  for (const token of [
    { email: "mozartkats01@gmail.com", email_verified: true },
    { admin: true },
  ]) {
    const db = env.authenticatedContext(crypto.randomUUID(), token).firestore();
    await assertSucceeds(setDoc(doc(db, "profile", "main"), { revision: 1 }));
    await assertFails(setDoc(doc(db, "unrelated", "main"), { revision: 1 }));
    await assertFails(deleteDoc(doc(db, "profile", "main")));
  }
});
test("backups are owner-only and immutable", async () => {
  const db = env.authenticatedContext("owner", { admin: true }).firestore();
  await assertSucceeds(
    setDoc(doc(db, "cmsBackups", "backup"), { content: {} }),
  );
  await assertFails(
    setDoc(doc(db, "cmsBackups", "backup"), { content: { changed: true } }),
  );
  await assertFails(deleteDoc(doc(db, "cmsBackups", "backup")));
});
