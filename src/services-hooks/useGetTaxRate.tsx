import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { taxRates } from "../types/apiData/taxRates";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetTaxRate({ id }: { id?: string }) {
  const axios = useAxios();
  const [data, setData] = useState<taxRates>({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getTaxRate = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/admin/tax/${id}`);
      const result = response?.data?.data;
      setData(result);
      setIsLoading(false);
    } catch (error) {
      setIsFailed(true);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getTaxRate();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getTaxRate,
  };
}
