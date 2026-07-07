'use client';

import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useDeleteExpense } from '@/features/expenses/hooks';
import type { Expense } from '@/features/expenses/types';

interface DeleteExpenseDialogProps {
  expense: Expense | null;
  onClose: () => void;
}

export function DeleteExpenseDialog({ expense, onClose }: DeleteExpenseDialogProps) {
  const deleteMutation = useDeleteExpense();

  const handleConfirm = () => {
    if (!expense) return;
    deleteMutation.mutate(expense.id, { onSuccess: onClose });
  };

  return (
    <ConfirmDialog
      open={!!expense}
      title="Delete expense?"
      message={
        <>
          This will permanently delete <strong>{expense?.name}</strong>. This action cannot be
          undone.
        </>
      }
      confirmLabel="Delete"
      loading={deleteMutation.isPending}
      onConfirm={handleConfirm}
      onCancel={onClose}
    />
  );
}
