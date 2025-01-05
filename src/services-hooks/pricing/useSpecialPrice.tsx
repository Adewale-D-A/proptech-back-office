import { useCallback, useEffect, useState } from "react";
import useAxios from "../../useHooks/useAxios";
import { specialPrices } from "../../types/apiData/specialPrices";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetSpecialPrice({ id }: { id?: string }) {
  const axios = useAxios();
  const [data, setData] = useState<specialPrices>({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getSpecialPrice = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(`/admin/special-price/${id}`);
      const { special_price } = response?.data?.data;
      setData(special_price);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getSpecialPrice();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getSpecialPrice,
  };
}
