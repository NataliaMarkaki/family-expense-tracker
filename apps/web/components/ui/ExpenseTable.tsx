"use client";

import {
  Box,
  IconButton,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { CategoryChip } from "./CategoryChip";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Expense } from "@/features/expenses/types";

interface ExpenseTableProps {
  expenses: Expense[];
  isLoading?: boolean;
  emptyMessage?: string;
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
}

export function ExpenseTable({
  expenses,
  isLoading = false,
  emptyMessage = "No expenses yet.",
  onEdit,
  onDelete,
}: ExpenseTableProps) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell>Date Added</TableCell>
            <TableCell>Categories</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <SkeletonRows />
          ) : expenses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} sx={{ border: 0 }}>
                <EmptyState message={emptyMessage} />
              </TableCell>
            </TableRow>
          ) : (
            expenses.map((expense) => (
              <TableRow key={expense.id} hover>
                <TableCell sx={{ fontWeight: 500 }}>{expense.name}</TableCell>
                <TableCell align="right">
                  {formatCurrency(expense.amount)}
                </TableCell>
                <TableCell>{formatDate(expense.createdAt)}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={0.5} useFlexGap sx={{ flexWrap: "wrap" }}>
                    {expense.categories.length === 0 ? (
                      <Typography variant="body2" color="text.disabled">
                        —
                      </Typography>
                    ) : (
                      expense.categories.map((c) => (
                        <CategoryChip key={c.id} name={c.name} />
                      ))
                    )}
                  </Stack>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <IconButton size="small" onClick={() => onEdit(expense)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => onDelete(expense)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <TableRow key={i}>
          {Array.from({ length: 5 }).map((__, j) => (
            <TableCell key={j}>
              <Skeleton variant="text" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <Box
      sx={{
        py: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        color: "text.secondary",
      }}
    >
      <ReceiptLongIcon sx={{ fontSize: 40, opacity: 0.4 }} />
      <Typography variant="body2">{message}</Typography>
    </Box>
  );
}
