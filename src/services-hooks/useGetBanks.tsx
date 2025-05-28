import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import useAxios from "../useHooks/useAxios";
import { updateBanks } from "../stores/apiData/banks";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetBanks() {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const { status, data } = useAppSelector((state) => state.banks.value);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getBanks = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(`/admin/booking/banks`);
      const { banks } = response?.data?.data;
      dispatch(updateBanks({ data: banks }));
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!status) {
      getBanks();
    }
  }, [status]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getBanks,
  };
}
