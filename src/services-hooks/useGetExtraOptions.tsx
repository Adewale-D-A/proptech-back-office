import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import useAxios from "../useHooks/useAxios";
import { pagination } from "../types/pagination";
import {
  updateExtraOptions,
  addToPaginationHistory,
} from "../stores/apiData/extra-options";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetExtraOptions({
  page = 1,
  limit = 20,
}: {
  page?: number;
  limit?: number;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const {
    status,
    data,
    pagination: store_pagination,
  } = useAppSelector((state) => state.allExtraOptions.value);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [pagination, setPagination] = useState<pagination>({} as any);
  const getExtraOptions = useCallback(async () => {
    try {
      setIsLoading(true);
      //check store if this requested data has been saved previously and retirve it
      //if not, make a new request and save into store
      const foundPage = store_pagination.find(
        (item) => item?.pagination_data?.current_page === page
      );
      if (foundPage && limit === 20) {
        setPagination(foundPage?.pagination_data);
        dispatch(updateExtraOptions({ data: foundPage?.data }));
      } else {
        const response = await axios.get(
          `/admin/extra-option?limit=${limit}&page=${page}`
        );
        const { extraOption } = response?.data?.data;
        const { data, current_page, last_page, per_page, total, from, to } =
          extraOption;
        const paginationDataset = {
          current_page,
          last_page,
          per_page,
          total,
          from,
          to,
          length: data?.length,
        };
        dispatch(updateExtraOptions({ data }));
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
  }, [page, limit]);

  useEffect(() => {
    getExtraOptions();
  }, [page, limit]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getExtraOptions,
    pagination,
  };
}
