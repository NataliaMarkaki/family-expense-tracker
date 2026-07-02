export interface CategoryColor {
  bg: string;
  fg: string;
}

// Seeded categories get a guaranteed unique color. Any category not in this
// map falls back to a hash-based pick from the overflow palette.
const NAMED_COLORS: Record<string, CategoryColor> = {
  Food:           { bg: "#fffbeb", fg: "#b45309" }, // amber
  Rent:           { bg: "#fef2f2", fg: "#b91c1c" }, // red
  Utilities:      { bg: "#eff6ff", fg: "#1d4ed8" }, // blue
  Transportation: { bg: "#f0fdfa", fg: "#0f766e" }, // teal
  Entertainment:  { bg: "#fdf4ff", fg: "#a21caf" }, // fuchsia
  Shopping:       { bg: "#eef2ff", fg: "#000000" }, // black
  Healthcare:     { bg: "#fce7f3", fg: "#9d174d" }, // pink
  Travel:         { bg: "#f7fee7", fg: "#4d7c0f" }, // lime
  Other:          { bg: "#f5f3ff", fg: "#6d28d9" }, // violet
};

// Overflow palette for user-created categories not in the map above.
const OVERFLOW_PALETTE: CategoryColor[] = [
  { bg: "#eef2ff", fg: "#4338ca" }, // indigo
  { bg: "#fef9c3", fg: "#854d0e" }, // yellow
  { bg: "#fce7f3", fg: "#9d174d" }, // pink
  { bg: "#e0f2fe", fg: "#0369a1" }, // sky
  { bg: "#f3e8ff", fg: "#7e22ce" }, // purple
  { bg: "#d1fae5", fg: "#065f46" }, // green
  { bg: "#fee2e2", fg: "#991b1b" }, // deep red
  { bg: "#fef3c7", fg: "#92400e" }, // deep amber
];

function hashIndex(name: string, length: number): number {
  let hash = 5381;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 33) ^ name.charCodeAt(i);
  }
  return Math.abs(hash) % length;
}

export function getCategoryColor(name: string): CategoryColor {
  return NAMED_COLORS[name] ?? OVERFLOW_PALETTE[hashIndex(name, OVERFLOW_PALETTE.length)];
}
