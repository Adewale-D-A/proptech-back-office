import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import ApiQueryParamsExtractor from "../utils/api-query-params-extractor";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetApartmentCalendar({
  id,
  start_date,
  end_date,
  building_id,
}: {
  id?: string;
  start_date?: string;
  end_date?: string;
  building_id?: string;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [data, setData] = useState<{
    booked_dates: Date[];
    blocked_dates: Date[];
  }>({ booked_dates: [], blocked_dates: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getApartmentCalendar = useCallback(async () => {
    try {
      setIsLoading(true);
      const { queryString, remakeRequest } = ApiQueryParamsExtractor({
        dataset: {
          start_date: start_date,
          end_date: end_date,
        },
      });
      const response = await axios.get(`/admin/calendar/${id}?${queryString}`);
      const result = response?.data?.data;
      const dateRsult = {
        booked_dates:
          result?.booked_dates?.map((item: string) => new Date(item)) || [],
        blocked_dates:
          result?.blocked_dates?.map((item: string) => new Date(item)) || [],
      };
      setData(dateRsult);
      setIsLoading(false);
    } catch (error) {
      setIsFailed(true);
    }
  }, [id, start_date, end_date]);

  useEffect(() => {
    if (id) {
      getApartmentCalendar();
    } else {
      setData({ booked_dates: [], blocked_dates: [] });
    }
  }, [id, start_date, end_date]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getApartmentCalendar,
  };
}
