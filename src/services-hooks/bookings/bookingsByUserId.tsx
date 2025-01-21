import { useCallback, useEffect, useState } from "react";
import { bookingsByUserId } from "../../types/apiData/bookings";
import useAxios from "../../useHooks/useAxios";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetBookingsByUserId({ id }: { id?: string }) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [isLoading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false);

  const [data, setData] = useState<bookingsByUserId>([] as any);

  const getBookingByUserId = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(`/admin/booking/active/${id}`);
      const { bookings } = response?.data?.data;
      setData(bookings);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getBookingByUserId();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getBookingByUserId,
  };
}
