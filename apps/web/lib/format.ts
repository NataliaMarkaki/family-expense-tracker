const currencyFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
});

/** Formats a number or Decimal-string amount as GBP. */
export function formatCurrency(amount: number | string): string {
  return currencyFormatter.format(Number(amount));
}

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}
