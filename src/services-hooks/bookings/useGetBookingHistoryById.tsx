import { useCallback, useEffect, useState } from "react";
import { bookingHistory, bookingsById } from "../../types/apiData/bookings";
import useAxios from "../../useHooks/useAxios";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetBookingHistoryById(id?: string) {
  const axios = useAxios();
  const [isLoading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false);

  const [data, setData] = useState<bookingHistory>([]);

  const getBookingHistory = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(`/admin/booking/history/${id}`);
      const { data, current_page, last_page, per_page, total, from, to } =
        response?.data?.data?.booking_note;
      setData(data);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getBookingHistory();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getBookingHistory,
  };
}
