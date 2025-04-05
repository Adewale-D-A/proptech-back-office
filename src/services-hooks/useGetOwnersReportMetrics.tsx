import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetOwnersReportMetrics() {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [data, setData] = useState<{
    total_expenses: number;
    total_revenue: number;
    management_fee_percentage: number;
    management_fee_amount: number;
    total_profit: number;
  }>({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const ownersReportMetrics = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(`/admin/owner-report/metrics`);
      const data = response.data?.data;
      setData(data);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    ownersReportMetrics();
  }, []);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: ownersReportMetrics,
  };
}
