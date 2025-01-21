import { useCallback, useEffect, useState } from "react";
import { updateVisitorCount } from "../../stores/apiData/bookings/visitor-count";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import useAxios from "../../useHooks/useAxios";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetVisitorCount() {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const { status, data } = useAppSelector((state) => state.visitorCount.value);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getVisitorCount = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(`/admin/booking/visitor-counter`);
      const data = response?.data?.data;
      dispatch(updateVisitorCount({ data }));
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status) {
      setIsLoading(false);
    } else {
      getVisitorCount();
    }
  }, [status]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getVisitorCount,
  };
}
