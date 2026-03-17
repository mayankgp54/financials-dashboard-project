export const formatCurrency = (
  value?: number | null,
  currency: string = "GBP",
): string => {
  if (value === 0 || value === null || value === undefined) return "-";

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatPercentage = (value?: number | null): string => {
  if (value === 0 || value === null || value === undefined) return "-";
  return `${value}%`;
};
