import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import {
  addToPaginationHistory,
  updateRolesList,
} from "../stores/apiData/roles-lists";
import useAxios from "../useHooks/useAxios";
import ApiQueryParamsExtractor from "../utils/api-query-params-extractor";
import { pagination } from "../types/pagination";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetRoles({
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
  const { data, pagination: store_pagination } = useAppSelector(
    (state) => state.allRolesLists.value
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [pagination, setPagination] = useState<pagination>({} as any);

  const getRoles = useCallback(
    async (skipCache?: boolean, limitless?: number) => {
      setIsLoading(true);
      setIsFailed(false);
      try {
        const queryDataset = {
          page: search ? 1 : page,
          start_date: start_date,
          end_date: end_date,
          sort: sort,
          search: search,
          // limit: limitless ? 1000 : Number(limit),
        };
        const queryKey = JSON.stringify(queryDataset);
        const { queryString } = ApiQueryParamsExtractor({
          dataset: queryDataset,
        });
        //check store if this requested data has been saved previously and retirve it
        //if not, make a new request and save into store
        const foundPage = store_pagination.find(
          (item) => item?.key === queryKey
        );
        if (foundPage) {
          setPagination(foundPage?.pagination_data);
          dispatch(updateRolesList({ data: foundPage?.data }));
        } else {
          const response = await axios.get(`/admin/roles?${queryString}}`);
          const { roles } = response?.data?.data;
          const { data, current_page, last_page, per_page, total, from, to } =
            roles;
          const paginationDataset = {
            current_page,
            last_page,
            per_page,
            total,
            from,
            to,
            length: data?.length,
          };
          dispatch(updateRolesList({ data }));
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
    [page, start_date, end_date, sort, search, limit]
  );

  useEffect(() => {
    getRoles();
  }, [page, start_date, end_date, sort, search, limit]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getRoles,
    pagination,
  };
}
