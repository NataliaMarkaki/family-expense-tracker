"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { CategoryChip } from "@/components/ui/CategoryChip";
import { ExpenseTable } from "@/components/ui/ExpenseTable";
import { useCategories } from "@/features/categories/hooks";
import { useMonthlyExpenses } from "@/features/expenses/hooks";
import type { Expense } from "@/features/expenses/types";

interface MonthlyExpensesProps {
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
}

export function MonthlyExpenses({ onEdit, onDelete }: MonthlyExpensesProps) {
  const { data: expenses = [], isLoading } = useMonthlyExpenses();
  const { data: categories = [] } = useCategories();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // OR semantics: an expense matches if it has any of the selected categories.
  const filtered = useMemo(() => {
    if (selected.size === 0) return expenses;
    return expenses.filter((e) =>
      e.categories.some((c) => selected.has(c.id)),
    );
  }, [expenses, selected]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Monthly Expenses
        </Typography>

        {isLoading ? (
          <Skeleton variant="rounded" height={40} sx={{ mb: 2 }} />
        ) : (
          <Box sx={{ mb: 2 }}>
            <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
              {categories.map((c) => (
                <CategoryChip
                  key={c.id}
                  name={c.name}
                  selected={selected.has(c.id)}
                  onClick={() => toggle(c.id)}
                  size="medium"
                />
              ))}
            </Stack>
          </Box>
        )}

        <ExpenseTable
          expenses={filtered}
          isLoading={isLoading}
          emptyMessage={
            selected.size > 0
              ? "No expenses match the selected categories."
              : "No expenses this month."
          }
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </CardContent>
    </Card>
  );
}
