import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import {
  addToPaginationHistory,
  updateRequisitionRequestList,
} from "../stores/apiData/requisition-requests";
import useAxios from "../useHooks/useAxios";
import { pagination } from "../types/pagination";
import ApiQueryParamsExtractor from "../utils/api-query-params-extractor";
// import sampleRequesitionsData from "../assets/temp-api-mockup-data/requisition-request.json";
//axios instace interceptor for access token integration and refresh tokens
export default function useGetRequisitionRequests({
  page = 1,
  start_date,
  end_date,
  sort = "desc",
  search = "",
  category = "",
  paid,
  limit = 20,
  status,
}: {
  page?: number;
  start_date?: string;
  end_date?: string;
  sort?: "desc" | "asc" | string;
  search?: string;
  category?: string;
  paid?: "yes" | "no" | string;
  limit?: number;
  status?:
    | "pending"
    | "approved"
    | "processing"
    | "closed"
    | "declined"
    | string;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const { data, pagination: store_pagination } = useAppSelector(
    (state) => state.requisitionRequestsList?.value
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [pagination, setPagination] = useState<pagination>({} as any);

  const getAllRequisitionRequests = useCallback(
    async (skipCache?: boolean, limitless?: number) => {
      setIsLoading(true);
      setIsFailed(false);
      try {
        const queryDataset = {
          page: Number(page),
          start_date: start_date,
          end_date: end_date,
          sort,
          status,
          search: search,
          category_id: category,
          paid,
          limit: limitless ? 1000 : Number(limit),
        };
        const queryKey = JSON.stringify(queryDataset);
        const { queryString, remakeRequest } = ApiQueryParamsExtractor({
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
          dispatch(updateRequisitionRequestList({ data: foundPage?.data }));
        } else {
          const response = await axios.get(
            `/admin/requisition-request?${queryString}`
          );
          const { requisition_request } = response?.data?.data;
          const { data, current_page, last_page, per_page, total, from, to } =
            requisition_request;
          const paginationDataset = {
            current_page,
            last_page,
            per_page,
            total,
            from,
            to,
            length: data?.length,
          };
          dispatch(updateRequisitionRequestList({ data }));
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
    [page, start_date, end_date, sort, search, category, paid, limit, status]
  );

  useEffect(() => {
    getAllRequisitionRequests();
  }, [page, start_date, end_date, sort, search, category, paid, limit, status]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getAllRequisitionRequests,
    pagination,
  };
}
