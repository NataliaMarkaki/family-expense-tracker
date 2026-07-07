'use client';

import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import type { Expense } from '@/features/expenses/types';
import { DeleteExpenseDialog } from './DeleteExpenseDialog';
import { ExpenseFormModal } from './ExpenseFormModal';
import { MonthlyExpenses } from './MonthlyExpenses';
import { MonthlySpendingCard } from './MonthlySpendingCard';
import { RecentTransactions } from './RecentTransactions';
import { SpendingByCategoryCard } from './SpendingByCategoryCard';

export function DashboardContent() {
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Expense | null>(null);
  const [deleting, setDeleting] = useState<Expense | null>(null);

  const openAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (expense: Expense) => {
    setEditing(expense);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
  };

  return (
    <>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Dashboard</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openAdd}>
          Add Expense
        </Button>
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' },
          mb: 3,
        }}
      >
        <MonthlySpendingCard />
        <SpendingByCategoryCard />
      </Box>

      <Stack spacing={3}>
        <RecentTransactions onEdit={openEdit} onDelete={setDeleting} />
        <MonthlyExpenses onEdit={openEdit} onDelete={setDeleting} />
      </Stack>

      <ExpenseFormModal open={formOpen} onClose={closeForm} expense={editing} />
      <DeleteExpenseDialog expense={deleting} onClose={() => setDeleting(null)} />
    </>
  );
}
