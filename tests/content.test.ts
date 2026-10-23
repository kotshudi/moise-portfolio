import { test } from "node:test";
import assert from "node:assert/strict";
import prepared from "../src/data/preparedContent.json";
import {
  safeImage,
  safeLink,
  validateDocument,
} from "../src/lib/contentValidation";
test("every prepared CMS document validates in both languages", () => {
  for (const [section, data] of Object.entries(prepared))
    assert.doesNotThrow(() => validateDocument(section, data));
});
test("prepared project translations preserve stable routes and contain full stories", () => {
  assert.deepEqual(
    prepared.projects.entries.map((p) => p.id),
    prepared.projects.fr.entries.map((p) => p.id),
  );
  for (const p of [
    ...prepared.projects.entries,
    ...prepared.projects.fr.entries,
  ]) {
    assert.ok(p.description.length > 40);
    assert.ok(p.story.length > 80);
    assert.ok(!p.title.match(/example|placeholder/i));
  }
});
test("unsafe URLs and external image protocols are rejected", () => {
  for (const url of [
    "javascript:alert(1)",
    "data:text/html,test",
    "//evil.example",
    "file:///secret",
    "",
  ])
    assert.equal(safeLink(url), undefined);
  assert.equal(safeImage("/images/../secret"), undefined);
  assert.equal(safeImage("http://example.com/a.jpg"), undefined);
  assert.equal(
    safeImage("/images/moise-professional.jpeg"),
    "/images/moise-professional.jpeg",
  );
});
test("publishing incomplete or duplicate project records is rejected", () => {
  const value = structuredClone(prepared.projects);
  value.entries[0].story = "";
  assert.throws(() => validateDocument("projects", value), /story/);
  const duplicate = structuredClone(prepared.projects);
  duplicate.entries.push({ ...duplicate.entries[0] });
  assert.throws(() => validateDocument("projects", duplicate), /unique ID/);
});
test("invalid contact and link values cannot be saved", () => {
  const value = structuredClone(prepared.profile);
  value.email = "not-an-email";
  assert.throws(() => validateDocument("profile", value), /email/);
  const project = structuredClone(prepared.projects);
  project.entries[0].liveUrl = "javascript:alert(1)";
  assert.throws(() => validateDocument("projects", project), /https/);
});
test("missing required translations cannot be published", () => {
  const value = structuredClone(prepared.profile);
  value.fr.bio = "";
  assert.throws(() => validateDocument("profile", value), /both languages/);
});
