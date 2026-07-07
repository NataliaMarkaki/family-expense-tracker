'use client';

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Box, Card, CardContent, Skeleton, Typography } from '@mui/material';
import { useSummary } from '@/features/expenses/hooks';
import { formatCurrency } from '@/lib/format';

export function MonthlySpendingCard() {
  const { data, isLoading, isError } = useSummary();

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <TrendingUpIcon color="primary" fontSize="small" />
          <Typography variant="subtitle2" color="text.secondary">
            Monthly Spending
          </Typography>
        </Box>
        {isLoading ? (
          <Skeleton variant="text" width={140} height={48} />
        ) : isError ? (
          <Typography color="error" variant="body2">
            Failed to load
          </Typography>
        ) : (
          <Typography variant="h4">{formatCurrency(data?.monthlyTotal ?? 0)}</Typography>
        )}
        <Typography variant="caption" color="text.secondary">
          Total for the current month
        </Typography>
      </CardContent>
    </Card>
  );
}
