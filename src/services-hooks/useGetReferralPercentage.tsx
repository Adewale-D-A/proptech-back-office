import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { taxRates } from "../types/apiData/taxRates";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetReferralPercentage() {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [data, setData] = useState<taxRates>({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getReferralPercentage = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(`/admin/referral-setting`);
      const result = response?.data?.data;
      setData(result?.[0] || {});
      setIsLoading(false);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getReferralPercentage();
  }, []);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getReferralPercentage,
  };
}
