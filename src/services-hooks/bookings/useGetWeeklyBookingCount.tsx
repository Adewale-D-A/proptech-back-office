import { useCallback, useEffect, useState } from "react";
import useAxios from "../../useHooks/useAxios";
import { bookingCount } from "../../types/apiData/bookings/count";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetWeeklyBookingCount({
  start_date,
  end_date,
}: {
  start_date?: string;
  end_date?: string;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [data, setData] = useState<bookingCount>([]);

  const getWeeklyBookingCount = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.post(`/admin/booking/weekly-booking-count`, {
        start_date: start_date,
        end_date: end_date,
      });
      const { weekly_booking_count } = response?.data?.data;
      setData(weekly_booking_count);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [start_date, end_date]);

  useEffect(() => {
    getWeeklyBookingCount();
  }, [start_date, end_date]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getWeeklyBookingCount,
  };
}
