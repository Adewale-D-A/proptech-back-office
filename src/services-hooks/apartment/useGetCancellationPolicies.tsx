import { useCallback, useEffect, useState } from "react";

import { pagination } from "../../types/pagination";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import {
  addToPaginationHistory,
  updateCancellationPolicyList,
} from "../../stores/apiData/apartment/cancellation-policies";
import ApiQueryParamsExtractor from "../../utils/api-query-params-extractor";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetCancellationPolcies({
  page = 1,
  search = "",
  limit = 20,
  sort = "asc",
}: {
  page?: number;
  search?: string;
  limit?: number;
  sort?: "asc" | "desc" | string;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const { data, pagination: store_pagination } = useAppSelector(
    (state) => state.cancellationPolicies.value
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [pagination, setPagination] = useState<pagination>({} as any);

  const getCancellationPolicies = useCallback(
    async (skipCache?: boolean, limitless?: number) => {
      setIsLoading(true);
      setIsFailed(false);
      try {
        const queryDataset = {
          page: Number(page),
          search: search,
          limit: limitless ? 1000 : Number(limit),
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
          dispatch(updateCancellationPolicyList({ data: foundPage?.data }));
        } else {
          const response = await axios.get(
            `/admin/cancellation-policy?${queryString}`
          );
          const { cancellation_policy } = response?.data?.data;
          const { data, current_page, last_page, per_page, total, from, to } =
            cancellation_policy;
          const paginationDataset = {
            current_page,
            last_page,
            per_page,
            total,
            from,
            to,
            length: data?.length,
          };
          dispatch(updateCancellationPolicyList({ data }));
          dispatch(
            addToPaginationHistory({
              pagination_data: paginationDataset,
              data: data,
              key: queryKey,
            })
          );
          setPagination(paginationDataset);
        }
      } catch (error) {
        setIsFailed(true);
      } finally {
        setIsLoading(false);
      }
    },
    [page, search, limit, sort]
  );

  useEffect(() => {
    getCancellationPolicies();
  }, [page, search, limit, sort]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getCancellationPolicies,
    pagination,
  };
}
