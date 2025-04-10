import { ownerReportSpreadsheetResponse } from "../types/apiData/reports";

interface summaries {
  revenue: number;
  management_fee: number;
  total_expenses: number;
  profit: number;
}
export default function reformOwnerSpreadsheet(
  data: ownerReportSpreadsheetResponse
) {
  const result = { data: [], monthlySummaries: [] } as {
    data: {
      expense_name: string;
      monthly_total_expenses: {
        month: number;
        total: number;
      }[];
    }[];
    monthlySummaries: summaries[];
  };
  const expenses = data?.monthly_breakdown?.[0]?.expenses?.map(
    (item) => item.category
  );

  const summaries = [] as summaries[];
  expenses.forEach((item) => {
    //Expense Items
    const monthlies = [];
    for (let i = 0; i < 12; i++) {
      const monthReportBreakdown = data?.monthly_breakdown?.[i]; //Months
      const result =
        monthReportBreakdown?.expenses?.filter((val) =>
          val?.category?.toLowerCase()?.includes(item?.toLowerCase())
        ) || [];
      monthlies.push({
        month: i,
        total: result.reduce((acc, current) => acc + current.amount, 0),
      });
    }
    result.data.push({
      expense_name: item,
      monthly_total_expenses: monthlies,
    });
  });
  for (let i = 0; i < 12; i++) {
    const monthReportBreakdown = data?.monthly_breakdown?.[i]; //Months

    summaries.push({
      revenue: monthReportBreakdown?.revenue || 0,
      management_fee: monthReportBreakdown?.management_fee || 0,
      total_expenses: monthReportBreakdown?.total_expenses || 0,
      profit: monthReportBreakdown?.profit || 0,
    });
  }
  result.monthlySummaries = summaries;
  return result;
}
