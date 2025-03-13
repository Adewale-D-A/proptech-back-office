import { useCallback, useEffect, useState } from "react";
import useAxios from "../../useHooks/useAxios";
import { ownersReport } from "../../types/apiData/reports";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetOwnerReportById({ id }: { id?: string }) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [data, setData] = useState<ownersReport>({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getOwnerReport = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(`/admin/report/owner/${id}`);
      const { owners_report } = response?.data?.data;
      setData(owners_report);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getOwnerReport();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getOwnerReport,
  };
}
