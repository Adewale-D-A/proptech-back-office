import { useCallback, useEffect, useState } from "react";
import { bookingsById } from "../../types/apiData/bookings";
import useAxios from "../../useHooks/useAxios";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetBookingById(id?: string) {
  const axios = useAxios();
  const [isLoading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false);

  const [data, setData] = useState<bookingsById>({} as any);

  const getBooking = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(`/admin/booking/${id}`);
      const { booking } = response?.data?.data;
      setData(booking);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getBooking();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getBooking,
  };
}
