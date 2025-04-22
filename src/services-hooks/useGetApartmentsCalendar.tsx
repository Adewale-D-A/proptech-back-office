import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import ApiQueryParamsExtractor from "../utils/api-query-params-extractor";
import ApartmentsCalendarDataTranslator from "../utils/apartments-calendar-data-translator";
import { reformedApartmentCalendar } from "../types/apiData/apartment/reformed-apartment-calendar";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetApartmentsCalendar({
  start_date,
  end_date,
  limit = 100,
}: {
  start_date?: string;
  end_date?: string;
  limit?: number;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [data, setData] = useState<reformedApartmentCalendar[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getApartmentsCalendar = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const { queryString, remakeRequest } = ApiQueryParamsExtractor({
        dataset: {
          start_date: start_date,
          end_date: end_date,
          limit,
        },
      });
      const response = await axios.get(
        `/admin/calendar/unavailable?${queryString}`
      );
      const result = response?.data?.data;
      const reformed = ApartmentsCalendarDataTranslator({ dataset: result });
      setData(reformed?.reformed || []);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [start_date, end_date, limit]);

  useEffect(() => {
    getApartmentsCalendar();
  }, [start_date, end_date, limit]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getApartmentsCalendar,
  };
}
