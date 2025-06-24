import { useCallback, useEffect, useState } from "react";
import useAxios from "../../useHooks/useAxios";
import { pagination } from "../../types/pagination";
import { occupancyTimeReportList } from "../../types/apiData/reports";
import ApiQueryParamsExtractor from "../../utils/api-query-params-extractor";
import {
  updatePerTimeReport,
  addToPaginationHistory,
} from "../../stores/apiData/reports/per-time-occupancy";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
//axios instace interceptor for access token integration and refresh tokens
export default function useGetOccupancyPerTimeReport({
  page = 1,
  apartmentId,
  start_date,
  end_date,
  limit = 20,
}: {
  page?: number;
  start_date?: string;
  end_date?: string;
  apartmentId: string;
  limit?: number;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const { data, pagination: store_pagination } = useAppSelector(
    (state) => state.perTimeOccupancyReport.value
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [pagination, setPagination] = useState<pagination>({} as any);

  const getOccupancyPerTimeReports = useCallback(
    async (skipCache?: boolean, limitless?: number) => {
      setIsLoading(true);
      setIsFailed(false);
      try {
        const queryDataset = {
          page: Number(page),
          start_date: start_date,
          end_date: end_date,
          shortlet_id: apartmentId,
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
          dispatch(updatePerTimeReport({ data: foundPage?.data }));
        } else {
          const response = await axios.get(
            `/admin/report/occupancy-per-time?${queryString}`
          );
          const { data, current_page, last_page, per_page, total, from, to } =
            response?.data?.data;
          const paginationDataset = {
            current_page,
            last_page,
            per_page,
            total,
            from,
            to,
            length: data?.length,
          };
          dispatch(updatePerTimeReport({ data }));
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
    [page, apartmentId, start_date, end_date, limit]
  );

  useEffect(() => {
    getOccupancyPerTimeReports();
  }, [page, apartmentId, start_date, end_date, limit]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getOccupancyPerTimeReports,
    pagination,
  };
}
