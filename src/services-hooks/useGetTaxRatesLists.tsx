import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import {
  updateTaxRateList,
  addToPaginationHistory,
} from "../stores/apiData/tax-rate-lists";

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
    try {
      //check store if this requested data has been saved previously and retirve it
      //if not, make a new request and save into store
      const foundPage = store_pagination.find(
        (item) => item?.pagination_data?.current_page === page
      );
      if (foundPage) {
        setPagination(foundPage?.pagination_data);
        dispatch(updateTaxRateList({ data: foundPage?.data }));
      } else {
        const response = await axios.get(
          `/admin/tax?limit=${limit}&page=${page}`
        );
        const result = response?.data?.data;
        // console.log({ result });
        const { data, current_page, last_page, per_page, total, from, to } =
          result;
        const paginationDataset = {
          current_page: 1,
          last_page: 1,
          per_page: 20,
          total: 4,
          from: 1,
          to: 1,
        };
        dispatch(updateTaxRateList({ data: result }));

        dispatch(
          addToPaginationHistory({
            pagination_data: paginationDataset,
            data: result,
          })
        );
        setPagination(paginationDataset);
      }
      setIsLoading(false);
    } catch (error) {
      setIsFailed(true);
    }
  }, [page, limit]);

  useEffect(() => {
    getAllTaxRates();
  }, [page, limit]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getAllTaxRates,
    pagination,
  };
}
