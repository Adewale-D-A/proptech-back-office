import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { coupons } from "../types/apiData/coupons";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetCoupon({ id }: { id?: string }) {
  const axios = useAxios();
  const [data, setData] = useState<coupons>({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getCoupon = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/admin/coupon//${id}`);
      const { coupon } = response?.data?.data;
      setData(coupon);
      setIsLoading(false);
    } catch (error) {
      setIsFailed(true);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getCoupon();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getCoupon,
  };
}
