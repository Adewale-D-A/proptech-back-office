import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import {
  addToPaginationHistory,
  updateMaintenanceRequestList,
} from "../stores/apiData/maintenance-requests";
import useAxios from "../useHooks/useAxios";
import { pagination } from "../types/pagination";
import ApiQueryParamsExtractor from "../utils/api-query-params-extractor";
//axios instace interceptor for access token integration and refresh tokens
export default function useGetMaintenanceRequests({
  page = 1,
  start_date,
  end_date,
  sort = "asc",
  search = "",
  category_id,
}: {
  page?: number;
  start_date?: string;
  end_date?: string;
  sort?: "desc" | "asc" | string;
  search?: string;
  category_id?: string;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const {
    status,
    data,
    pagination: store_pagination,
  } = useAppSelector((state) => state.maintenanceRequestsList?.value);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [pagination, setPagination] = useState<pagination>({} as any);

  const getAllMaintenanceRequests = useCallback(async () => {
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
          category_id,
        },
      });
      //check store if this requested data has been saved previously and retirve it
      //if not, make a new request and save into store
      const foundPage = store_pagination.find(
        (item) => item?.pagination_data?.current_page === page
      );
      if (foundPage && !remakeRequest) {
        setPagination(foundPage?.pagination_data);
        dispatch(updateMaintenanceRequestList({ data: foundPage?.data }));
      } else {
        const response = await axios.get(
          `/admin/maintenance-request?${queryString}`
        );
        const { maintenance_requests } = response?.data?.data;
        const { data, current_page, last_page, per_page, total, from, to } =
          maintenance_requests;
        const paginationDataset = {
          current_page,
          last_page,
          per_page,
          total,
          from,
          to,
          length: data?.length,
        };
        dispatch(updateMaintenanceRequestList({ data }));
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
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [page, start_date, end_date, sort, search, category_id]);

  useEffect(() => {
    getAllMaintenanceRequests();
  }, [page, start_date, end_date, sort, search, category_id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getAllMaintenanceRequests,
    pagination,
  };
}
