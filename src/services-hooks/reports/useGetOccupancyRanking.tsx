import { useCallback, useEffect, useState } from "react";
import useAxios from "../../useHooks/useAxios";
import { pagination } from "../../types/pagination";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import {
  updateOccuancyRankingReport,
  addToPaginationHistory,
} from "../../stores/apiData/reports/occupancy-ranking";
import ApiQueryParamsExtractor from "../../utils/api-query-params-extractor";
//axios instace interceptor for access token integration and refresh tokens
export default function useGetOccupancyRankingReport({
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
  const {
    data,
    pagination: store_pagination,
    summary,
  } = useAppSelector((state) => state.occupancyRankingReports.value);
  const [isLoading, setIsLoading] = useState(false);
  //   const [data, setData] = useState<revenueReportList[]>([]);
  const [isFailed, setIsFailed] = useState(false);

  const [pagination, setPagination] = useState<pagination>({} as any);

  const getOccupancyRankingReports = useCallback(
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
          dispatch(
            updateOccuancyRankingReport({
              data: foundPage?.data,
              summary: foundPage?.summary,
            })
          );
        } else {
          const response = await axios.get(
            `/admin/report/occupancy-ranking?${queryString}`
          );
          const { report, summary } = response?.data?.data;
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
          dispatch(updateOccuancyRankingReport({ data, summary }));
          dispatch(
            addToPaginationHistory({
              pagination_data: paginationDataset,
              data: data,
              key: queryKey,
              summary,
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
    getOccupancyRankingReports();
  }, [page, apartmentId, start_date, end_date, group, limit]);

  return {
    data,
    summary,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getOccupancyRankingReports,
    pagination,
  };
}
