import { useCallback, useEffect, useState } from "react";
import useAxios from "../../useHooks/useAxios";
import ApiQueryParamsExtractor from "../../utils/api-query-params-extractor";

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
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<{
    total_revenue: number;
    total_bookings: number;
    total_nights_booked: number;
  }>({} as any);
  const [isFailed, setIsFailed] = useState(false);

  const getReportSummary = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const { queryString, remakeRequest } = ApiQueryParamsExtractor({
        dataset: {
          page: page,
          start_date: start_date,
          end_date: end_date,
          shortlet_id: apartmentId,
        },
      });
      const response = await axios.get(
        `/admin/report/dashboard?${queryString}`
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
    getReportSummary();
  }, [apartmentId, start_date, end_date]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getReportSummary,
  };
}
