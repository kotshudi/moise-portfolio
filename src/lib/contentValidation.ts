import prepared from "../data/preparedContent.json";
export function safeLink(value: unknown): string | undefined {
  if (typeof value !== "string" || !value.trim()) return undefined;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : undefined;
  } catch {
    return undefined;
  }
}
export function safeImage(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  if (/^\/images\/[a-zA-Z0-9._-]+$/.test(value)) return value;
  return safeLink(value)?.startsWith("https:") ? safeLink(value) : undefined;
}
export function validateDocument(
  section: string,
  value: Record<string, unknown>,
) {
  const template = prepared[section as keyof typeof prepared];
  if (!template) throw new Error("Unknown content section.");
  function check(actual: unknown, expected: unknown, path: string) {
    if (Array.isArray(expected)) {
      if (!Array.isArray(actual)) throw new Error(`${path} must be a list.`);
      if (actual.length > 100) throw new Error(`${path} has too many entries.`);
      const ids = new Set<string>();
      actual.forEach((item, i) => {
        check(item, expected[0], `${path} entry`);
        if (!item.id?.trim() || ids.has(item.id))
          throw new Error(`${path} needs a unique ID for every entry.`);
        ids.add(item.id);
        const required = path.includes("media")
          ? ["title", "altText", "imageUrl"]
          : path.includes("projects")
            ? ["title", "description", "story"]
            : path.includes("skills")
              ? ["name", "description"]
              : path.includes("career")
                ? ["company", "position", "description"]
                : ["institution", "program", "description"];
        for (const key of required)
          if (!item[key]?.trim())
            throw new Error(`Complete ${key} in ${path} entry ${i + 1}.`);
      });
      return;
    }
    if (expected !== null && typeof expected === "object") {
      if (!actual || typeof actual !== "object" || Array.isArray(actual))
        throw new Error(`${path} must be an object.`);
      for (const [key, expectedValue] of Object.entries(expected))
        check(
          (actual as Record<string, unknown>)[key],
          expectedValue,
          `${path}.${key}`,
        );
      return;
    }
    if (typeof actual !== typeof expected)
      throw new Error(`${path} has an invalid value.`);
    if (typeof actual === "string") {
      if (actual.length > 20000) throw new Error(`${path} is too long.`);
      const key = path.split(".").at(-1);
      if (
        ["liveUrl", "githubUrl", "website"].includes(key || "") &&
        actual &&
        !safeLink(actual)
      )
        throw new Error(
          `${key} must be a complete https:// or http:// address.`,
        );
      if (
        ["imageUrl", "portrait"].includes(key || "") &&
        actual &&
        !safeImage(actual)
      )
        throw new Error("Use an HTTPS image URL or a bundled /images/ path.");
      if (
        key === "email" &&
        actual &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(actual)
      )
        throw new Error("Enter a valid contact email.");
      if (
        ["startDate", "endDate"].includes(key || "") &&
        actual &&
        !/^\d{4}(-\d{2})?(-\d{2})?$/.test(actual)
      )
        throw new Error("Dates must use YYYY, YYYY-MM or YYYY-MM-DD.");
    }
    if (typeof actual === "number" && (!Number.isFinite(actual) || actual < 0))
      throw new Error(`${path} must be a nonnegative number.`);
  }
  check(value, template, section);
  if (section === "profile")
    for (const locale of [value, value.fr as Record<string, unknown>])
      for (const key of ["name", "title", "bio", "email", "location"])
        if (!(locale[key] as string).trim())
          throw new Error(`Complete the profile ${key} in both languages.`);
}
