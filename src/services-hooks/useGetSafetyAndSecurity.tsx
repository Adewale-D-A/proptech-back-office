import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { safetyAndSecurity } from "../types/apiData/safetyAndSecurity";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetSafetyAndSecurity({ id }: { id?: string }) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [data, setData] = useState<safetyAndSecurity>({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getSafetyAndSecurity = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(`/admin/safety/${id}`);
      const { safety } = response?.data?.data;
      setData(safety);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getSafetyAndSecurity();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getSafetyAndSecurity,
  };
}
