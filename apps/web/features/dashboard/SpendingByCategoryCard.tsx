"use client";

import {
  Box,
  Card,
  CardContent,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import { PieChart } from "@mui/x-charts/PieChart";
import { useSummary } from "@/features/expenses/hooks";
import { getCategoryColor } from "@/features/categories/colors";
import { formatCurrency } from "@/lib/format";

export function SpendingByCategoryCard() {
  const { data, isLoading, isError } = useSummary();
  const categories = data?.spendingByCategory ?? [];

  const chartData = categories.map((c) => ({
    id: c.id,
    value: c.total,
    label: c.name,
    color: getCategoryColor(c.name).fg,
  }));

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <DonutLargeIcon color="primary" fontSize="small" />
          <Typography variant="subtitle2" color="text.secondary">
            Spending By Category
          </Typography>
        </Box>

        {isLoading ? (
          <Skeleton variant="rounded" height={180} />
        ) : isError ? (
          <Typography color="error" variant="body2">
            Failed to load
          </Typography>
        ) : categories.length === 0 ? (
          <Box sx={{ py: 4, textAlign: "center", color: "text.secondary" }}>
            <Typography variant="body2">
              No spending this month yet.
            </Typography>
          </Box>
        ) : (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ alignItems: "center" }}
          >
            <PieChart
              series={[
                {
                  data: chartData,
                  innerRadius: 40,
                  paddingAngle: 2,
                  cornerRadius: 4,
                },
              ]}
              width={180}
              height={180}
              hideLegend
            />
            <Stack spacing={1} sx={{ flex: 1, width: "100%" }}>
              {categories.map((c) => (
                <Box
                  key={c.id}
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor: getCategoryColor(c.name).fg,
                    }}
                  />
                  <Typography variant="body2" sx={{ flex: 1 }}>
                    {c.name}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {formatCurrency(c.total)}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
