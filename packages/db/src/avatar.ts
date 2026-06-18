// Deterministic monogram avatars — initials on a brand-tinted circle, encoded
// as an inline SVG data URI. Replaces third-party placeholder avatars so the
// app reads as a real product, not a generated demo. Isomorphic: no Buffer,
// works in both server queries and client mock data.

const PALETTE: { bg: string; fg: string }[] = [
  { bg: "#D7F4F2", fg: "#075E63" }, // teal
  { bg: "#ECEAFB", fg: "#5B4FC2" }, // lavender
  { bg: "#DDF0FB", fg: "#156A9C" }, // sky
  { bg: "#FBE4F1", fg: "#A8316F" }, // pink
  { bg: "#FCEBD6", fg: "#8A5410" }, // amber
  { bg: "#E6EAE9", fg: "#3E4744" }, // slate
];

function initials(name: string): string {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) {
    return "?";
  }
  if (parts.length === 1) {
    return parts[0]!.slice(0, 2).toUpperCase();
  }
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

function hash(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/**
 * Initials monogram as an SVG data URI. Pass a stable seed (name or id) so the
 * same entity always gets the same color. `square` rounds less for org logos.
 */
export function monogramAvatar(
  seed: string,
  options: { label?: string; square?: boolean } = {},
): string {
  const label = (options.label ?? seed).trim() || "?";
  const text = initials(label);
  const { bg, fg } = PALETTE[hash(seed) % PALETTE.length]!;
  const radius = options.square ? 18 : 40;
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">` +
    `<rect width="80" height="80" rx="${radius}" fill="${bg}"/>` +
    `<text x="40" y="40" dy="0.34em" text-anchor="middle" ` +
    `font-family="Inter, system-ui, -apple-system, sans-serif" font-size="32" ` +
    `font-weight="600" fill="${fg}">${text}</text>` +
    `</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
