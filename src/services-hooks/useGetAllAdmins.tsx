import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import {
  addToPaginationHistory,
  updateAdminsList,
} from "../stores/apiData/admins-list";
import useAxios from "../useHooks/useAxios";
import { pagination } from "../types/pagination";
import ApiQueryParamsExtractor from "../utils/api-query-params-extractor";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetAllAdmins({
  page = 1,
  start_date,
  end_date,
  sort = "desc",
  search = "",
  category,
  limit = 20,
}: {
  page?: number;
  start_date?: string;
  end_date?: string;
  sort?: "desc" | "asc" | string;
  search?: string;
  category?: string;
  limit?: number;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const {
    status,
    data,
    pagination: store_pagination,
  } = useAppSelector((state) => state.allAdminsLists.value);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [pagination, setPagination] = useState<pagination>({} as any);

  const getAllAdmins = useCallback(
    async (skipCache?: boolean, limitless?: number) => {
      setIsLoading(true);
      setIsFailed(false);
      try {
        const queryDataset = {
          page: page,
          start_date: start_date,
          end_date: end_date,
          sort: sort,
          search: search,
          role_id: category,
          limit: limitless ? 1000 : Number(limit),
        };
        const queryKey = JSON.stringify(queryDataset);
        const { queryString } = ApiQueryParamsExtractor({
          dataset: queryDataset,
          sortRefetchKeyword: "asc",
        });
        //check store if this requested data has been saved previously and retirve it
        //if not, make a new request and save into store
        const foundPage = store_pagination.find(
          (item) => item?.key === queryKey
        );
        if (foundPage) {
          setPagination(foundPage?.pagination_data);
          dispatch(updateAdminsList({ data: foundPage?.data }));
        } else {
          const response = await axios.get(`/admin/admins?${queryString}`);
          const { admins } = response?.data?.data;
          const { data, current_page, last_page, per_page, total, from, to } =
            admins;
          const paginationDataset = {
            current_page,
            last_page,
            per_page,
            total,
            from,
            to,
            length: data?.length,
          };
          dispatch(updateAdminsList({ data }));
          dispatch(
            addToPaginationHistory({
              pagination_data: paginationDataset,
              data: data,
              key: queryKey,
            })
          );
          setPagination(paginationDataset);
        }
        setIsLoading(false);
      } catch (error) {
        setIsFailed(true);
      }
    },
    [page, start_date, end_date, sort, search, category, limit]
  );

  useEffect(() => {
    getAllAdmins();
  }, [page, start_date, end_date, sort, search, category, limit]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getAllAdmins,
    pagination,
  };
}
