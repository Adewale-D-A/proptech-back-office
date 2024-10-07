import { useCallback, useEffect, useState } from "react";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import {
  updateMonthlyStatistsics,
  updateSalesAnalytics,
} from "../../stores/apiData/dahsboards/sales-analytics";

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];
export default function useGetSalesAnalytics() {
  const axios = useAxios(true);
  const dispatch = useAppDispatch();
  const { status, data, monthlyAmountsStatistics } = useAppSelector(
    (state) => state.salesAnalytics.value
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getSalesAnalytics = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "/admin/dashboard/sales-analytics?start_date=2024-01-01&end_date=2024-12-30"
      );
      const { sales } = response?.data?.data;
      const endResult = months.map((item, index) => {
        const foundMonth = sales.find(
          (id: { month: number }) => id?.month === index + 1
        );
        return foundMonth ? foundMonth?.total_amount : 0;
      });
      dispatch(updateSalesAnalytics(sales));
      dispatch(updateMonthlyStatistsics(endResult));
      setIsLoading(false);
    } catch (error) {
      setIsFailed(true);
    }
  }, []);

  useEffect(() => {
    if (!status) {
      getSalesAnalytics();
    }
  }, [status]);

  return {
    data: { data, stats: monthlyAmountsStatistics },
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getSalesAnalytics,
  };
}
