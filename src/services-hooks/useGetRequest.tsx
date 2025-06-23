import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { requests } from "../types/apiData/requests";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetRequest({ id }: { id?: string }) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [data, setData] = useState<requests>({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getRequest = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(`/admin/user-request/${id}`);
      const result = response?.data?.data;
      setData(result);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getRequest();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getRequest,
  };
}
