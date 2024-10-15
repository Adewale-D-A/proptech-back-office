import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetApartmentCalendar({
  id,
  start_date,
  end_date,
}: {
  id?: string;
  start_date?: string;
  end_date?: string;
}) {
  const axios = useAxios();
  const [data, setData] = useState<{
    booked_dates: Date[];
    blocked_dates: Date[];
  }>({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getApartmentCalendar = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `/admin/calendar/${id}?start_date=${start_date}&end_date=${end_date}`
      );
      const result = response?.data?.data;
      const dateRsult = {
        booked_dates: result?.booked_dates?.map(
          (item: string) => new Date(item)
        ),
        blocked_dates: result?.blocked_dates?.map(
          (item: string) => new Date(item)
        ),
      };
      setData(dateRsult);
      setIsLoading(false);
    } catch (error) {
      setIsFailed(true);
    }
  }, [id, start_date, end_date]);

  useEffect(() => {
    if (id && start_date && end_date) {
      getApartmentCalendar();
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
