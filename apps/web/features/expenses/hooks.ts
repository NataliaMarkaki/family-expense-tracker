"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createExpense,
  deleteExpense,
  getExpenses,
  getMonthlyExpenses,
  getRecentExpenses,
  getSummary,
  updateExpense,
} from "./api";
import type {
  CreateExpensePayload,
  Expense,
  UpdateExpensePayload,
} from "./types";

export const expenseKeys = {
  all: ["expenses"] as const,
  list: () => [...expenseKeys.all, "list"] as const,
  recent: () => [...expenseKeys.all, "recent"] as const,
  monthly: () => [...expenseKeys.all, "monthly"] as const,
  summary: () => [...expenseKeys.all, "summary"] as const,
};

export function useExpenses() {
  return useQuery({ queryKey: expenseKeys.list(), queryFn: getExpenses });
}

export function useRecentExpenses() {
  return useQuery({ queryKey: expenseKeys.recent(), queryFn: getRecentExpenses });
}

export function useMonthlyExpenses() {
  return useQuery({ queryKey: expenseKeys.monthly(), queryFn: getMonthlyExpenses });
}

export function useSummary() {
  return useQuery({ queryKey: expenseKeys.summary(), queryFn: getSummary });
}

/** Invalidates every expense-related query (lists + summary). */
function useInvalidateExpenses() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: expenseKeys.all });
}

export function useCreateExpense() {
  const invalidate = useInvalidateExpenses();
  return useMutation({
    mutationFn: (payload: CreateExpensePayload) => createExpense(payload),
    onSuccess: () => invalidate(),
  });
}

export function useUpdateExpense() {
  const invalidate = useInvalidateExpenses();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateExpensePayload }) =>
      updateExpense(id, payload),
    onSuccess: () => invalidate(),
  });
}

export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteExpense(id),
    // Optimistically remove the expense from all cached lists.
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: expenseKeys.all });

      const listKeys = [
        expenseKeys.list(),
        expenseKeys.recent(),
        expenseKeys.monthly(),
      ];

      const snapshots = listKeys.map(
        (key) => [key, queryClient.getQueryData<Expense[]>(key)] as const,
      );

      for (const [key] of snapshots) {
        queryClient.setQueryData<Expense[]>(key, (old) =>
          old?.filter((e) => e.id !== id),
        );
      }

      return { snapshots };
    },
    onError: (_err, _id, context) => {
      // Roll back on failure.
      context?.snapshots.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
    },
  });
}
