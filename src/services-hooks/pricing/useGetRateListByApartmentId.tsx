import { useCallback, useEffect, useState } from "react";
import useAxios from "../../useHooks/useAxios";
import { pagination } from "../../types/pagination";
import { rateList } from "../../types/apiData/rateList";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetRateListByApartmentId({
  page = 1,
  limit = 10,
  apartmentId,
}: {
  page?: number;
  limit?: number;
  apartmentId?: string;
}) {
  const axios = useAxios();
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [data, setData] = useState<rateList[]>([]);
  const [pagination, setPagination] = useState<pagination>({} as any);

  const getRateListByApartmentId = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(
        `/admin/rate-list/${apartmentId}?imit=${limit}&page=${page}`
      );
      const { rate_list } = response?.data?.data;
      const { data, current_page, last_page, per_page, total, from, to } =
        rate_list;
      const paginationDataset = {
        current_page,
        last_page,
        per_page,
        total,
        from,
        to,
        length: data?.length,
      };
      setData(data);
      setPagination(paginationDataset);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, apartmentId]);

  useEffect(() => {
    getRateListByApartmentId();
  }, [page, limit, apartmentId]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getRateListByApartmentId,
    pagination,
  };
}
