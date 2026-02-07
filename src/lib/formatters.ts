import { Job } from "@/types/job.types";

export const formatSalary = (salary: Job["salary"]) => {
  if (!salary) return "Not disclosed";

  const { min, max, currency, period, fixed } = salary;
  const currencySymbol =
    currency === "USD" ? "$" : currency === "EUR" ? "€" : "EGP";

  if (min !== undefined && max !== undefined) {
    return `${currencySymbol}${min.toLocaleString()} - ${currencySymbol}${max.toLocaleString()} / ${period}`;
  }

  if (fixed !== undefined)
    return `${currencySymbol}${fixed.toLocaleString()} / ${period}`;

  return "Not disclosed";
};
