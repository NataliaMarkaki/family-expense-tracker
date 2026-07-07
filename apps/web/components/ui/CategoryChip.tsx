'use client';

import { Chip } from '@mui/material';
import { useCategoryColor } from '@/features/categories/colors';

interface CategoryChipProps {
  name: string;
  selected?: boolean;
  onClick?: () => void;
  size?: 'small' | 'medium';
}

/** A colorful chip for a category. When `onClick` is provided it acts as a
 *  toggleable filter pill with active styling when `selected`. */
export function CategoryChip({ name, selected, onClick, size = 'small' }: CategoryChipProps) {
  const color = useCategoryColor(name);
  const clickable = !!onClick;

  return (
    <Chip
      label={name}
      size={size}
      onClick={onClick}
      variant={clickable && !selected ? 'outlined' : 'filled'}
      sx={{
        fontWeight: 600,
        cursor: clickable ? 'pointer' : 'default',
        bgcolor: selected || !clickable ? color.bg : 'transparent',
        color: color.fg,
        borderColor: color.fg,
        ...(selected && {
          boxShadow: `0 0 0 1.5px ${color.fg}`,
        }),
        '&:hover': clickable ? { bgcolor: color.bg, opacity: 0.9 } : undefined,
      }}
    />
  );
}
