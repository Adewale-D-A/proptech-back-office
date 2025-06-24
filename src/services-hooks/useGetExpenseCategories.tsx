import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import useAxios from "../useHooks/useAxios";
import { pagination } from "../types/pagination";
import {
  updateExpenseategory,
  addToPaginationHistory,
} from "../stores/apiData/expense-categories";
import ApiQueryParamsExtractor from "../utils/api-query-params-extractor";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetExpenseCategories({
  page = 1,
  limit = 20,
  sort = "asc",
  search = "",
}: {
  page?: number;
  limit?: number;
  sort?: "desc" | "asc" | string;
  search?: string;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const { data, pagination: store_pagination } = useAppSelector(
    (state) => state.expensesCategories.value
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [pagination, setPagination] = useState<pagination>({} as any);

  const getExpenseCategories = useCallback(
    async (skipCache?: boolean, limitless?: number) => {
      setIsLoading(true);
      setIsFailed(false);
      try {
        const queryDataset = {
          page: Number(page),
          sort,
          search,
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
          dispatch(updateExpenseategory({ data: foundPage?.data }));
        } else {
          const response = await axios.get(
            `/admin/expense-category?${queryString}`
          );
          const { expense_category } = response?.data?.data;
          const { data, current_page, last_page, per_page, total, from, to } =
            expense_category;
          const paginationDataset = {
            current_page,
            last_page,
            per_page,
            total,
            from,
            to,
            length: data?.length,
          };
          dispatch(updateExpenseategory({ data }));
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
    [page, limit, sort, search]
  );

  useEffect(() => {
    getExpenseCategories();
  }, [page, limit, sort, search]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getExpenseCategories,
    pagination,
  };
}
