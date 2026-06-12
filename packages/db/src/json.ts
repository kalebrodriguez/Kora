/** SQLite has no scalar lists — string arrays are stored as JSON text. */

export function parseStringArray(value: string): string[] {
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((v): v is string => typeof v === "string")
      : [];
  } catch {
    return [];
  }
}

export function toJsonArray(values: readonly string[]): string {
  return JSON.stringify(values);
}
