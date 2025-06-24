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
export default function useGetSalesAnalytics({
  start_date,
  end_date,
}: {
  start_date?: string;
  end_date?: string;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const { status, data, monthlyAmountsStatistics } = useAppSelector(
    (state) => state.salesAnalytics.value
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getSalesAnalytics = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    const currentYear = new Date().getFullYear();
    try {
      const response = await axios.get(
        start_date && end_date
          ? `/admin/dashboard/sales-analytics?start_date=${start_date}&end_date=${end_date}`
          : `/admin/dashboard/sales-analytics?start_date=${currentYear}-01-01&end_date=${currentYear}-12-30`
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
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [start_date, end_date]);

  useEffect(() => {
    if ((start_date && end_date) || !status) {
      //check if stored data is used or new request is fetched. Also check start date and end date has been provided to load the new data
      getSalesAnalytics();
    }
  }, [status, start_date, end_date]);

  return {
    data: { data, stats: monthlyAmountsStatistics },
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getSalesAnalytics,
  };
}
