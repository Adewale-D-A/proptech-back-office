import { ownerReportSpreadsheetResponse } from "../types/apiData/reports";

interface summaries {
  revenue: number;
  management_fee: number;
  total_expenses: number;
  net_income: number;
}
export default function reformOwnerSpreadsheet(
  data: ownerReportSpreadsheetResponse
) {
  // const data = {
  //   period: {
  //     start_date: "2025-01-01",
  //     end_date: "2025-05-30",
  //   },
  //   management_fee_percentage: 7.5,
  //   monthly_breakdown: [
  //     {
  //       month: "2025-01",
  //       revenue: 320000,
  //       management_fee: 24000,
  //       total_expenses: 16000,
  //       net_income: 280000,
  //       expenses: [
  //         {
  //           category: "Consumables",
  //           amount: 0,
  //         },
  //         {
  //           category: "Diesel",
  //           amount: 7500,
  //         },
  //         {
  //           category: "Nepa Units",
  //           amount: 8500,
  //         },
  //         {
  //           category: "Petrol",
  //           amount: 0,
  //         },
  //         {
  //           category: "Nepa Unity",
  //           amount: 0,
  //         },
  //       ],
  //     },
  //     {
  //       month: "2025-02",
  //       revenue: 0,
  //       management_fee: 0,
  //       expenses: [
  //         {
  //           category: "Consumables",
  //           amount: 7500,
  //         },
  //         {
  //           category: "Diesel",
  //           amount: 0,
  //         },
  //         {
  //           category: "Nepa Units",
  //           amount: 0,
  //         },
  //         {
  //           category: "Petrol",
  //           amount: 0,
  //         },
  //         {
  //           category: "Nepa Unity",
  //           amount: 0,
  //         },
  //       ],
  //       total_expenses: 7500,
  //       net_income: -7500,
  //     },
  //     {
  //       month: "2025-03",
  //       revenue: 0,
  //       management_fee: 0,
  //       expenses: [
  //         {
  //           category: "Consumables",
  //           amount: 0,
  //         },
  //         {
  //           category: "Diesel",
  //           amount: 0,
  //         },
  //         {
  //           category: "Nepa Units",
  //           amount: 0,
  //         },
  //         {
  //           category: "Petrol",
  //           amount: 0,
  //         },
  //         {
  //           category: "Nepa Unity",
  //           amount: 0,
  //         },
  //       ],
  //       total_expenses: 0,
  //       net_income: 0,
  //     },
  //     {
  //       month: "2025-04",
  //       revenue: 0,
  //       management_fee: 0,
  //       expenses: [
  //         {
  //           category: "Consumables",
  //           amount: 0,
  //         },
  //         {
  //           category: "Diesel",
  //           amount: 0,
  //         },
  //         {
  //           category: "Nepa Units",
  //           amount: 0,
  //         },
  //         {
  //           category: "Petrol",
  //           amount: 0,
  //         },
  //         {
  //           category: "Nepa Unity",
  //           amount: 0,
  //         },
  //       ],
  //       total_expenses: 0,
  //       net_income: 0,
  //     },
  //     {
  //       month: "2025-05",
  //       revenue: 0,
  //       management_fee: 0,
  //       expenses: [
  //         {
  //           category: "Consumables",
  //           amount: 0,
  //         },
  //         {
  //           category: "Diesel",
  //           amount: 0,
  //         },
  //         {
  //           category: "Nepa Units",
  //           amount: 0,
  //         },
  //         {
  //           category: "Petrol",
  //           amount: 0,
  //         },
  //         {
  //           category: "Nepa Unity",
  //           amount: 0,
  //         },
  //       ],
  //       total_expenses: 0,
  //       net_income: 0,
  //     },
  //   ],
  //   totals: {
  //     total_revenue: 320000,
  //     total_management_fee: 24000,
  //     total_expenses: 23500,
  //     total_net_income: 272500,
  //   },
  // };

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
      net_income: monthReportBreakdown?.net_income || 0,
    });
  }
  result.monthlySummaries = summaries;
  console.log(result);
  return result;
}
