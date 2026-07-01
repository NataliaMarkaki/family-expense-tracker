"use client";

import { Card, CardContent, Typography } from "@mui/material";
import { ExpenseTable } from "@/components/ui/ExpenseTable";
import { useRecentExpenses } from "@/features/expenses/hooks";
import type { Expense } from "@/features/expenses/types";

interface RecentTransactionsProps {
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
}

export function RecentTransactions({ onEdit, onDelete }: RecentTransactionsProps) {
  const { data = [], isLoading } = useRecentExpenses();

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recent Transactions
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Expenses from this week
        </Typography>
        <ExpenseTable
          expenses={data}
          isLoading={isLoading}
          emptyMessage="No expenses this week."
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </CardContent>
    </Card>
  );
}
