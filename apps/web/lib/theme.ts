'use client';

import { createTheme } from '@mui/material/styles';

export interface CategoryColor {
  bg: string;
  fg: string;
}

// Named colors for each seeded category — part of the design system.
export const categoryColors: Record<string, CategoryColor> = {
  Food: { bg: '#fffbeb', fg: '#b45309' }, // amber
  Rent: { bg: '#fef2f2', fg: '#b91c1c' }, // red
  Utilities: { bg: '#eff6ff', fg: '#1d4ed8' }, // blue
  Transportation: { bg: '#f0fdfa', fg: '#0f766e' }, // teal
  Entertainment: { bg: '#fdf4ff', fg: '#a21caf' }, // fuchsia
  Shopping: { bg: '#eef2ff', fg: '#000000' }, // black on indigo-bg
  Healthcare: { bg: '#fce7f3', fg: '#9d174d' }, // pink
  Travel: { bg: '#f7fee7', fg: '#4d7c0f' }, // lime
  Other: { bg: '#f5f3ff', fg: '#6d28d9' }, // violet
};

// Overflow palette for user-created categories not in the map above.
const overflowPalette: CategoryColor[] = [
  { bg: '#eef2ff', fg: '#4338ca' }, // indigo
  { bg: '#fef9c3', fg: '#854d0e' }, // yellow
  { bg: '#fce7f3', fg: '#9d174d' }, // pink
  { bg: '#e0f2fe', fg: '#0369a1' }, // sky
  { bg: '#f3e8ff', fg: '#7e22ce' }, // purple
  { bg: '#d1fae5', fg: '#065f46' }, // green
  { bg: '#fee2e2', fg: '#991b1b' }, // deep red
  { bg: '#fef3c7', fg: '#92400e' }, // deep amber
];

// Augment MUI's Palette and PaletteOptions so TypeScript knows about our
// custom `categoryColors` field.
declare module '@mui/material/styles' {
  interface Palette {
    categoryColors: Record<string, CategoryColor>;
    categoryOverflow: CategoryColor[];
  }
  interface PaletteOptions {
    categoryColors?: Record<string, CategoryColor>;
    categoryOverflow?: CategoryColor[];
  }
}

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#4f46e5' },
    secondary: { main: '#0ea5e9' },
    background: { default: '#f8fafc', paper: '#ffffff' },
    categoryColors,
    categoryOverflow: overflowPalette,
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { textTransform: 'none', fontWeight: 600 } },
    },
    MuiCard: {
      styleOverrides: {
        root: { border: '1px solid #e2e8f0', boxShadow: 'none' },
      },
    },
  },
});
