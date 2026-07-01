// A fixed palette of pleasant, distinct colors. A category name is hashed to
// an index so the same category always renders with the same color.
const PALETTE = [
  { bg: "#eef2ff", fg: "#4338ca" }, // indigo
  { bg: "#ecfdf5", fg: "#047857" }, // emerald
  { bg: "#fef2f2", fg: "#b91c1c" }, // red
  { bg: "#fffbeb", fg: "#b45309" }, // amber
  { bg: "#eff6ff", fg: "#1d4ed8" }, // blue
  { bg: "#fdf4ff", fg: "#a21caf" }, // fuchsia
  { bg: "#f0fdfa", fg: "#0f766e" }, // teal
  { bg: "#fff1f2", fg: "#be123c" }, // rose
  { bg: "#f7fee7", fg: "#4d7c0f" }, // lime
  { bg: "#f5f3ff", fg: "#6d28d9" }, // violet
] as const;

export interface CategoryColor {
  bg: string;
  fg: string;
}

export function getCategoryColor(name: string): CategoryColor {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
}
