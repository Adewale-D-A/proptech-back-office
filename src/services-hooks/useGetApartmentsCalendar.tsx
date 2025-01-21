import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import ApiQueryParamsExtractor from "../utils/api-query-params-extractor";
import ApartmentsCalendarDataTranslator from "../utils/apartments-calendar-data-translator";
import { reformedApartmentCalendar } from "../types/apiData/apartment/reformed-apartment-calendar";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetApartmentsCalendar({
  start_date,
  end_date,
}: {
  start_date?: string;
  end_date?: string;
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
        },
      });
      const response = await axios.get(`/admin/calendar/all?${queryString}`);
      const result = response?.data?.data;
      const reformed = ApartmentsCalendarDataTranslator({ dataset: result });
      console.log({ reformed });
      setData(reformed?.reformed || []);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [start_date, end_date]);

  useEffect(() => {
    getApartmentsCalendar();
  }, [start_date, end_date]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getApartmentsCalendar,
  };
}
