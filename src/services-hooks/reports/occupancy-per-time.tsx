import { useCallback, useEffect, useState } from "react";
import useAxios from "../../useHooks/useAxios";
import { pagination } from "../../types/pagination";
import { occupancyTimeReportList } from "../../types/apiData/reports";
import ApiQueryParamsExtractor from "../../utils/api-query-params-extractor";
//axios instace interceptor for access token integration and refresh tokens
export default function useGetOccupancyPerTimeReport({
  page = 1,
  apartmentId,
  start_date,
  end_date,
}: {
  page?: number;
  start_date?: string;
  end_date?: string;
  apartmentId: string;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<occupancyTimeReportList[]>([]);
  const [isFailed, setIsFailed] = useState(false);

  const [pagination, setPagination] = useState<pagination>({} as any);

  const getOccupancyPerTimeReports = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const { queryString } = ApiQueryParamsExtractor({
        dataset: {
          page: page,
          start_date: start_date,
          end_date: end_date,
          shortlet_id: apartmentId,
        },
      });
      const response = await axios.get(
        `/admin/report/occupancy-per-time?${queryString}`
      );
      const data = response?.data?.data;
      const {
        data: response_result,
        current_page,
        last_page,
        per_page,
        total,
        from,
        to,
      } = data;
      const paginationDataset = {
        current_page,
        last_page,
        per_page,
        total,
        from,
        to,
        length: response_result?.length,
      };
      setData(response_result);
      setPagination(paginationDataset);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [page, apartmentId, start_date, end_date]);

  useEffect(() => {
    getOccupancyPerTimeReports();
  }, [page, apartmentId, start_date, end_date]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getOccupancyPerTimeReports,
    pagination,
  };
}
