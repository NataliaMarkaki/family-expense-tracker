import { z } from 'zod';

export const expenseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  amount: z.coerce
    .number({ message: 'Amount is required' })
    .positive('Amount must be greater than 0'),
  categoryIds: z.array(z.string()),
});

export type ExpenseFormValues = z.input<typeof expenseSchema>;
export type ExpenseFormOutput = z.output<typeof expenseSchema>;
