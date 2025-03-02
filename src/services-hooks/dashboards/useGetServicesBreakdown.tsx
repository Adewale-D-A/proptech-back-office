import { useCallback, useEffect, useState } from "react";
import useAxios from "../../useHooks/useAxios";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { updateAllServiceBreakdown } from "../../stores/apiData/dahsboards/services-breakdown";

export default function useGetServicesBreakdown() {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const { status, data } = useAppSelector(
    (state) => state.serviceBreakdown.value
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getServicesBreakdown = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/admin/dashboard/services-breakdown");
      const { data } = response?.data;
      dispatch(updateAllServiceBreakdown(data));
      setIsLoading(false);
    } catch (error) {
      setIsFailed(true);
    }
  }, []);

  useEffect(() => {
    if (!status) {
      getServicesBreakdown();
    }
  }, [status]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getServicesBreakdown,
  };
}
