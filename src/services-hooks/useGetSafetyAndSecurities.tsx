import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import useAxios from "../useHooks/useAxios";
import { pagination } from "../types/pagination";
import {
  updateSafetyAndSecurity,
  addToPaginationHistory,
} from "../stores/apiData/safety-and-security";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetSafetyAndSecurities({
  page = 1,
}: {
  page?: number;
}) {
  const axios = useAxios();
  const dispatch = useAppDispatch();
  const {
    status,
    data,
    pagination: store_pagination,
  } = useAppSelector((state) => state.allSaeftyAndSecurity.value);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [pagination, setPagination] = useState<pagination>({} as any);
  const getSafetyAndSecurity = useCallback(async () => {
    try {
      setIsLoading(true);
      //check store if this requested data has been saved previously and retirve it
      //if not, make a new request and save into store
      const foundPage = store_pagination.find(
        (item) => item?.pagination_data?.current_page === page
      );
      if (foundPage) {
        setPagination(foundPage?.pagination_data);
        dispatch(updateSafetyAndSecurity({ data: foundPage?.data }));
      } else {
        const response = await axios.get(`/admin/safety?limit=20&page=${page}`);
        const { safety } = response?.data?.data;
        const { data, current_page, last_page, per_page, total, from, to } =
          safety;
        const paginationDataset = {
          current_page,
          last_page,
          per_page,
          total,
          from,
          to,
          length: data?.length,
        };
        dispatch(updateSafetyAndSecurity({ data }));
        dispatch(
          addToPaginationHistory({
            pagination_data: paginationDataset,
            data: data,
          })
        );
        setPagination(paginationDataset);
      }
      setIsLoading(false);
    } catch (error) {
      setIsFailed(true);
    }
  }, [page]);

  useEffect(() => {
    getSafetyAndSecurity();
  }, [page]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getSafetyAndSecurity,
    pagination,
  };
}
