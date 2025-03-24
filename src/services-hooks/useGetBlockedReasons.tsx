import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import useAxios from "../useHooks/useAxios";
import { pagination } from "../types/pagination";
import {
  updateBlockedDatesReason,
  addToPaginationHistory,
} from "../stores/apiData/blocked-dates-reason";
import ApiQueryParamsExtractor from "../utils/api-query-params-extractor";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetBlockedReasons({
  page = 1,
  limit = 20,
  sort = "desc",
  search = "",
}: {
  page?: number;
  limit?: number;
  sort?: "desc" | "asc" | string;
  search?: string;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const {
    status,
    data,
    pagination: store_pagination,
  } = useAppSelector((state) => state.blockedDateReasons.value);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [pagination, setPagination] = useState<pagination>({} as any);
  const getBlockedReasons = useCallback(async () => {
    try {
      setIsLoading(true);

      const { queryString, remakeRequest } = ApiQueryParamsExtractor({
        dataset: {
          page: search ? 1 : page,
          sort,
          search,
          limit,
        },
      });
      //check store if this requested data has been saved previously and retirve it
      //if not, make a new request and save into store
      const foundPage = store_pagination.find(
        (item) => item?.pagination_data?.current_page === page
      );
      if (foundPage && !remakeRequest) {
        setPagination(foundPage?.pagination_data);
        dispatch(updateBlockedDatesReason({ data: foundPage?.data }));
      } else {
        const response = await axios.get(
          `/admin/block-date-reason?${queryString}`
        );
        const { reason } = response?.data?.data;
        const { data, current_page, last_page, per_page, total, from, to } =
          reason;
        const paginationDataset = {
          current_page,
          last_page,
          per_page,
          total,
          from,
          to,
          length: data?.length,
        };
        dispatch(updateBlockedDatesReason({ data }));
        if (!remakeRequest) {
          dispatch(
            addToPaginationHistory({
              pagination_data: paginationDataset,
              data: data,
            })
          );
        }
        setPagination(paginationDataset);
      }
      setIsLoading(false);
    } catch (error) {
      setIsFailed(true);
    }
  }, [page, limit, sort, search]);

  useEffect(() => {
    getBlockedReasons();
  }, [page, limit, sort, search]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getBlockedReasons,
    pagination,
  };
}
