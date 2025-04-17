import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import {
  updateRequestsLists,
  addToPaginationHistory,
} from "../stores/apiData/requests-lists";
import { pagination } from "../types/pagination";
import ApiQueryParamsExtractor from "../utils/api-query-params-extractor";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetAllRequestLists({
  page = 1,
  start_date,
  end_date,
  sort = "asc",
  search = "",
  limit = 20,
}: {
  page?: number;
  start_date?: string;
  end_date?: string;
  sort?: "desc" | "asc" | string;
  search?: string;
  limit?: number;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const {
    status,
    data,
    pagination: store_pagination,
  } = useAppSelector((state) => state.allRequestLists.value);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [pagination, setPagination] = useState<pagination>({} as any);
  const getAllRequestList = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const { queryString, remakeRequest } = ApiQueryParamsExtractor({
        dataset: {
          page: search ? 1 : page,
          start_date: start_date,
          end_date: end_date,
          sort: sort,
          search: search,
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
        dispatch(updateRequestsLists({ data: foundPage?.data }));
      } else {
        const response = await axios.get(`admin/user-request?${queryString}`);
        const { user_requests } = response?.data?.data;
        const { data, current_page, last_page, per_page, total, from, to } =
          user_requests;
        const paginationDataset = {
          current_page,
          last_page,
          per_page,
          total,
          from,
          to,
          length: data?.length,
        };
        dispatch(updateRequestsLists({ data: data }));
        if (!remakeRequest) {
          dispatch(
            addToPaginationHistory({
              pagination_data: paginationDataset,
              data,
            })
          );
        }
        setPagination(paginationDataset);
      }
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [page, start_date, end_date, sort, search, limit]);

  useEffect(() => {
    getAllRequestList();
  }, [page, start_date, end_date, sort, search, limit]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getAllRequestList,
    pagination,
  };
}
