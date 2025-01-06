import { useCallback, useEffect, useState } from "react";
import useAxios from "../../useHooks/useAxios";
import { pagination } from "../../types/pagination";

export default function useGetReportSummary({
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
  const [data, setData] = useState<{
    total_revenue: number;
    total_bookings: number;
    total_nights_booked: number;
  }>({} as any);
  const [isFailed, setIsFailed] = useState(false);

  const [pagination, setPagination] = useState<pagination>({} as any);

  const getReportSummary = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(
        start_date && end_date
          ? `/admin/report/dashboard?shortlet_id=${apartmentId}&start_date=${start_date}&end_date=${end_date}`
          : `/admin/report/dashboard?shortlet_id=${apartmentId}`
      );
      const data = response?.data?.data;
      setData(data);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [apartmentId, start_date, end_date]);

  useEffect(() => {
    if (apartmentId) {
      getReportSummary();
    }
  }, [apartmentId, start_date, end_date]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getReportSummary,
  };
}
