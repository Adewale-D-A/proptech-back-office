import { formatDateToString } from "./isoDateConverter";

const today = new Date();
export default function getMonthStartEndDates(month: number, year?: number) {
  // Ensure the month is 1-12 (JavaScript Date uses 0-11 for months)
  if (month < 1 || month > 12) {
    return {
      start: "",
      end: "",
    };
    // throw new Error("Month must be between 1 and 12");
  }

  const startDate = new Date(year || today.getFullYear(), month - 1, 1);
  const endDate = new Date(year || today.getFullYear(), month, 0); // Day 0 of next month is last day of current month

  return {
    start: formatDateToString(startDate),
    end: formatDateToString(endDate),
  };
}
