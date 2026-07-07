import { useTheme } from '@mui/material/styles';
import { categoryColors, type CategoryColor } from '@/lib/theme';

export type { CategoryColor };

function hashIndex(name: string, length: number): number {
  let hash = 5381;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 33) ^ name.charCodeAt(i);
  }
  return Math.abs(hash) % length;
}

/**
 * Returns the theme color for a category name.
 * Named seeded categories get a fixed color from theme.palette.categoryColors.
 * Unknown categories fall back to a hash-picked overflow color from
 * theme.palette.categoryOverflow. Pass the overflow palette as the second
 * argument when calling outside a React component (e.g. chart data prep).
 */
export function getCategoryColor(
  name: string,
  overflowPalette?: CategoryColor[],
): CategoryColor {
  if (categoryColors[name]) return categoryColors[name];
  const palette = overflowPalette ?? [];
  if (palette.length === 0) return { bg: '#f5f5f5', fg: '#616161' };
  return palette[hashIndex(name, palette.length)];
}

/** React hook version — reads the overflow palette directly from the MUI theme. */
export function useCategoryColor(name: string): CategoryColor {
  const { palette } = useTheme();
  return getCategoryColor(name, palette.categoryOverflow);
}
