import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { updateTaxRateList } from "../stores/apiData/tax-rate-lists";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetAllTaxRateLists({
  page = 1,
  limit = 20,
}: {
  page?: number;
  limit?: number;
}) {
  const axios = useAxios();
  const dispatch = useAppDispatch();
  const {
    status,
    data,
    pagination: store_pagination,
  } = useAppSelector((state) => state.allTaxRates.value);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [pagination, setPagination] = useState<{
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  }>({} as any);

  const getAllTaxRates = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(true);
    try {
      const response = await axios.get(
        `/admin/tax?limit=${limit}&page=${page}`
      );
      const result = response?.data?.data;
      dispatch(updateTaxRateList({ data: result }));
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    if (!status) {
      getAllTaxRates();
    }
  }, [page, limit, status]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getAllTaxRates,
    pagination,
  };
}
