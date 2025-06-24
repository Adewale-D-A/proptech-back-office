import { useCallback, useEffect, useState } from "react";
import useAxios from "../../useHooks/useAxios";
import { pagination } from "../../types/pagination";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import {
  updateRevenueReport,
  addToPaginationHistory,
} from "../../stores/apiData/reports/revenue";
import ApiQueryParamsExtractor from "../../utils/api-query-params-extractor";
//axios instace interceptor for access token integration and refresh tokens
export default function useGetRevenueReport({
  page = 1,
  apartmentId,
  start_date,
  end_date,
  group = "",
  limit = 20,
}: {
  page?: number;
  start_date?: string;
  end_date?: string;
  apartmentId: string;
  group?: string;
  limit?: number;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const { data, pagination: store_pagination } = useAppSelector(
    (state) => state.revenueReports.value
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [pagination, setPagination] = useState<pagination>({} as any);

  const getRevenueReports = useCallback(
    async (skipCache?: boolean, limitless?: number) => {
      setIsLoading(true);
      setIsFailed(false);
      try {
        const queryDataset = {
          page: Number(page),
          start_date: start_date,
          end_date: end_date,
          shortlet_id: apartmentId,
          group,
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
          dispatch(updateRevenueReport({ data: foundPage?.data }));
        } else {
          const response = await axios.get(
            `/admin/report/revenue?${queryString}`
          );
          const { report } = response?.data?.data;
          const { data, current_page, last_page, per_page, total, from, to } =
            report;
          const paginationDataset = {
            current_page,
            last_page,
            per_page,
            total,
            from,
            to,
            length: data?.length,
          };
          dispatch(updateRevenueReport({ data }));
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
    [page, apartmentId, start_date, end_date, group, limit]
  );

  useEffect(() => {
    getRevenueReports();
  }, [page, apartmentId, start_date, end_date, group, limit]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getRevenueReports,
    pagination,
  };
}
