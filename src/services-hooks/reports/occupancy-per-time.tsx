import { useCallback, useEffect, useState } from "react";
import useAxios from "../../useHooks/useAxios";
import { pagination } from "../../types/pagination";
import { occupancyTimeReportList } from "../../types/apiData/reports";
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
  const axios = useAxios();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<occupancyTimeReportList[]>([]);
  const [isFailed, setIsFailed] = useState(false);

  const [pagination, setPagination] = useState<pagination>({} as any);

  const getOccupancyPerTimeReports = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(
        start_date && end_date
          ? `/admin/report/occupancy-per-time?shortlet_id=${apartmentId}&limit=20&page=${page}&start_date=${start_date}&end_date=${end_date}`
          : `/admin/report/occupancy-per-time?shortlet_id=${apartmentId}&limit=20&page=${page}`
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
    if (apartmentId) {
      getOccupancyPerTimeReports();
    }
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
