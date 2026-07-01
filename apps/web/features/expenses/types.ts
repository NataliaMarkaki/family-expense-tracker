import type { Category } from "@/features/categories/types";

export interface Expense {
  id: string;
  name: string;
  amount: string; // Prisma Decimal is serialized as a string over JSON
  userId: string;
  createdAt: string;
  updatedAt: string;
  categories: Category[];
}

export interface CreateExpensePayload {
  name: string;
  amount: number;
  categoryIds: string[];
}

export interface UpdateExpensePayload {
  name?: string;
  amount?: number;
  categoryIds?: string[];
}

export interface SpendingByCategory {
  id: string;
  name: string;
  total: number;
}

export interface ExpenseSummary {
  monthlyTotal: number;
  spendingByCategory: SpendingByCategory[];
  recentTransactions: Expense[];
}
