import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetApartmentsCalendar({
  start_date,
  end_date,
}: {
  start_date?: string;
  end_date?: string;
}) {
  const axios = useAxios();
  const [data, setData] = useState<{
    [key: string]: {
      booked_dates: {
        [key: string]: string;
      };
      blocked_dates: {
        [key: string]: string;
      };
    };
  }>({ booked_dates: [], blocked_dates: [] } as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getApartmentsCalendar = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        start_date && end_date
          ? `/admin/calendar/all?start_date=${start_date}&end_date=${end_date}`
          : `/admin/calendar/all`
      );
      const result = response?.data?.data;
      setData(result);
      setIsLoading(false);
    } catch (error) {
      setIsFailed(true);
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
