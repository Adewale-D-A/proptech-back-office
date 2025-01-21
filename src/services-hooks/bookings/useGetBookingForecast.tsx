import { useCallback, useEffect, useState } from "react";
import useAxios from "../../useHooks/useAxios";
import { forecast } from "../../types/apiData/bookings/forecast";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetBookingForecast({
  start_date,
  end_date,
}: {
  start_date?: string;
  end_date?: string;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [data, setData] = useState<forecast>({} as any);

  const getBookingForecast = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.post(`/admin/booking/forecast`, {
        start_date: start_date,
        end_date: end_date,
      });
      const data = response?.data?.data;
      setData(data);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [start_date, end_date]);

  useEffect(() => {
    getBookingForecast();
  }, [start_date, end_date]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getBookingForecast,
  };
}
