import { api } from "@/lib/axios";
import type {
  CreateExpensePayload,
  Expense,
  ExpenseSummary,
  UpdateExpensePayload,
} from "./types";

export async function getExpenses(): Promise<Expense[]> {
  const { data } = await api.get<Expense[]>("/expenses");
  return data;
}

export async function getRecentExpenses(): Promise<Expense[]> {
  const { data } = await api.get<Expense[]>("/expenses/recent");
  return data;
}

export async function getMonthlyExpenses(): Promise<Expense[]> {
  const { data } = await api.get<Expense[]>("/expenses/monthly");
  return data;
}

export async function getSummary(): Promise<ExpenseSummary> {
  const { data } = await api.get<ExpenseSummary>("/expenses/summary");
  return data;
}

export async function createExpense(
  payload: CreateExpensePayload,
): Promise<Expense> {
  const { data } = await api.post<Expense>("/expenses", payload);
  return data;
}

export async function updateExpense(
  id: string,
  payload: UpdateExpensePayload,
): Promise<Expense> {
  const { data } = await api.patch<Expense>(`/expenses/${id}`, payload);
  return data;
}

export async function deleteExpense(id: string): Promise<void> {
  await api.delete(`/expenses/${id}`);
}
