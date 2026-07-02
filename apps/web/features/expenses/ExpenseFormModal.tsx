"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { AppModal } from "@/components/ui/AppModal";
import { useCategories } from "@/features/categories/hooks";
import { useCreateExpense, useUpdateExpense } from "./hooks";
import { expenseSchema, type ExpenseFormValues } from "./schemas";
import type { Expense } from "./types";
import { getApiErrorMessage } from "@/lib/error";

interface ExpenseFormModalProps {
  open: boolean;
  onClose: () => void;
  /** When provided, the modal is in edit mode. */
  expense?: Expense | null;
}

const emptyValues: ExpenseFormValues = {
  name: "",
  amount: "" as unknown as number,
  categoryIds: [],
};

export function ExpenseFormModal({
  open,
  onClose,
  expense,
}: ExpenseFormModalProps) {
  const isEdit = !!expense;
  const { data: categories = [] } = useCategories();
  const createMutation = useCreateExpense();
  const updateMutation = useUpdateExpense();
  const mutation = isEdit ? updateMutation : createMutation;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: emptyValues,
  });

  // Sync form values whenever the target expense (or open state) changes.
  useEffect(() => {
    if (open) {
      reset(
        expense
          ? {
              name: expense.name,
              amount: Number(expense.amount),
              categoryIds: expense.categories.map((c) => c.id),
            }
          : emptyValues,
      );
    }
  }, [open, expense, reset]);

  const onSubmit = handleSubmit((values) => {
    const payload = {
      name: values.name,
      amount: Number(values.amount),
      categoryIds: values.categoryIds,
    };

    const onSuccess = () => onClose();

    if (isEdit && expense) {
      updateMutation.mutate({ id: expense.id, payload }, { onSuccess });
    } else {
      createMutation.mutate(payload, { onSuccess });
    }
  });

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Expense" : "Add Expense"}
    >
      <Box component="form" onSubmit={onSubmit} noValidate autoComplete="off">
        <Stack spacing={2.5} sx={{ pt: 1 }}>
          {mutation.isError && (
            <Alert severity="error">
              {getApiErrorMessage(mutation.error, "Could not save expense")}
            </Alert>
          )}

          <TextField
            label="Name"
            fullWidth
            autoFocus
            autoComplete="off"
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name")}
          />

          <TextField
            label="Amount"
            type="number"
            fullWidth
            autoComplete="off"
            slotProps={{
              htmlInput: { step: "0.01", min: "0" },
              input: {
                endAdornment: (
                  <InputAdornment position="start">£</InputAdornment>
                ),
              },
            }}
            error={!!errors.amount}
            helperText={errors.amount?.message}
            {...register("amount")}
          />

          <Controller
            name="categoryIds"
            control={control}
            render={({ field }) => (
              <Autocomplete
                multiple
                options={categories}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={categories.filter((c) => field.value.includes(c.id))}
                onChange={(_, selected) =>
                  field.onChange(selected.map((c) => c.id))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Categories"
                    placeholder="Select categories"
                  />
                )}
              />
            )}
          />

          <Stack direction="row" spacing={1.5} sx={{ justifyContent: "flex-end" }}>
            <Button color="inherit" onClick={onClose} disabled={mutation.isPending}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={mutation.isPending}>
              {mutation.isPending
                ? "Saving…"
                : isEdit
                  ? "Save Changes"
                  : "Add Expense"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </AppModal>
  );
}
