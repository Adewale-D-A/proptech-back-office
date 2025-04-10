import { useCallback, useEffect, useState } from "react";
import useAxios from "../../useHooks/useAxios";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetManagementFee() {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [data, setData] = useState<{ amount: number; id: number }>({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getManagementFee = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(`/admin/management-fee`);
      const result = response?.data?.data;
      setData(result);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getManagementFee();
  }, []);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getManagementFee,
  };
}
